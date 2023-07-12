import { useQuery } from '@tanstack/react-query'
import api from '~/lib/api'
import { useAuthStore } from '~/stores/AuthStore'
import { IReportChart, IReportTypes } from '~/types/interface'
import { Collections } from '~/types/types'

export default function useReports() {
  const { user } = useAuthStore()

  const reportsType = useQuery<IReportTypes[]>({
    queryKey: ['reportsType'],
    queryFn: () => getReportsType(user?.id as string),
  })

  const reportsCharts = useQuery<IReportChart[]>({
    queryKey: ['reportsCharts'],
    queryFn: () => getReportsCharts(user?.id as string),
  })

  return { reportsType, reportsCharts }
}

async function getReportsType(id: string) {
  try {
    const response = await api
      .collection(Collections.ReportsTypes)
      .getFullList(200, {
        filter: `user = "${id}"`,
      })
    return response as any
  } catch (error) {
    console.log(error)
  }
}

async function getReportsCharts(id: string) {
  try {
    const response = await api
      .collection(Collections.ReportsCharts)
      .getFullList(200, {
        filter: `user = "${id}"`,
        expand: 'user,category',
      })
    return response as any
  } catch (error) {
    console.log(error)
  }
}
