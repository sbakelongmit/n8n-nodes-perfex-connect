import { createHmac, timingSafeEqual } from 'crypto';

import type {
	IDataObject,
	IHookFunctions,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

import { TRIGGER_EVENTS } from '../PerfexConnect/catalog';
import { perfexApiRequest } from '../PerfexConnect/GenericFunctions';

/**
 * Checks X-Pcx-Signature: t=<unix>,v1=<hex HMAC-SHA256 of "<t>.<raw body>">. During a secret rotation the header
 * carries a second v1 signed with the previous secret; any match is accepted. Window: 5 minutes.
 */
export function verifySignature(header: string, rawBody: string, secret: string, now = Date.now() / 1000): boolean {
	const t = (/(?:^|,)\s*t=(\d+)/.exec(header || '') ?? [])[1];
	if (!t || Math.abs(now - Number(t)) > 300) return false;
	const want = Buffer.from(createHmac('sha256', secret).update(`${t}.${rawBody}`).digest('hex'));
	return (header.match(/v1=[a-f0-9]{64}/g) ?? []).some((s) => {
		const got = Buffer.from(s.slice(3));
		return got.length === want.length && timingSafeEqual(got, want);
	});
}

export class PerfexConnectTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Perfex Connect Trigger',
		name: 'perfexConnectTrigger',
		icon: 'file:perfexconnect.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Starts the workflow when an event happens in Perfex CRM (REST hook)',
		defaults: { name: 'Perfex Connect Trigger' },
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'perfexConnectApi', required: true }],
		webhooks: [{ name: 'default', httpMethod: 'POST', responseMode: 'onReceived', path: 'webhook' }],
		properties: [
			{
				displayName: 'Event Name or ID',
				name: 'event',
				type: 'options',
				required: true,
				typeOptions: { loadOptionsMethod: 'getEvents' },
				default: 'lead.created',
				description:
					'The CRM event that starts the workflow. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
			},
			{
				displayName: 'Verify Signature',
				name: 'verifySignature',
				type: 'boolean',
				default: true,
				description: 'Whether to drop deliveries whose X-Pcx-Signature does not match the subscription secret',
			},
		],
	};

	methods = {
		loadOptions: {
			async getEvents(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				try {
					const res = await perfexApiRequest.call(this, 'GET', '/integrations/rest_hooks/events');
					const rows = (res.data as IDataObject[]) ?? [];
					return rows.map((e) => ({
						name: `${e.module_label && e.module_label !== 'Perfex' ? `${String(e.module_label)}: ` : ''}${String(e.label ?? e.name)} (${String(e.name)})`,
						value: String(e.name),
						description: e.description ? String(e.description) : undefined,
					}));
				} catch {
					return TRIGGER_EVENTS.map((e) => ({ name: `${e.label} (${e.event})`, value: e.event, description: e.description }));
				}
			},
		},
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const data = this.getWorkflowStaticData('node');
				if (!data.uid) return false;
				try {
					const res = await perfexApiRequest.call(this, 'GET', '/integrations/rest_hooks');
					const rows = (res.data as IDataObject[]) ?? [];
					const url = this.getNodeWebhookUrl('default');
					const event = this.getNodeParameter('event') as string;
					return rows.some(
						(s) =>
							(s.uid ?? s.id) === data.uid &&
							(s.url === undefined || s.url === url) &&
							(!Array.isArray(s.events) || (s.events as string[]).includes(event)),
					);
				} catch (error) {
					this.logger.warn('Perfex Connect: could not list the REST hooks, the subscription will be created again', { error: (error as Error).message });
					return false;
				}
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const data = this.getWorkflowStaticData('node');
				const res = await perfexApiRequest.call(this, 'POST', '/integrations/rest_hooks', {
					target_url: this.getNodeWebhookUrl('default'),
					event: this.getNodeParameter('event') as string,
				});
				const sub = (res.data as IDataObject) ?? {};
				const uid = sub.uid ?? sub.id;
				if (!uid) return false;
				data.uid = String(uid);
				if (sub.secret) data.secret = String(sub.secret);
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const data = this.getWorkflowStaticData('node');
				if (data.uid) {
					try {
						await perfexApiRequest.call(this, 'DELETE', `/integrations/rest_hooks/${encodeURIComponent(String(data.uid))}`);
					} catch (error) {
						// usually already removed on the CRM
						this.logger.warn('Perfex Connect: could not delete the REST hook', { error: (error as Error).message });
					}
				}
				delete data.uid;
				delete data.secret;
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const data = this.getWorkflowStaticData('node');
		const req = this.getRequestObject() as unknown as { rawBody?: Buffer | string; headers: IDataObject };
		const check = this.getNodeParameter('verifySignature', true) as boolean;
		if (check && data.secret) {
			const raw = req.rawBody === undefined ? JSON.stringify(this.getBodyData()) : req.rawBody.toString();
			const header = String((this.getHeaderData() as IDataObject)['x-pcx-signature'] ?? '');
			if (!verifySignature(header, raw, String(data.secret))) {
				return { webhookResponse: 'signature mismatch' };
			}
		}
		const body = this.getBodyData();
		return { workflowData: [this.helpers.returnJsonArray(body)] };
	}
}
