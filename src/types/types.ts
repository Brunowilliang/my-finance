/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Categories = "categories",
	ReportsCharts = "reportsCharts",
	ReportsTypes = "reportsTypes",
	Teste = "teste",
	Transactions = "transactions",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type CategoriesRecord = {
	user?: RecordIdString
	name?: string
}

export type ReportsChartsRecord<Texpense = unknown, TexpensePercentage = unknown, Tincome = unknown, TincomePercentage = unknown, TlastCreated = unknown, TmonthYear = unknown> = {
	user?: RecordIdString
	category?: RecordIdString
	monthYear?: null | TmonthYear
	income?: null | Tincome
	expense?: null | Texpense
	lastCreated?: null | TlastCreated
	incomePercentage?: null | TincomePercentage
	expensePercentage?: null | TexpensePercentage
}

export type ReportsTypesRecord<Texpense = unknown, Tincome = unknown, TlastUpdateExpense = unknown, TlastUpdateIncome = unknown, TmonthYear = unknown, Ttotal = unknown> = {
	user?: RecordIdString
	monthYear?: null | TmonthYear
	income?: null | Tincome
	expense?: null | Texpense
	total?: null | Ttotal
	lastUpdateIncome?: null | TlastUpdateIncome
	lastUpdateExpense?: null | TlastUpdateExpense
}

export type TesteRecord = never

export type TransactionsRecord = {
	user?: RecordIdString
	category?: RecordIdString
	price?: number
	name?: string
	type?: string
	description?: string
	date?: IsoDateString
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type CategoriesResponse<Texpand = unknown> = Required<CategoriesRecord> & BaseSystemFields<Texpand>
export type ReportsChartsResponse<Texpense = unknown, TexpensePercentage = unknown, Tincome = unknown, TincomePercentage = unknown, TlastCreated = unknown, TmonthYear = unknown, Texpand = unknown> = Required<ReportsChartsRecord<Texpense, TexpensePercentage, Tincome, TincomePercentage, TlastCreated, TmonthYear>> & BaseSystemFields<Texpand>
export type ReportsTypesResponse<Texpense = unknown, Tincome = unknown, TlastUpdateExpense = unknown, TlastUpdateIncome = unknown, TmonthYear = unknown, Ttotal = unknown, Texpand = unknown> = Required<ReportsTypesRecord<Texpense, Tincome, TlastUpdateExpense, TlastUpdateIncome, TmonthYear, Ttotal>> & BaseSystemFields<Texpand>
export type TesteResponse = Required<TesteRecord> & BaseSystemFields
export type TransactionsResponse<Texpand = unknown> = Required<TransactionsRecord> & BaseSystemFields<Texpand>
export type UsersResponse = Required<UsersRecord> & AuthSystemFields

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	categories: CategoriesRecord
	reportsCharts: ReportsChartsRecord
	reportsTypes: ReportsTypesRecord
	teste: TesteRecord
	transactions: TransactionsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	categories: CategoriesResponse
	reportsCharts: ReportsChartsResponse
	reportsTypes: ReportsTypesResponse
	teste: TesteResponse
	transactions: TransactionsResponse
	users: UsersResponse
}