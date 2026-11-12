import type {
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	IWebhookFunctions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

import { API_PATH, CORE } from './catalog';
import type { CatalogField } from './catalog';

type Context = IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions;

/** <crm>/perfex_connect/api/v1 from what the user entered (CRM address or API base URL). */
export function apiBase(crmUrl: string): string {
	let url = String(crmUrl || '').trim();
	if (url && !/^https?:\/\//i.test(url)) url = 'https://' + url;
	url = url.replace(/[?#].*$/, '').replace(/(\/perfex_connect\/api\/v1)?\/*$/, '');
	return url + API_PATH;
}

function errorBody(error: unknown): IDataObject | undefined {
	const e = error as IDataObject & { response?: IDataObject; cause?: IDataObject };
	const candidates: unknown[] = [
		e?.response && (e.response as IDataObject).body,
		e?.response && (e.response as IDataObject).data,
		e?.cause && (e.cause as IDataObject).response && ((e.cause as IDataObject).response as IDataObject).data,
		e?.error,
		e?.description,
	];
	for (const c of candidates) {
		if (c && typeof c === 'object' && (c as IDataObject).error) return c as IDataObject;
		if (typeof c === 'string' && c.trim().startsWith('{')) {
			try {
				const parsed = JSON.parse(c) as IDataObject;
				if (parsed.error) return parsed;
			} catch {
				// not JSON
			}
		}
	}
	return undefined;
}

/** The error envelope {error: {code, message, details, request_id}} as one readable line. */
export function envelopeMessage(error: unknown): string | undefined {
	const body = errorBody(error);
	const err = body?.error as IDataObject | undefined;
	if (!err) return undefined;
	let msg = `${String(err.message ?? 'Request failed')} (${String(err.code ?? 'error')})`;
	const details = err.details as IDataObject | undefined;
	if (details && typeof details === 'object') {
		const parts = Object.keys(details)
			.filter((k) => k !== 'reason' && typeof details[k] !== 'object')
			.map((k) => (k === 'required_scope' ? `needs scope ${String(details[k])}` : `${k}: ${String(details[k])}`));
		if (details.reason) parts.unshift(`reason: ${String(details.reason)}`);
		if (parts.length) msg += ` - ${parts.join('; ')}`;
	}
	if (err.request_id) msg += ` [request ${String(err.request_id)}]`;
	return msg;
}

function statusOf(error: unknown): number | undefined {
	const e = error as IDataObject & { response?: IDataObject };
	const s = (e?.httpCode ?? e?.statusCode ?? e?.status ?? (e?.response as IDataObject | undefined)?.status) as
		| number
		| string
		| undefined;
	return s === undefined ? undefined : Number(s);
}

export async function perfexApiRequest(
	this: Context,
	method: IHttpRequestMethods,
	path: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	headers: IDataObject = {},
): Promise<IDataObject> {
	const credentials = await this.getCredentials('perfexConnectApi');
	const options: IHttpRequestOptions = {
		method,
		url: apiBase(String(credentials.crmUrl)) + path,
		qs,
		headers: { Accept: 'application/json', ...headers },
		json: true,
	};
	if (method !== 'GET' && method !== 'DELETE' && Object.keys(body).length) options.body = body;
	try {
		return (await this.helpers.httpRequestWithAuthentication.call(this, 'perfexConnectApi', options)) as IDataObject;
	} catch (error) {
		const message = envelopeMessage(error);
		const status = statusOf(error);
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message: message ?? (error as Error).message,
			description:
				status === 401
					? 'Check the API key of the Perfex Connect credential.'
					: status === 403
						? 'The API key lacks a scope or its staff member lacks a permission.'
						: status === 429
							? 'Rate limit reached: wait and retry.'
							: undefined,
			httpCode: status !== undefined ? String(status) : undefined,
		});
	}
}

/** Pages a list with the CRM cursor (meta.next_cursor) until the limit, or all records when limit is 0. */
export async function perfexApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	path: string,
	qs: IDataObject = {},
	limit = 0,
): Promise<IDataObject[]> {
	const out: IDataObject[] = [];
	const query: IDataObject = { sort: '-id', ...qs, per_page: limit > 0 && limit < 100 ? limit : 100 };
	for (let guard = 0; guard < 10000; guard++) {
		const res = await perfexApiRequest.call(this, 'GET', path, {}, query);
		const rows = (res.data as IDataObject[]) ?? [];
		out.push(...rows);
		if (limit > 0 && out.length >= limit) return out.slice(0, limit);
		const next = (res.meta as IDataObject | undefined)?.next_cursor as string | null | undefined;
		if (!next || rows.length === 0) break;
		query.cursor = next;
		delete query.page;
	}
	return out;
}

interface LiveField {
	type?: string;
	write?: boolean;
	filter?: boolean;
	required?: boolean;
	description?: string;
	enum?: string[];
}

function bakedFields(resource: string): CatalogField[] {
	return CORE.find((r) => r.name === resource)?.fields ?? [];
}

/** The fields of a resource on this CRM (GET /resources/{name}), as {key: definition}. */
export async function liveFields(this: ILoadOptionsFunctions, resource: string): Promise<Record<string, LiveField> | null> {
	try {
		const res = await perfexApiRequest.call(this, 'GET', `/resources/${encodeURIComponent(resource)}`);
		const data = res.data as IDataObject | undefined;
		const fields = data?.fields as Record<string, LiveField> | Array<LiveField & { name: string }> | undefined;
		if (!fields) return null;
		if (Array.isArray(fields)) {
			const map: Record<string, LiveField> = {};
			for (const f of fields) map[f.name] = f;
			return map;
		}
		return fields;
	} catch {
		return null;
	}
}

const SKIP = ['id', 'custom_fields', 'customer_id', 'password'];

export async function writableFieldOptions(this: ILoadOptionsFunctions, resource: string): Promise<INodePropertyOptions[]> {
	const baked = bakedFields(resource);
	const live = await liveFields.call(this, resource);
	const labelOf = (key: string) => baked.find((f) => f.key === key)?.label ?? key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
	const keys = live ? Object.keys(live).filter((k) => live[k].write !== false && !SKIP.includes(k)) : baked.map((f) => f.key);
	return keys
		.map((key) => {
			const req = live ? !!live[key].required : !!baked.find((f) => f.key === key)?.required;
			return { name: labelOf(key) + (req ? ' (required on create)' : ''), value: key, description: live?.[key]?.description ?? baked.find((f) => f.key === key)?.help };
		})
		.sort((a, b) => a.name.localeCompare(b.name));
}

export async function filterFieldOptions(this: ILoadOptionsFunctions, resource: string): Promise<INodePropertyOptions[]> {
	const live = await liveFields.call(this, resource);
	const keys = live
		? Object.keys(live).filter((k) => live[k].filter)
		: (CORE.find((r) => r.name === resource)?.filterable ?? []);
	return keys.map((k) => ({ name: k.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), value: k })).sort((a, b) => a.name.localeCompare(b.name));
}

/** A string value typed by the catalogue (n8n sends what the user typed or mapped). */
export function coerce(resource: string, key: string, value: unknown): unknown {
	const type = bakedFields(resource).find((f) => f.key === key)?.type ?? 'string';
	if (value === undefined || value === null || value === '') return undefined;
	if (typeof value !== 'string') return value;
	const s = value.trim();
	switch (type) {
		case 'integer':
			return /^-?\d+$/.test(s) ? parseInt(s, 10) : value;
		case 'number':
			return s !== '' && Number.isFinite(Number(s)) ? Number(s) : value;
		case 'boolean':
			if (['true', 'yes', '1', 'on'].includes(s.toLowerCase())) return true;
			if (['false', 'no', '0', 'off'].includes(s.toLowerCase())) return false;
			return value;
		case 'list':
			return s.startsWith('[') ? safeJson(s, value) : s.split(',').map((t) => t.trim()).filter(Boolean);
		case 'json':
			return safeJson(s, value);
		default:
			return value;
	}
}

function safeJson(s: string, fallback: unknown): unknown {
	try {
		return JSON.parse(s);
	} catch {
		return fallback;
	}
}
