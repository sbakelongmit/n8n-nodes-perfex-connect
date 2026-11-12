/* Generated from the Perfex Connect OpenAPI document openapi-1.5.0.json. Do not edit by hand. */

export interface CatalogField {
	key: string;
	label: string;
	type: string;
	required: boolean;
	help: string;
	choices?: string[];
	ref?: string;
}

export interface CatalogResource {
	name: string;
	noun: string;
	plural: string;
	display: string;
	searchable: string[];
	filterable: string[];
	sortable: string[];
	events: string[];
	fields: CatalogField[];
}

export const VERSION = '1.5.0';

export const API_PATH = '/perfex_connect/api/v1';

export const CORE: CatalogResource[] = [
	{
		"name": "leads",
		"noun": "Lead",
		"plural": "Leads",
		"display": "name",
		"sortable": [
			"id",
			"name",
			"company",
			"status",
			"assigned",
			"lead_value",
			"lastcontact",
			"dateadded",
			"last_status_change"
		],
		"filterable": [
			"id",
			"name",
			"company",
			"email",
			"phonenumber",
			"city",
			"state",
			"country",
			"status",
			"source",
			"assigned",
			"lead_value",
			"is_public",
			"lastcontact",
			"dateadded",
			"date_converted",
			"client_id",
			"lost",
			"junk",
			"addedfrom"
		],
		"searchable": [
			"name",
			"title",
			"company",
			"email",
			"phonenumber"
		],
		"events": [
			"lead.created",
			"lead.updated",
			"lead.status_changed",
			"lead.converted"
		],
		"fields": [
			{
				"key": "name",
				"label": "Name",
				"type": "string",
				"required": true,
				"help": ""
			},
			{
				"key": "title",
				"label": "Title",
				"type": "string",
				"required": false,
				"help": "Position."
			},
			{
				"key": "company",
				"label": "Company",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "email",
				"label": "Email",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "phonenumber",
				"label": "Phone Number",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "website",
				"label": "Website",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "description",
				"label": "Description",
				"type": "text",
				"required": false,
				"help": ""
			},
			{
				"key": "address",
				"label": "Address",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "city",
				"label": "City",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "state",
				"label": "State",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "zip",
				"label": "ZIP / Postal Code",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "country",
				"label": "Country ID",
				"type": "integer",
				"required": false,
				"help": "Country id (see /countries). 0 = none."
			},
			{
				"key": "status",
				"label": "Status",
				"type": "integer",
				"required": false,
				"help": "Lead status id (see /lead_statuses). Default: the status marked as default in settings.",
				"ref": "lead_statuses"
			},
			{
				"key": "source",
				"label": "Source",
				"type": "integer",
				"required": false,
				"help": "Lead source id (see /lead_sources).",
				"ref": "lead_sources"
			},
			{
				"key": "assigned",
				"label": "Assigned Staff Member",
				"type": "integer",
				"required": false,
				"help": "Staff id the lead is assigned to. 0 = nobody.",
				"ref": "staff"
			},
			{
				"key": "lead_value",
				"label": "Lead Value",
				"type": "number",
				"required": false,
				"help": "Estimated value."
			},
			{
				"key": "is_public",
				"label": "Public",
				"type": "boolean",
				"required": false,
				"help": "Visible to every staff member."
			},
			{
				"key": "default_language",
				"label": "Default Language",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "lastcontact",
				"label": "Last Contact",
				"type": "datetime",
				"required": false,
				"help": ""
			},
			{
				"key": "tags",
				"label": "Tags",
				"type": "list",
				"required": false,
				"help": "Tag names; on write replaces the tags."
			}
		]
	},
	{
		"name": "customers",
		"noun": "Customer",
		"plural": "Customers",
		"display": "company",
		"sortable": [
			"id",
			"company",
			"city",
			"active",
			"datecreated"
		],
		"filterable": [
			"id",
			"company",
			"vat",
			"phonenumber",
			"city",
			"state",
			"zip",
			"country",
			"default_currency",
			"active",
			"leadid",
			"addedfrom",
			"datecreated"
		],
		"searchable": [
			"company",
			"vat",
			"phonenumber",
			"website"
		],
		"events": [
			"customer.created",
			"customer.updated"
		],
		"fields": [
			{
				"key": "company",
				"label": "Company",
				"type": "string",
				"required": true,
				"help": "Company or person name."
			},
			{
				"key": "vat",
				"label": "VAT Number",
				"type": "string",
				"required": false,
				"help": "VAT / tax number."
			},
			{
				"key": "phonenumber",
				"label": "Phone Number",
				"type": "string",
				"required": false,
				"help": "Phone number."
			},
			{
				"key": "website",
				"label": "Website",
				"type": "string",
				"required": false,
				"help": "Website address."
			},
			{
				"key": "address",
				"label": "Address",
				"type": "string",
				"required": false,
				"help": "Street address."
			},
			{
				"key": "city",
				"label": "City",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "state",
				"label": "State",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "zip",
				"label": "ZIP / Postal Code",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "country",
				"label": "Country ID",
				"type": "integer",
				"required": false,
				"help": "Country id (see /countries). 0 = none."
			},
			{
				"key": "billing_street",
				"label": "Billing Street",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "billing_city",
				"label": "Billing City",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "billing_state",
				"label": "Billing State",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "billing_zip",
				"label": "Billing Zip",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "billing_country",
				"label": "Billing Country ID",
				"type": "integer",
				"required": false,
				"help": "Country id. 0 = none."
			},
			{
				"key": "shipping_street",
				"label": "Shipping Street",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "shipping_city",
				"label": "Shipping City",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "shipping_state",
				"label": "Shipping State",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "shipping_zip",
				"label": "Shipping Zip",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "shipping_country",
				"label": "Shipping Country ID",
				"type": "integer",
				"required": false,
				"help": "Country id. 0 = none."
			},
			{
				"key": "default_currency",
				"label": "Default Currency ID",
				"type": "integer",
				"required": false,
				"help": "Currency id (see /currencies). 0 = system default."
			},
			{
				"key": "default_language",
				"label": "Default Language",
				"type": "string",
				"required": false,
				"help": "Language folder name, e.g. english. Empty = system default."
			},
			{
				"key": "active",
				"label": "Active",
				"type": "boolean",
				"required": false,
				"help": "Inactive customers cannot sign in and are hidden from most lists."
			},
			{
				"key": "show_primary_contact",
				"label": "Show Primary Contact",
				"type": "boolean",
				"required": false,
				"help": "Show the primary contact on documents."
			},
			{
				"key": "groups",
				"label": "Groups",
				"type": "json",
				"required": false,
				"help": "Customer group ids, e.g. [1, 3]. On write replaces the groups."
			},
			{
				"key": "contact",
				"label": "Contact",
				"type": "json",
				"required": false,
				"help": "On create only: a first (primary) contact {firstname, lastname, email, phonenumber, password, send_welcome_email}."
			}
		]
	},
	{
		"name": "contacts",
		"noun": "Contact",
		"plural": "Contacts",
		"display": "email",
		"sortable": [
			"id",
			"userid",
			"firstname",
			"lastname",
			"email",
			"active",
			"last_login",
			"datecreated"
		],
		"filterable": [
			"id",
			"userid",
			"is_primary",
			"firstname",
			"lastname",
			"email",
			"phonenumber",
			"active",
			"datecreated"
		],
		"searchable": [
			"firstname",
			"lastname",
			"email",
			"phonenumber",
			"title"
		],
		"events": [
			"contact.created",
			"contact.updated"
		],
		"fields": [
			{
				"key": "userid",
				"label": "Customer",
				"type": "integer",
				"required": true,
				"help": "Customer id. Cannot change after creation.",
				"ref": "customers"
			},
			{
				"key": "firstname",
				"label": "First Name",
				"type": "string",
				"required": true,
				"help": ""
			},
			{
				"key": "lastname",
				"label": "Last Name",
				"type": "string",
				"required": true,
				"help": ""
			},
			{
				"key": "email",
				"label": "Email",
				"type": "string",
				"required": true,
				"help": "Unique across contacts."
			},
			{
				"key": "is_primary",
				"label": "Is Primary",
				"type": "boolean",
				"required": false,
				"help": "The primary contact of the customer (one per customer)."
			},
			{
				"key": "phonenumber",
				"label": "Phone Number",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "title",
				"label": "Title",
				"type": "string",
				"required": false,
				"help": "Job title."
			},
			{
				"key": "active",
				"label": "Active",
				"type": "boolean",
				"required": false,
				"help": ""
			},
			{
				"key": "direction",
				"label": "Direction",
				"type": "enum",
				"required": false,
				"help": "",
				"choices": [
					"ltr",
					"rtl"
				]
			},
			{
				"key": "invoice_emails",
				"label": "Invoice Emails",
				"type": "boolean",
				"required": false,
				"help": "Receives invoice emails."
			},
			{
				"key": "estimate_emails",
				"label": "Estimate Emails",
				"type": "boolean",
				"required": false,
				"help": "Receives estimate emails."
			},
			{
				"key": "credit_note_emails",
				"label": "Credit Note Emails",
				"type": "boolean",
				"required": false,
				"help": "Receives credit note emails."
			},
			{
				"key": "contract_emails",
				"label": "Contract Emails",
				"type": "boolean",
				"required": false,
				"help": "Receives contract emails."
			},
			{
				"key": "task_emails",
				"label": "Task Emails",
				"type": "boolean",
				"required": false,
				"help": "Receives task emails."
			},
			{
				"key": "project_emails",
				"label": "Project Emails",
				"type": "boolean",
				"required": false,
				"help": "Receives project emails."
			},
			{
				"key": "ticket_emails",
				"label": "Ticket Emails",
				"type": "boolean",
				"required": false,
				"help": "Receives ticket emails."
			},
			{
				"key": "send_welcome_email",
				"label": "Send Welcome Email",
				"type": "boolean",
				"required": false,
				"help": "On create: send the welcome e-mail (default false)."
			},
			{
				"key": "send_set_password_email",
				"label": "Send Set Password Email",
				"type": "boolean",
				"required": false,
				"help": "Send the set-password e-mail."
			}
		]
	},
	{
		"name": "invoices",
		"noun": "Invoice",
		"plural": "Invoices",
		"display": "formatted_number",
		"sortable": [
			"id",
			"number",
			"date",
			"subtotal",
			"total",
			"status",
			"datecreated",
			"clientid",
			"duedate",
			"total_paid"
		],
		"filterable": [
			"id",
			"number",
			"date",
			"currency",
			"total",
			"status",
			"datecreated",
			"addedfrom",
			"clientid",
			"project_id",
			"duedate",
			"sale_agent",
			"sent",
			"recurring"
		],
		"searchable": [],
		"events": [
			"invoice.created",
			"invoice.paid",
			"invoice.sent",
			"invoice.status_changed"
		],
		"fields": [
			{
				"key": "date",
				"label": "Date",
				"type": "date",
				"required": true,
				"help": ""
			},
			{
				"key": "clientid",
				"label": "Customer",
				"type": "integer",
				"required": true,
				"help": "Customer id.",
				"ref": "customers"
			},
			{
				"key": "currency",
				"label": "Currency ID",
				"type": "integer",
				"required": false,
				"help": "Currency id. Default: the customer currency, else the base currency."
			},
			{
				"key": "adjustment",
				"label": "Adjustment",
				"type": "number",
				"required": false,
				"help": ""
			},
			{
				"key": "discount_percent",
				"label": "Discount Percent",
				"type": "number",
				"required": false,
				"help": ""
			},
			{
				"key": "discount_total",
				"label": "Discount Total",
				"type": "number",
				"required": false,
				"help": ""
			},
			{
				"key": "discount_type",
				"label": "Discount Type",
				"type": "enum",
				"required": false,
				"help": "",
				"choices": [
					"",
					"before_tax",
					"after_tax"
				]
			},
			{
				"key": "clientnote",
				"label": "Client Note",
				"type": "text",
				"required": false,
				"help": ""
			},
			{
				"key": "adminnote",
				"label": "Admin Note",
				"type": "text",
				"required": false,
				"help": ""
			},
			{
				"key": "show_quantity_as",
				"label": "Show Quantity As",
				"type": "enum",
				"required": false,
				"help": "1 quantity, 2 hours, 3 quantity and hours.",
				"choices": [
					"1",
					"2",
					"3"
				]
			},
			{
				"key": "items",
				"label": "Line Items (JSON)",
				"type": "json",
				"required": false,
				"help": "Line items [{id?, description, long_description?, qty, rate, unit?, taxes?: [\"VAT|20\"] or [{name, rate}] or [tax id]}]. On write the list replaces the items; items with an id are updated, missing ones removed."
			},
			{
				"key": "tags",
				"label": "Tags",
				"type": "list",
				"required": false,
				"help": "Tag names; on write replaces the tags."
			},
			{
				"key": "project_id",
				"label": "Project",
				"type": "integer",
				"required": false,
				"help": "",
				"ref": "projects"
			},
			{
				"key": "duedate",
				"label": "Due Date",
				"type": "date",
				"required": false,
				"help": ""
			},
			{
				"key": "terms",
				"label": "Terms",
				"type": "text",
				"required": false,
				"help": ""
			},
			{
				"key": "sale_agent",
				"label": "Sale Agent",
				"type": "integer",
				"required": false,
				"help": "Staff id. 0 = none.",
				"ref": "staff"
			},
			{
				"key": "cancel_overdue_reminders",
				"label": "Cancel Overdue Reminders",
				"type": "boolean",
				"required": false,
				"help": ""
			},
			{
				"key": "allowed_payment_modes",
				"label": "Allowed Payment Modes",
				"type": "json",
				"required": false,
				"help": "Payment mode ids (and gateway slugs) allowed for this invoice."
			},
			{
				"key": "show_shipping_on_invoice",
				"label": "Show Shipping On Invoice",
				"type": "boolean",
				"required": false,
				"help": ""
			},
			{
				"key": "billing_street",
				"label": "Billing Street",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "billing_city",
				"label": "Billing City",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "billing_state",
				"label": "Billing State",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "billing_zip",
				"label": "Billing Zip",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "billing_country",
				"label": "Billing Country ID",
				"type": "integer",
				"required": false,
				"help": "Country id."
			},
			{
				"key": "shipping_street",
				"label": "Shipping Street",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "shipping_city",
				"label": "Shipping City",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "shipping_state",
				"label": "Shipping State",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "shipping_zip",
				"label": "Shipping Zip",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "shipping_country",
				"label": "Shipping Country ID",
				"type": "integer",
				"required": false,
				"help": "Country id."
			},
			{
				"key": "include_shipping",
				"label": "Include Shipping",
				"type": "boolean",
				"required": false,
				"help": ""
			}
		]
	},
	{
		"name": "estimates",
		"noun": "Estimate",
		"plural": "Estimates",
		"display": "formatted_number",
		"sortable": [
			"id",
			"number",
			"date",
			"subtotal",
			"total",
			"status",
			"datecreated",
			"clientid",
			"expirydate"
		],
		"filterable": [
			"id",
			"number",
			"date",
			"currency",
			"total",
			"status",
			"datecreated",
			"addedfrom",
			"clientid",
			"project_id",
			"expirydate",
			"sale_agent",
			"sent",
			"invoiceid"
		],
		"searchable": [
			"reference_no"
		],
		"events": [
			"estimate.created",
			"estimate.accepted",
			"estimate.declined"
		],
		"fields": [
			{
				"key": "date",
				"label": "Date",
				"type": "date",
				"required": true,
				"help": ""
			},
			{
				"key": "clientid",
				"label": "Customer",
				"type": "integer",
				"required": true,
				"help": "Customer id.",
				"ref": "customers"
			},
			{
				"key": "currency",
				"label": "Currency ID",
				"type": "integer",
				"required": false,
				"help": "Currency id. Default: the customer currency, else the base currency."
			},
			{
				"key": "adjustment",
				"label": "Adjustment",
				"type": "number",
				"required": false,
				"help": ""
			},
			{
				"key": "discount_percent",
				"label": "Discount Percent",
				"type": "number",
				"required": false,
				"help": ""
			},
			{
				"key": "discount_total",
				"label": "Discount Total",
				"type": "number",
				"required": false,
				"help": ""
			},
			{
				"key": "discount_type",
				"label": "Discount Type",
				"type": "enum",
				"required": false,
				"help": "",
				"choices": [
					"",
					"before_tax",
					"after_tax"
				]
			},
			{
				"key": "clientnote",
				"label": "Client Note",
				"type": "text",
				"required": false,
				"help": ""
			},
			{
				"key": "adminnote",
				"label": "Admin Note",
				"type": "text",
				"required": false,
				"help": ""
			},
			{
				"key": "show_quantity_as",
				"label": "Show Quantity As",
				"type": "enum",
				"required": false,
				"help": "1 quantity, 2 hours, 3 quantity and hours.",
				"choices": [
					"1",
					"2",
					"3"
				]
			},
			{
				"key": "items",
				"label": "Line Items (JSON)",
				"type": "json",
				"required": false,
				"help": "Line items [{id?, description, long_description?, qty, rate, unit?, taxes?: [\"VAT|20\"] or [{name, rate}] or [tax id]}]. On write the list replaces the items; items with an id are updated, missing ones removed."
			},
			{
				"key": "tags",
				"label": "Tags",
				"type": "list",
				"required": false,
				"help": "Tag names; on write replaces the tags."
			},
			{
				"key": "project_id",
				"label": "Project",
				"type": "integer",
				"required": false,
				"help": "",
				"ref": "projects"
			},
			{
				"key": "expirydate",
				"label": "Expiry Date",
				"type": "date",
				"required": false,
				"help": ""
			},
			{
				"key": "reference_no",
				"label": "Reference Number",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "terms",
				"label": "Terms",
				"type": "text",
				"required": false,
				"help": ""
			},
			{
				"key": "sale_agent",
				"label": "Sale Agent",
				"type": "integer",
				"required": false,
				"help": "",
				"ref": "staff"
			},
			{
				"key": "show_shipping_on_estimate",
				"label": "Show Shipping On Estimate",
				"type": "boolean",
				"required": false,
				"help": ""
			},
			{
				"key": "billing_street",
				"label": "Billing Street",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "billing_city",
				"label": "Billing City",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "billing_state",
				"label": "Billing State",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "billing_zip",
				"label": "Billing Zip",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "billing_country",
				"label": "Billing Country ID",
				"type": "integer",
				"required": false,
				"help": "Country id."
			},
			{
				"key": "shipping_street",
				"label": "Shipping Street",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "shipping_city",
				"label": "Shipping City",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "shipping_state",
				"label": "Shipping State",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "shipping_zip",
				"label": "Shipping Zip",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "shipping_country",
				"label": "Shipping Country ID",
				"type": "integer",
				"required": false,
				"help": "Country id."
			},
			{
				"key": "include_shipping",
				"label": "Include Shipping",
				"type": "boolean",
				"required": false,
				"help": ""
			}
		]
	},
	{
		"name": "proposals",
		"noun": "Proposal",
		"plural": "Proposals",
		"display": "subject",
		"sortable": [
			"id",
			"date",
			"subtotal",
			"total",
			"status",
			"datecreated",
			"subject",
			"open_till"
		],
		"filterable": [
			"id",
			"date",
			"currency",
			"total",
			"status",
			"datecreated",
			"addedfrom",
			"subject",
			"rel_type",
			"rel_id",
			"open_till",
			"assigned",
			"project_id"
		],
		"searchable": [
			"subject",
			"proposal_to",
			"email"
		],
		"events": [
			"proposal.created",
			"proposal.accepted",
			"proposal.declined"
		],
		"fields": [
			{
				"key": "date",
				"label": "Date",
				"type": "date",
				"required": true,
				"help": ""
			},
			{
				"key": "subject",
				"label": "Subject",
				"type": "string",
				"required": true,
				"help": ""
			},
			{
				"key": "rel_type",
				"label": "Related To (Type)",
				"type": "enum",
				"required": true,
				"help": "",
				"choices": [
					"customer",
					"lead"
				]
			},
			{
				"key": "rel_id",
				"label": "Related Record ID",
				"type": "integer",
				"required": true,
				"help": "Customer or lead id."
			},
			{
				"key": "currency",
				"label": "Currency ID",
				"type": "integer",
				"required": false,
				"help": "Currency id. Default: the customer currency, else the base currency."
			},
			{
				"key": "adjustment",
				"label": "Adjustment",
				"type": "number",
				"required": false,
				"help": ""
			},
			{
				"key": "discount_percent",
				"label": "Discount Percent",
				"type": "number",
				"required": false,
				"help": ""
			},
			{
				"key": "discount_total",
				"label": "Discount Total",
				"type": "number",
				"required": false,
				"help": ""
			},
			{
				"key": "discount_type",
				"label": "Discount Type",
				"type": "enum",
				"required": false,
				"help": "",
				"choices": [
					"",
					"before_tax",
					"after_tax"
				]
			},
			{
				"key": "show_quantity_as",
				"label": "Show Quantity As",
				"type": "enum",
				"required": false,
				"help": "1 quantity, 2 hours, 3 quantity and hours.",
				"choices": [
					"1",
					"2",
					"3"
				]
			},
			{
				"key": "items",
				"label": "Line Items (JSON)",
				"type": "json",
				"required": false,
				"help": "Line items [{id?, description, long_description?, qty, rate, unit?, taxes?: [\"VAT|20\"] or [{name, rate}] or [tax id]}]. On write the list replaces the items; items with an id are updated, missing ones removed."
			},
			{
				"key": "tags",
				"label": "Tags",
				"type": "list",
				"required": false,
				"help": "Tag names; on write replaces the tags."
			},
			{
				"key": "proposal_to",
				"label": "Proposal To",
				"type": "string",
				"required": false,
				"help": "Recipient name/company. Default: from the customer or lead."
			},
			{
				"key": "email",
				"label": "Email",
				"type": "string",
				"required": false,
				"help": "Recipient e-mail. Default: from the customer or lead."
			},
			{
				"key": "phone",
				"label": "Phone",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "address",
				"label": "Address",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "city",
				"label": "City",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "state",
				"label": "State",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "zip",
				"label": "ZIP / Postal Code",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "country",
				"label": "Country ID",
				"type": "integer",
				"required": false,
				"help": ""
			},
			{
				"key": "open_till",
				"label": "Open Till",
				"type": "date",
				"required": false,
				"help": ""
			},
			{
				"key": "assigned",
				"label": "Assigned Staff Member",
				"type": "integer",
				"required": false,
				"help": "Staff id. 0 = none.",
				"ref": "staff"
			},
			{
				"key": "project_id",
				"label": "Project",
				"type": "integer",
				"required": false,
				"help": "",
				"ref": "projects"
			},
			{
				"key": "allow_comments",
				"label": "Allow Comments",
				"type": "boolean",
				"required": false,
				"help": ""
			},
			{
				"key": "content",
				"label": "Content",
				"type": "text",
				"required": false,
				"help": "HTML body; {proposal_items} marks where the items table goes."
			}
		]
	},
	{
		"name": "payments",
		"noun": "Payment",
		"plural": "Payments",
		"display": "transactionid",
		"sortable": [
			"id",
			"invoiceid",
			"amount",
			"date",
			"daterecorded"
		],
		"filterable": [
			"id",
			"invoiceid",
			"amount",
			"paymentmode",
			"date",
			"daterecorded",
			"clientid"
		],
		"searchable": [
			"transactionid"
		],
		"events": [
			"payment.created"
		],
		"fields": [
			{
				"key": "invoiceid",
				"label": "Invoice",
				"type": "integer",
				"required": true,
				"help": "",
				"ref": "invoices"
			},
			{
				"key": "amount",
				"label": "Amount",
				"type": "number",
				"required": true,
				"help": ""
			},
			{
				"key": "paymentmode",
				"label": "Payment Mode",
				"type": "string",
				"required": true,
				"help": "Payment mode id (see /payment_modes) or a gateway slug.",
				"ref": "payment_modes"
			},
			{
				"key": "paymentmethod",
				"label": "Payment Method",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "date",
				"label": "Date",
				"type": "date",
				"required": false,
				"help": "Default: today."
			},
			{
				"key": "note",
				"label": "Note",
				"type": "text",
				"required": false,
				"help": ""
			},
			{
				"key": "transactionid",
				"label": "Transaction ID",
				"type": "string",
				"required": false,
				"help": ""
			}
		]
	},
	{
		"name": "projects",
		"noun": "Project",
		"plural": "Projects",
		"display": "name",
		"sortable": [
			"id",
			"name",
			"status",
			"clientid",
			"start_date",
			"deadline",
			"project_cost",
			"progress",
			"project_created",
			"date_finished"
		],
		"filterable": [
			"id",
			"name",
			"status",
			"clientid",
			"billing_type",
			"start_date",
			"deadline",
			"project_created",
			"addedfrom"
		],
		"searchable": [
			"name"
		],
		"events": [
			"project.created",
			"project.status_changed"
		],
		"fields": [
			{
				"key": "name",
				"label": "Name",
				"type": "string",
				"required": true,
				"help": ""
			},
			{
				"key": "clientid",
				"label": "Customer",
				"type": "integer",
				"required": true,
				"help": "Customer id.",
				"ref": "customers"
			},
			{
				"key": "start_date",
				"label": "Start Date",
				"type": "date",
				"required": true,
				"help": ""
			},
			{
				"key": "description",
				"label": "Description",
				"type": "text",
				"required": false,
				"help": ""
			},
			{
				"key": "status",
				"label": "Status",
				"type": "enum",
				"required": false,
				"help": "1 not started, 2 in progress, 3 on hold, 4 finished, 5 cancelled.",
				"choices": [
					"1",
					"2",
					"3",
					"4",
					"5"
				]
			},
			{
				"key": "billing_type",
				"label": "Billing Type",
				"type": "enum",
				"required": false,
				"help": "1 fixed rate, 2 project hours, 3 task hours.",
				"choices": [
					"1",
					"2",
					"3"
				]
			},
			{
				"key": "deadline",
				"label": "Deadline",
				"type": "date",
				"required": false,
				"help": ""
			},
			{
				"key": "project_cost",
				"label": "Project Cost",
				"type": "number",
				"required": false,
				"help": ""
			},
			{
				"key": "project_rate_per_hour",
				"label": "Project Rate Per Hour",
				"type": "number",
				"required": false,
				"help": ""
			},
			{
				"key": "estimated_hours",
				"label": "Estimated Hours",
				"type": "number",
				"required": false,
				"help": ""
			},
			{
				"key": "progress",
				"label": "Progress",
				"type": "integer",
				"required": false,
				"help": ""
			},
			{
				"key": "progress_from_tasks",
				"label": "Progress From Tasks",
				"type": "boolean",
				"required": false,
				"help": ""
			},
			{
				"key": "members",
				"label": "Members",
				"type": "json",
				"required": false,
				"help": "Staff ids of the project members; on write replaces them."
			},
			{
				"key": "tags",
				"label": "Tags",
				"type": "list",
				"required": false,
				"help": "Tag names; on write replaces the tags."
			}
		]
	},
	{
		"name": "tasks",
		"noun": "Task",
		"plural": "Tasks",
		"display": "name",
		"sortable": [
			"id",
			"name",
			"priority",
			"status",
			"startdate",
			"duedate",
			"dateadded",
			"datefinished"
		],
		"filterable": [
			"id",
			"name",
			"priority",
			"status",
			"startdate",
			"duedate",
			"rel_type",
			"rel_id",
			"project_id",
			"milestone",
			"is_public",
			"billable",
			"billed",
			"invoice_id",
			"visible_to_client",
			"dateadded",
			"addedfrom"
		],
		"searchable": [
			"name"
		],
		"events": [
			"task.created",
			"task.status_changed",
			"task.assigned"
		],
		"fields": [
			{
				"key": "name",
				"label": "Name",
				"type": "string",
				"required": true,
				"help": ""
			},
			{
				"key": "description",
				"label": "Description",
				"type": "text",
				"required": false,
				"help": ""
			},
			{
				"key": "priority",
				"label": "Priority",
				"type": "enum",
				"required": false,
				"help": "1 low, 2 medium, 3 high, 4 urgent.",
				"choices": [
					"1",
					"2",
					"3",
					"4"
				]
			},
			{
				"key": "status",
				"label": "Status",
				"type": "enum",
				"required": false,
				"help": "1 not started, 2 awaiting feedback, 3 testing, 4 in progress, 5 complete.",
				"choices": [
					"1",
					"2",
					"3",
					"4",
					"5"
				]
			},
			{
				"key": "startdate",
				"label": "Start Date",
				"type": "date",
				"required": false,
				"help": "Default: today."
			},
			{
				"key": "duedate",
				"label": "Due Date",
				"type": "date",
				"required": false,
				"help": ""
			},
			{
				"key": "rel_type",
				"label": "Related To (Type)",
				"type": "enum",
				"required": false,
				"help": "Record type the task belongs to.",
				"choices": [
					"project",
					"customer",
					"lead",
					"ticket",
					"invoice",
					"estimate",
					"proposal",
					"contract",
					"expense"
				]
			},
			{
				"key": "rel_id",
				"label": "Related Record ID",
				"type": "integer",
				"required": false,
				"help": "Id of that record."
			},
			{
				"key": "milestone",
				"label": "Milestone ID",
				"type": "integer",
				"required": false,
				"help": "Milestone id (projects only). 0 = none."
			},
			{
				"key": "is_public",
				"label": "Public",
				"type": "boolean",
				"required": false,
				"help": ""
			},
			{
				"key": "billable",
				"label": "Billable",
				"type": "boolean",
				"required": false,
				"help": ""
			},
			{
				"key": "hourly_rate",
				"label": "Hourly Rate",
				"type": "number",
				"required": false,
				"help": ""
			},
			{
				"key": "visible_to_client",
				"label": "Visible To Client",
				"type": "boolean",
				"required": false,
				"help": ""
			},
			{
				"key": "assignees",
				"label": "Assignees",
				"type": "json",
				"required": false,
				"help": "Staff ids; on write replaces the assignees."
			},
			{
				"key": "followers",
				"label": "Followers",
				"type": "json",
				"required": false,
				"help": "Staff ids; on write replaces the followers."
			},
			{
				"key": "tags",
				"label": "Tags",
				"type": "list",
				"required": false,
				"help": "Tag names; on write replaces the tags."
			}
		]
	},
	{
		"name": "tickets",
		"noun": "Ticket",
		"plural": "Tickets",
		"display": "subject",
		"sortable": [
			"id",
			"subject",
			"department",
			"priority",
			"status",
			"userid",
			"assigned",
			"date",
			"lastreply"
		],
		"filterable": [
			"id",
			"subject",
			"department",
			"priority",
			"status",
			"service",
			"userid",
			"contactid",
			"assigned",
			"project_id",
			"admin",
			"date"
		],
		"searchable": [
			"subject",
			"name",
			"email"
		],
		"events": [
			"ticket.created",
			"ticket.replied",
			"ticket.status_changed"
		],
		"fields": [
			{
				"key": "subject",
				"label": "Subject",
				"type": "string",
				"required": true,
				"help": ""
			},
			{
				"key": "message",
				"label": "Message",
				"type": "text",
				"required": true,
				"help": "First message (HTML allowed)."
			},
			{
				"key": "department",
				"label": "Department",
				"type": "integer",
				"required": true,
				"help": "",
				"ref": "departments"
			},
			{
				"key": "priority",
				"label": "Priority",
				"type": "integer",
				"required": false,
				"help": "Priority id (see /ticket_priorities). 0 = none.",
				"ref": "ticket_priorities"
			},
			{
				"key": "status",
				"label": "Status",
				"type": "integer",
				"required": false,
				"help": "Status id (see /ticket_statuses). Default 1 = open."
			},
			{
				"key": "service",
				"label": "Service ID",
				"type": "integer",
				"required": false,
				"help": ""
			},
			{
				"key": "userid",
				"label": "Customer",
				"type": "integer",
				"required": false,
				"help": "Customer id (0 for outside tickets).",
				"ref": "customers"
			},
			{
				"key": "contactid",
				"label": "Contact ID",
				"type": "integer",
				"required": false,
				"help": "Contact id of the customer."
			},
			{
				"key": "name",
				"label": "Name",
				"type": "string",
				"required": false,
				"help": "Name of an outside requester."
			},
			{
				"key": "email",
				"label": "Email",
				"type": "string",
				"required": false,
				"help": "E-mail of an outside requester."
			},
			{
				"key": "assigned",
				"label": "Assigned Staff Member",
				"type": "integer",
				"required": false,
				"help": "Staff id. 0 = unassigned.",
				"ref": "staff"
			},
			{
				"key": "project_id",
				"label": "Project",
				"type": "integer",
				"required": false,
				"help": "",
				"ref": "projects"
			},
			{
				"key": "cc",
				"label": "CC",
				"type": "string",
				"required": false,
				"help": "Comma list of CC addresses."
			},
			{
				"key": "tags",
				"label": "Tags",
				"type": "list",
				"required": false,
				"help": "Tag names; on write replaces the tags."
			}
		]
	},
	{
		"name": "contracts",
		"noun": "Contract",
		"plural": "Contracts",
		"display": "subject",
		"sortable": [
			"id",
			"subject",
			"client",
			"datestart",
			"dateend",
			"contract_value",
			"dateadded"
		],
		"filterable": [
			"id",
			"subject",
			"client",
			"datestart",
			"dateend",
			"contract_type",
			"project_id",
			"trash",
			"not_visible_to_client",
			"signed",
			"marked_as_signed",
			"addedfrom",
			"dateadded"
		],
		"searchable": [
			"subject"
		],
		"events": [
			"contract.created",
			"contract.signed"
		],
		"fields": [
			{
				"key": "subject",
				"label": "Subject",
				"type": "string",
				"required": true,
				"help": ""
			},
			{
				"key": "client",
				"label": "Customer",
				"type": "integer",
				"required": true,
				"help": "Customer id.",
				"ref": "customers"
			},
			{
				"key": "datestart",
				"label": "Start Date",
				"type": "date",
				"required": true,
				"help": ""
			},
			{
				"key": "description",
				"label": "Description",
				"type": "text",
				"required": false,
				"help": ""
			},
			{
				"key": "content",
				"label": "Content",
				"type": "text",
				"required": false,
				"help": "HTML body."
			},
			{
				"key": "dateend",
				"label": "End Date",
				"type": "date",
				"required": false,
				"help": ""
			},
			{
				"key": "contract_type",
				"label": "Contract Type ID",
				"type": "integer",
				"required": false,
				"help": "See /contract_types."
			},
			{
				"key": "project_id",
				"label": "Project",
				"type": "integer",
				"required": false,
				"help": "",
				"ref": "projects"
			},
			{
				"key": "contract_value",
				"label": "Contract Value",
				"type": "number",
				"required": false,
				"help": ""
			},
			{
				"key": "trash",
				"label": "Trash",
				"type": "boolean",
				"required": false,
				"help": ""
			},
			{
				"key": "not_visible_to_client",
				"label": "Not Visible To Client",
				"type": "boolean",
				"required": false,
				"help": ""
			}
		]
	},
	{
		"name": "expenses",
		"noun": "Expense",
		"plural": "Expenses",
		"display": "expense_name",
		"sortable": [
			"id",
			"expense_name",
			"amount",
			"date",
			"dateadded"
		],
		"filterable": [
			"id",
			"expense_name",
			"category",
			"amount",
			"currency",
			"date",
			"clientid",
			"project_id",
			"billable",
			"invoiceid",
			"recurring",
			"addedfrom",
			"dateadded"
		],
		"searchable": [
			"expense_name",
			"reference_no"
		],
		"events": [
			"expense.created"
		],
		"fields": [
			{
				"key": "category",
				"label": "Category",
				"type": "integer",
				"required": true,
				"help": "See /expense_categories.",
				"ref": "expense_categories"
			},
			{
				"key": "amount",
				"label": "Amount",
				"type": "number",
				"required": true,
				"help": ""
			},
			{
				"key": "date",
				"label": "Date",
				"type": "date",
				"required": true,
				"help": ""
			},
			{
				"key": "expense_name",
				"label": "Expense Name",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "currency",
				"label": "Currency ID",
				"type": "integer",
				"required": false,
				"help": "Default: customer currency, else base currency."
			},
			{
				"key": "tax",
				"label": "Tax ID",
				"type": "integer",
				"required": false,
				"help": "Tax id (see /taxes)."
			},
			{
				"key": "tax2",
				"label": "Second Tax ID",
				"type": "integer",
				"required": false,
				"help": ""
			},
			{
				"key": "note",
				"label": "Note",
				"type": "text",
				"required": false,
				"help": ""
			},
			{
				"key": "reference_no",
				"label": "Reference Number",
				"type": "string",
				"required": false,
				"help": ""
			},
			{
				"key": "clientid",
				"label": "Customer",
				"type": "integer",
				"required": false,
				"help": "Customer id (needed when billable).",
				"ref": "customers"
			},
			{
				"key": "project_id",
				"label": "Project",
				"type": "integer",
				"required": false,
				"help": "",
				"ref": "projects"
			},
			{
				"key": "billable",
				"label": "Billable",
				"type": "boolean",
				"required": false,
				"help": ""
			},
			{
				"key": "paymentmode",
				"label": "Payment Mode",
				"type": "string",
				"required": false,
				"help": "Payment mode id (see /payment_modes).",
				"ref": "payment_modes"
			}
		]
	}
];

