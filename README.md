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

## Usage examples

The samples below come from a real CRM running Perfex Connect 1.5. Custom fields depend on your CRM; this one has none
on leads.

### 1. New lead in the CRM → workflow (trigger)

1. Add the **Perfex Connect Trigger** node and pick your **Perfex Connect API** credential (CRM URL + an API key with the
   scopes `webhooks:write` and `leads:read`).
2. **Event:** `New Lead` (`lead.created`). Keep **Verify Signature** on.
3. Activate the workflow. n8n subscribes its webhook in the CRM (*Connect › Webhooks* lists it); deactivating removes
   the subscription.

When someone adds a lead (web form, import, API or by hand), the trigger outputs one item:

```json
{
  "id": "1c4f7a42349263ee7f74980cae7bf55c",
  "event": "lead.created",
  "schema_version": 1,
  "resource": "leads",
  "resource_id": 18365,
  "action": "created",
  "occurred_at": "2026-11-13T02:05:47+00:00",
  "actor": { "type": "api", "id": 1 },
  "source": "api",
  "data": {
    "id": 18365,
    "name": "Marcus Bell",
    "company": "Bell Outdoor",
    "email": "marcus.bell@example.com",
    "phonenumber": "+1 555 0142",
    "description": "New website before spring",
    "status": 17,
    "status_name": "New",
    "source": 0,
    "assigned": 0,
    "dateadded": "2026-11-13T02:05:47+00:00",
    "tags": [],
    "custom_fields": {}
  },
  "changes": null
}
```

`data` carries every lead field (the full list is in example 2). Use `{{ $json.data.email }}` and similar expressions in
the next nodes. `id` is the event ID: the same value on a redelivery, so it is a good idempotency key.

### 2. Create a lead (action)

**Perfex Connect** node: **Resource** `Lead`, **Operation** `Create`, **Fields**:

| Field Name | Value |
|---|---|
| `name` | `Marcus Bell` |
| `email` | `marcus.bell@example.com` |
| `company` | `Bell Outdoor` |
| `phonenumber` | `+1 555 0142` |
| `description` | `New website before spring` |

Optional: **Additional Options › Idempotency Key** `{{ $json.id }}` (the trigger's event ID) so a retried run creates the
lead only once. Leads without a status or source get the CRM's defaults.

Output (one item, the created lead as the CRM returns it):

```json
{
  "id": 18365,
  "name": "Marcus Bell",
  "title": null,
  "company": "Bell Outdoor",
  "email": "marcus.bell@example.com",
  "phonenumber": "+1 555 0142",
  "website": null,
  "description": "New website before spring",
  "address": "",
  "city": null,
  "state": null,
  "zip": null,
  "country": 0,
  "status": 17,
  "source": 0,
  "assigned": 0,
  "lead_value": null,
  "is_public": false,
  "default_language": null,
  "lastcontact": null,
  "dateadded": "2026-11-13T02:05:47+00:00",
  "dateassigned": null,
  "last_status_change": null,
  "date_converted": null,
  "client_id": 0,
  "lost": false,
  "junk": false,
  "addedfrom": 1,
  "tags": [],
  "status_name": "New",
  "custom_fields": {}
}
```

### 3. As an AI agent tool

The **Perfex Connect** node can be attached to an n8n **AI Agent** as a tool. Set **Resource** and **Operation** (for
example `Lead` / `Get Many`), add **Filters › Search** and set it to `{{ $fromAI('search') }}` so the model fills the
search text. The tool runs with the API key's scopes and its staff member's CRM permissions, so give the agent a key
with read-only scopes unless it should change records.

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
