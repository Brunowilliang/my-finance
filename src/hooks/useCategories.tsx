import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '~/lib/api'
import { useAuthStore } from '~/stores/AuthStore'
import { ICategoryProps } from '~/types/interface'
import { Collections } from '~/types/types'
import Toast from '~/components/toast'

export default function useCategories(id?: string) {
  const { user } = useAuthStore()
  const queryClient = useQueryClient()

  const categories = useQuery<ICategoryProps[]>({
    queryKey: ['categories'],
    queryFn: () => getAll(user?.id as string),
  })

  const findCategory = useQuery<ICategoryProps, Error>({
    queryKey: ['category', id],
    queryFn: () => find(id as string),
    enabled: false,
  })

  const createCategory = useMutation(
    (category: ICategoryProps) =>
      api.collection(Collections.Categories).create(category),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['categories'])
        Toast({
          message: 'Success',
          description: 'Your category was created successfully',
          type: 'success',
        })
      },
      onError: (error) => {
        console.log(error)
        Toast({
          message: 'Error',
          description: 'An error occurred while creating your category',
          type: 'danger',
        })
      },
    },
  )

  const updateCategory = useMutation(
    ({ id, category }: { id: string; category: ICategoryProps }) =>
      api.collection(Collections.Categories).update(id, category),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['categories'])
        Toast({
          message: 'Success',
          description: 'Your category was updated successfully',
          type: 'success',
        })
      },
      onError: (error) => {
        console.log(error)
        Toast({
          message: 'Error',
          description: 'An error occurred while updating your category',
          type: 'danger',
        })
      },
    },
  )

  const deleteCategory = useMutation(
    ({ id }: { id: string }) =>
      api.collection(Collections.Categories).delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['categories'])
        Toast({
          message: 'Success',
          description: 'Your category was deleted successfully',
          type: 'success',
        })
      },
      onError: (error) => {
        console.log(error)
        Toast({
          message: 'Error',
          description: 'An error occurred while deleting your category',
          type: 'danger',
        })
      },
    },
  )

  return {
    categories,
    findCategory,
    createCategory: createCategory.mutateAsync,
    updateCategory: updateCategory.mutateAsync,
    deleteCategory: deleteCategory.mutateAsync,
  }
}

async function getAll(id?: string) {
  if (!id) return
  try {
    const response = await api.collection(Collections.Categories).getFullList({
      sort: '-created',
      filter: `user = "${id}"`,
    })
    return response as any
  } catch (error) {
    console.log(error)
  }
}

async function find(id: string) {
  try {
    const response = await api.collection(Collections.Categories).getOne(id)
    return response as any
  } catch (error) {
    console.log(error)
  }
}
