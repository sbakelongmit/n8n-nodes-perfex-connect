# n8n-nodes-perfex-connect

n8n community nodes for [Perfex CRM](https://perfexcrm.app/connect/) through the Perfex Connect module (1.5 or later).

* **Perfex Connect Trigger**: starts a workflow when an event happens in the CRM (new lead, invoice paid, ticket replied,
  task assigned … and the events of other Perfex modules). n8n subscribes the workflow's webhook (REST hook) when the
  workflow is activated and removes the subscription when it is deactivated. Deliveries are checked against
  `X-Pcx-Signature` (HMAC-SHA256, 5-minute window, secret rotation aware).
* **Perfex Connect**: create, get, get many (search text, field filters, updated since, cursor paging with Return All),
  update and delete for leads, customers, contacts, invoices, estimates, proposals, payments, projects, tasks, tickets,
  contracts and expenses. Field names are loaded from your CRM, custom fields included. An optional idempotency key makes
  a retried create safe. Usable as an AI agent tool.

## Install

In n8n: *Settings › Community Nodes › Install*, package name `n8n-nodes-perfex-connect`.

## Credential

| Field | |
|---|---|
| CRM URL | the address of your CRM as you open it in the browser, for example `https://crm.example.com` (the API base URL from *Connect › API Keys* works too) |
| API Key | a key from *Connect › API Keys* (shown once). It runs with its staff member's permissions and the scopes you give it; the trigger needs `webhooks:write`. |

The credential test calls `GET /perfex_connect/api/v1/me`.

## Develop

```
npm install
npm run build      # tsc + icons and node metadata into dist/
npm run lint       # eslint-plugin-n8n-nodes-base rules
npm link && (cd ~/.n8n/custom && npm link n8n-nodes-perfex-connect)   # try it in a local n8n
```

`nodes/PerfexConnect/catalog.ts` is generated from the Perfex Connect OpenAPI document; do not edit it by hand.

## Compatibility

n8n 1.x (nodes API version 1). Perfex Connect 1.5.0 or later.

## License

MIT
