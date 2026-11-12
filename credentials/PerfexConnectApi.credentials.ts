import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PerfexConnectApi implements ICredentialType {
	name = 'perfexConnectApi';

	displayName = 'Perfex Connect API';

	documentationUrl = 'https://perfexcrm.app/connect/docs/';

	icon = 'file:../nodes/PerfexConnect/perfexconnect.svg' as const;

	properties: INodeProperties[] = [
		{
			displayName: 'CRM URL',
			name: 'crmUrl',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'https://crm.example.com',
			description:
				'The address of your Perfex CRM as you open it in the browser. The API base URL from Connect › API Keys works too.',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'A key from Connect › API Keys in your CRM (shown once). Triggers need the webhooks:write scope.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL:
				'={{$credentials.crmUrl.trim().replace(/[?#].*$/, "").replace(/(\\/perfex_connect\\/api\\/v1)?\\/*$/, "")}}/perfex_connect/api/v1',
			url: '/me',
			method: 'GET',
		},
	};
}
