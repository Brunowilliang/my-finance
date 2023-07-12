import {
  TransactionsResponse,
  CategoriesResponse,
  UsersResponse,
  ReportsTypesResponse,
  ReportsChartsResponse,
} from './types'

type expandCategory = {
  user: UsersResponse
}

type expandTransaction = {
  user: UsersResponse
  category: CategoriesResponse
}
type expandReportsChartsResponse = {
  user: UsersResponse
  category: CategoriesResponse
}

export type IUserProps = UsersResponse
export type IReportChart = ReportsChartsResponse<
  any,
  any,
  any,
  any,
  any,
  any,
  expandReportsChartsResponse
>
export type IReportTypes = ReportsTypesResponse
export type ICategoryProps = CategoriesResponse<expandCategory>
export type ITransactionsProps = TransactionsResponse<expandTransaction>
