import type {
	IDataObject,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError, NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

import { CORE } from './catalog';
import {
	coerce,
	filterFieldOptions,
	perfexApiRequest,
	perfexApiRequestAllItems,
	writableFieldOptions,
} from './GenericFunctions';

const withId = ['get', 'update', 'delete'];

export class PerfexConnect implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Perfex Connect',
		name: 'perfexConnect',
		icon: 'file:perfexconnect.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Create, read, update, search and delete records in Perfex CRM through Perfex Connect',
		defaults: { name: 'Perfex Connect' },
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [{ name: 'perfexConnectApi', required: true }],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: CORE.map((r) => ({ name: r.noun, value: r.name })).sort((a, b) => a.name.localeCompare(b.name)),
				default: 'leads',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Create', value: 'create', description: 'Create a record', action: 'Create a record' },
					{ name: 'Delete', value: 'delete', description: 'Delete a record', action: 'Delete a record' },
					{ name: 'Get', value: 'get', description: 'Get a record by ID', action: 'Get a record' },
					{ name: 'Get Many', value: 'getAll', description: 'List or search records', action: 'Get many records' },
					{ name: 'Update', value: 'update', description: 'Update a record', action: 'Update a record' },
				],
				default: 'create',
			},
			{
				displayName: 'Record ID',
				name: 'id',
				type: 'string',
				required: true,
				default: '',
				displayOptions: { show: { operation: withId } },
			},
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'fixedCollection',
				typeOptions: { multipleValues: true },
				placeholder: 'Add Field',
				default: {},
				displayOptions: { show: { operation: ['create', 'update'] } },
				options: [
					{
						displayName: 'Field',
						name: 'field',
						values: [
							{
								displayName: 'Field Name or ID',
								name: 'name',
								type: 'options',
								typeOptions: { loadOptionsMethod: 'getWritableFields', loadOptionsDependsOn: ['resource'] },
								default: '',
								description:
									'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Numbers, true/false and JSON (line items, members) are converted to the field type',
							},
						],
					},
				],
			},
			{
				displayName: 'Custom Fields',
				name: 'customFields',
				type: 'fixedCollection',
				typeOptions: { multipleValues: true },
				placeholder: 'Add Custom Field',
				default: {},
				displayOptions: { show: { operation: ['create', 'update'] } },
				options: [
					{
						displayName: 'Custom Field',
						name: 'field',
						values: [
							{ displayName: 'Slug', name: 'slug', type: 'string', default: '', description: 'The custom field slug, for example leads_budget' },
							{ displayName: 'Value', name: 'value', type: 'string', default: '' },
						],
					},
				],
			},
			{
				displayName: 'Additional Options',
				name: 'writeOptions',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				displayOptions: { show: { operation: ['create', 'update'] } },
				options: [
					{
						displayName: 'Idempotency Key',
						name: 'idempotencyKey',
						type: 'string',
						default: '',
						description:
							'A value unique per run (for example the trigger event ID): the CRM creates the record only once when the workflow is retried',
					},
					{
						displayName: 'JSON Body',
						name: 'jsonBody',
						type: 'json',
						default: '{}',
						description: 'Extra fields as JSON, merged over the fields above',
					},
				],
			},
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				default: false,
				description: 'Whether to return all results or only up to a given limit',
				displayOptions: { show: { operation: ['getAll'] } },
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: { minValue: 1 },
				default: 50,
				description: 'Max number of results to return',
				displayOptions: { show: { operation: ['getAll'], returnAll: [false] } },
			},
			{
				displayName: 'Filters',
				name: 'filters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: { show: { operation: ['getAll'] } },
				options: [
					{ displayName: 'Search', name: 'q', type: 'string', default: '', description: 'Free text over the searchable fields' },
					{
						displayName: 'Updated Since',
						name: 'updatedSince',
						type: 'dateTime',
						default: '',
						description: 'Only records changed after this moment',
					},
					{
						displayName: 'Field Filters',
						name: 'fieldFilters',
						type: 'fixedCollection',
						typeOptions: { multipleValues: true },
						default: {},
						options: [
							{
								displayName: 'Filter',
								name: 'filter',
								values: [
									{
										displayName: 'Field Name or ID',
										name: 'field',
										type: 'options',
										typeOptions: { loadOptionsMethod: 'getFilterFields', loadOptionsDependsOn: ['resource'] },
										default: '',
										description:
											'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
									},
									{ displayName: 'Value', name: 'value', type: 'string', default: '' },
								],
							},
						],
					},
				],
			},
		],
	};

	methods = {
		loadOptions: {
			async getWritableFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return await writableFieldOptions.call(this, this.getCurrentNodeParameter('resource') as string);
			},
			async getFilterFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				return await filterFieldOptions.call(this, this.getCurrentNodeParameter('resource') as string);
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const out: INodeExecutionData[] = [];
		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				const path = '/' + encodeURIComponent(resource);
				let result: IDataObject | IDataObject[] = {};

				if (operation === 'create' || operation === 'update') {
					const body: IDataObject = {};
					const fields = (this.getNodeParameter('fields', i, {}) as IDataObject).field as IDataObject[] | undefined;
					for (const f of fields ?? []) {
						const name = String(f.name ?? '');
						if (!name) continue;
						const v = coerce(resource, name, f.value);
						if (v !== undefined) body[name] = v as IDataObject[keyof IDataObject];
					}
					const cfs = (this.getNodeParameter('customFields', i, {}) as IDataObject).field as IDataObject[] | undefined;
					if (cfs?.length) {
						const cf: IDataObject = {};
						for (const c of cfs) if (c.slug) cf[String(c.slug)] = c.value as string;
						body.custom_fields = cf;
					}
					const opts = this.getNodeParameter('writeOptions', i, {}) as IDataObject;
					if (opts.jsonBody) {
						const extra = typeof opts.jsonBody === 'string' ? (JSON.parse(opts.jsonBody || '{}') as IDataObject) : (opts.jsonBody as IDataObject);
						Object.assign(body, extra);
					}
					const headers: IDataObject = {};
					if (opts.idempotencyKey) headers['Idempotency-Key'] = String(opts.idempotencyKey).slice(0, 128);
					if (operation === 'create') {
						result = (await perfexApiRequest.call(this, 'POST', path, body, {}, headers)).data as IDataObject;
					} else {
						const id = String(this.getNodeParameter('id', i));
						result = (await perfexApiRequest.call(this, 'PATCH', `${path}/${encodeURIComponent(id)}`, body, {}, headers)).data as IDataObject;
					}
				} else if (operation === 'get') {
					const id = String(this.getNodeParameter('id', i));
					result = (await perfexApiRequest.call(this, 'GET', `${path}/${encodeURIComponent(id)}`, {}, { include: 'custom_fields' })).data as IDataObject;
				} else if (operation === 'delete') {
					const id = String(this.getNodeParameter('id', i));
					await perfexApiRequest.call(this, 'DELETE', `${path}/${encodeURIComponent(id)}`);
					result = { id, deleted: true };
				} else if (operation === 'getAll') {
					const returnAll = this.getNodeParameter('returnAll', i) as boolean;
					const limit = returnAll ? 0 : (this.getNodeParameter('limit', i) as number);
					const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
					const qs: IDataObject = { include: 'custom_fields' };
					if (filters.q) qs.q = filters.q;
					if (filters.updatedSince) qs.updated_since = filters.updatedSince;
					const ff = (filters.fieldFilters as IDataObject | undefined)?.filter as IDataObject[] | undefined;
					for (const f of ff ?? []) if (f.field) qs[`filter[${String(f.field)}]`] = f.value as string;
					result = await perfexApiRequestAllItems.call(this, path, qs, limit);
				} else {
					throw new NodeOperationError(this.getNode(), `Unknown operation "${operation}"`, { itemIndex: i });
				}

				const rows = Array.isArray(result) ? result : [result];
				for (const row of rows) out.push({ json: row, pairedItem: { item: i } });
			} catch (error) {
				if (this.continueOnFail()) {
					out.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
					continue;
				}
				// both constructors hand back an error of their own class unchanged (HTTP details kept)
				if (error instanceof NodeApiError) throw new NodeApiError(this.getNode(), error as unknown as JsonObject);
				throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
			}
		}
		return [out];
	}
}
