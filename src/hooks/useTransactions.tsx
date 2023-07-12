import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '~/lib/api'
import { useAuthStore } from '~/stores/AuthStore'
import { ITransactionsProps } from '~/types/interface'
import { Collections } from '~/types/types'
import Toast from '~/components/toast'

export default function useTransactions() {
  const { user } = useAuthStore()
  const queryClient = useQueryClient()

  const transactions = useQuery<ITransactionsProps[]>({
    queryKey: ['transactions'],
    queryFn: () => getAll(user?.id as string),
  })

  const createTransaction = useMutation(
    (transaction: ITransactionsProps) =>
      api.collection(Collections.Transactions).create(transaction),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['reportsType'])
        queryClient.invalidateQueries(['transactions'])
        Toast({
          message: 'Success',
          description: 'Your transaction was created successfully',
          type: 'success',
        })
      },
      onError: (error) => {
        console.log(error)
        Toast({
          message: 'Error',
          description: 'An error occurred while creating your transaction',
          type: 'danger',
        })
      },
    },
  )

  const updateTransaction = useMutation(
    ({ id, transaction }: { id: string; transaction: ITransactionsProps }) =>
      api.collection(Collections.Transactions).update(id, transaction),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['reportsType'])
        queryClient.invalidateQueries(['transactions'])
        Toast({
          message: 'Success',
          description: 'Your transaction was updated successfully',
          type: 'success',
        })
      },
      onError: (error) => {
        console.log(error)
        Toast({
          message: 'Error',
          description: 'An error occurred while updating your transaction',
          type: 'danger',
        })
      },
    },
  )

  const deleteTransaction = useMutation(
    (id: string) => api.collection(Collections.Transactions).delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['reportsType'])
        queryClient.invalidateQueries(['transactions'])
        Toast({
          message: 'Success',
          description: 'Your transaction was deleted successfully',
          type: 'success',
        })
      },
      onError: (error) => {
        console.log(error)
        Toast({
          message: 'Error',
          description: 'An error occurred while deleting your transaction',
          type: 'danger',
        })
      },
    },
  )

  return {
    transactions,
    createTransaction: createTransaction.mutateAsync,
    updateTransaction: updateTransaction.mutateAsync,
    deleteTransaction: deleteTransaction.mutateAsync,
  }
}

async function getAll(id?: string) {
  if (!id) return
  try {
    const response = await api
      .collection(Collections.Transactions)
      .getFullList(200, {
        expand: 'user,category',
        sort: '-created',
        filter: `user="${id}"`,
      })
    return response as any
  } catch (error) {
    console.log(error)
  }
}

export function useFindTransaction(transactionId: string) {
  return useQuery<ITransactionsProps>({
    queryKey: ['transaction', transactionId],
    queryFn: () => find(transactionId),
    enabled: transactionId !== 'create' && transactionId !== undefined,
  })
}

async function find(transactionId: string) {
  if (!transactionId) return
  try {
    const response = await api
      .collection(Collections.Transactions)
      .getOne(transactionId, {
        expand: 'user,category',
      })
    return response as any
  } catch (error) {
    console.log(error)
  }
}