export const TRIGGER_EVENTS: Array<{ event: string; label: string; description: string }> = [
	{
		"event": "lead.created",
		"label": "New Lead",
		"description": "Triggers when a lead is added (web form, import, API or by hand)."
	},
	{
		"event": "lead.status_changed",
		"label": "Lead Status Changed",
		"description": "Triggers when a lead moves to another status."
	},
	{
		"event": "lead.converted",
		"label": "Lead Converted",
		"description": "Triggers when a lead is converted to a customer."
	},
	{
		"event": "customer.created",
		"label": "New Customer",
		"description": "Triggers when a customer is created."
	},
	{
		"event": "contact.created",
		"label": "New Contact",
		"description": "Triggers when a customer contact is created."
	},
	{
		"event": "invoice.created",
		"label": "New Invoice",
		"description": "Triggers when an invoice is created."
	},
	{
		"event": "invoice.sent",
		"label": "Invoice Sent",
		"description": "Triggers when an invoice is sent to the customer."
	},
	{
		"event": "invoice.paid",
		"label": "Invoice Paid",
		"description": "Triggers when an invoice is fully paid."
	},
	{
		"event": "payment.created",
		"label": "New Payment",
		"description": "Triggers when a payment is recorded on an invoice."
	},
	{
		"event": "estimate.accepted",
		"label": "Estimate Accepted",
		"description": "Triggers when a customer accepts an estimate."
	},
	{
		"event": "estimate.declined",
		"label": "Estimate Declined",
		"description": "Triggers when a customer declines an estimate."
	},
	{
		"event": "proposal.accepted",
		"label": "Proposal Accepted",
		"description": "Triggers when a proposal is accepted."
	},
	{
		"event": "contract.signed",
		"label": "Contract Signed",
		"description": "Triggers when a contract is signed."
	},
	{
		"event": "project.created",
		"label": "New Project",
		"description": "Triggers when a project is created."
	},
	{
		"event": "project.status_changed",
		"label": "Project Status Changed",
		"description": "Triggers when a project changes status."
	},
	{
		"event": "task.created",
		"label": "New Task",
		"description": "Triggers when a task is created."
	},
	{
		"event": "task.assigned",
		"label": "Task Assigned",
		"description": "Triggers when a staff member is assigned to a task."
	},
	{
		"event": "task.status_changed",
		"label": "Task Status Changed",
		"description": "Triggers when a task changes status (for example, completed)."
	},
	{
		"event": "ticket.created",
		"label": "New Ticket",
		"description": "Triggers when a support ticket is opened."
	},
	{
		"event": "ticket.replied",
		"label": "Ticket Replied",
		"description": "Triggers when a ticket gets a reply."
	},
	{
		"event": "ticket.status_changed",
		"label": "Ticket Status Changed",
		"description": "Triggers when a ticket changes status."
	},
	{
		"event": "expense.created",
		"label": "New Expense",
		"description": "Triggers when an expense is recorded."
	}
];
