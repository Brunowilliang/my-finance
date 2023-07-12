import { Box, KeyboardAvoidingView, ScrollView, VStack } from 'native-base'
import { CaretDown, Plus, TrendDown, TrendUp } from 'phosphor-react-native'
import React, { useEffect, useRef, useState } from 'react'
import HeaderModal from '~/components/headerModal'
import Input from '~/components/input'
import Pressable from '~/components/pressable'
import SegmentedControl from '~/components/segmentedControl'
import Text from '~/components/text'
import { colors } from '~/styles/theme'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter, useSearchParams } from 'expo-router'
import { useAuthStore } from '~/stores/AuthStore'
import useCategories from '~/hooks/useCategories'
import { ICategoryProps } from '~/types/interface'
import { transactionSchema } from '~/schemas/transaction'
import Select from '~/components/selectInput'
import { categorySchema } from '~/schemas/category'
import useTransactions, { useFindTransaction } from '~/hooks/useTransactions'
import Loading from '~/components/loading'
import ModalBottomSheet, {
  IModalBottomSheet,
} from '~/components/ModalBottomSheet'
import CardCategory from '~/components/pages/category/card'
import Calendar from '~/components/calendar'
import moment from 'moment'
import Toast from '~/components/toast'

export default function Page() {
  const router = useRouter()
  const { id } = useSearchParams()
  const { user } = useAuthStore()
  const { updateTransaction, createTransaction } = useTransactions()
  const { data, isFetching } = useFindTransaction(id as string)

  const [segment, setSegment] = useState(0)
  const [selectedDate, setSelectedDate] = useState<any>()
  const [selectedCategory, setSelectedCategory] = useState<ICategoryProps>()
  const modalCategory = useRef<IModalBottomSheet>(null)
  const modalCreateCategory = useRef<IModalBottomSheet>(null)

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(transactionSchema),
  })

  const {
    control: controlCategory,
    handleSubmit: handleSubmitCategory,
    getValues: getValuesCategory,
    formState: { errors: errorsCategory },
  } = useForm({
    resolver: yupResolver(categorySchema),
  })

  const { categories, createCategory, deleteCategory } = useCategories(
    selectedCategory?.id,
  )

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        price: data.price + '',
        description: data.description,
      })
      setSegment(data.type === 'income' ? 0 : 1)
      setSelectedDate(moment(data?.date).format('YYYY-MM-DD'))
      setSelectedCategory(data?.expand?.category as ICategoryProps)
    }
  }, [data])

  function buildTransaction() {
    return {
      user: user?.id,
      name: getValues('name'),
      price: getValues('price').replace(',', '.'),
      category: selectedCategory?.id,
      date: selectedDate,
      description: getValues('description'),
      type: segment === 0 ? 'income' : 'expense',
    }
  }

  async function create() {
    const transaction = buildTransaction()
    if (!selectedCategory) {
      return Toast({
        message: 'Atention',
        description: 'Select a category',
        type: 'warning',
      })
    }
    if (!selectedDate) {
      return Toast({
        message: 'Atention',
        description: 'Select a date',
        type: 'warning',
      })
    }
    await createTransaction(transaction as any, {
      onSuccess: () => {
        router.back()
      },
    })
  }

  async function update() {
    const transaction = buildTransaction()
    await updateTransaction({ id, transaction } as any, {
      onSuccess: () => {
        router.back()
      },
    })
  }

  function buildCategory() {
    return {
      user: user?.id,
      name: getValuesCategory('name'),
    } as ICategoryProps
  }

  async function handleCreateCategory() {
    const category = buildCategory()
    await createCategory(category, {
      onSuccess: () => {
        modalCreateCategory.current?.close()
        modalCategory.current?.open()
      },
    })
  }

  async function handleDeleteCategory(id: string) {
    await deleteCategory({ id })
  }

  return (
    <>
      <Loading loading={isFetching} />
      <Box safeArea flex={1} px={4} bg={colors.background}>
        <HeaderModal
          back
          title={data ? 'Update Transaction' : 'Create Transaction'}
        />
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView behavior="position">
            <VStack flex={1} space={4} mb={4}>
              <SegmentedControl
                containerMargin={21}
                segments={[
                  {
                    label: 'Income',
                    value: 0,
                    visible: true,
                    icon: (
                      <TrendUp
                        size={21}
                        weight="bold"
                        color={segment === 1 ? colors.gray : colors.primary}
                      />
                    ),
                  },
                  {
                    label: 'Expense',
                    value: 1,
                    visible: true,
                    icon: (
                      <TrendDown
                        size={21}
                        weight="bold"
                        color={segment === 0 ? colors.gray : colors.primary}
                      />
                    ),
                  },
                ]}
                currentIndex={segment}
                onChange={(value) => {
                  setSegment(value)
                }}
              />
              <Calendar
                current={moment().format('YYYY-MM-DD HH:mm:ss.SSS[Z]')}
                selected={selectedDate}
                onDayPress={(day) => {
                  setSelectedDate(day.dateString)
                }}
              />
              <Input
                h={'56px'}
                error={errors.name?.message}
                control={control}
                name="name"
                placeholder="Name"
              />
              <Input
                h={'56px'}
                error={errors.price?.message}
                control={control}
                keyboardType="numeric"
                name="price"
                placeholder="Price"
                contextMenuHidden
              />
              <Select
                onPress={() => {
                  modalCategory.current?.open()
                }}
                placeholder="Select Category"
                value={selectedCategory?.name}
              />
              <Input
                h={'150px'}
                error={errors.description?.message}
                control={control}
                name="description"
                multiline
                pt={3}
                maxHeight={200}
                placeholder="Description"
              />
            </VStack>
          </KeyboardAvoidingView>
        </ScrollView>
        <Pressable
          onPress={handleSubmit(data ? update : create)}
          h={'56px'}
          bg={colors.primary}
          borderRadius={14}
        >
          <Text semibold color={colors.white}>
            {data ? 'Update Transaction' : 'Create Transaction'}
          </Text>
        </Pressable>
      </Box>

      <ModalBottomSheet
        ref={modalCategory}
        title="Select Category"
        rightComponent={
          <Pressable
            onPress={() => {
              modalCategory.current?.close()
              modalCreateCategory.current?.open()
            }}
          >
            <Plus size={21} weight="bold" color={colors.primary} />
          </Pressable>
        }
      >
        <VStack space={2} mt={4}>
          {categories.data?.map((category) => (
            <CardCategory
              key={category.id}
              name={category.name}
              selected={selectedCategory?.id === category.id}
              onPress={() => {
                setSelectedCategory(category)
                modalCategory.current?.close()
              }}
              onRemove={() => {
                handleDeleteCategory(category.id)
              }}
            />
          ))}
          {categories.data?.length === 0 && (
            <Text textAlign={'center'} color={colors.gray}>
              No data found
            </Text>
          )}
        </VStack>
      </ModalBottomSheet>

      <ModalBottomSheet
        ref={modalCreateCategory}
        title="Create Category"
        leftComponent={
          <Pressable
            onPress={() => {
              modalCreateCategory.current?.close()
              modalCategory.current?.open()
            }}
          >
            <CaretDown size={21} weight="bold" color={colors.gray} />
          </Pressable>
        }
      >
        <KeyboardAvoidingView behavior="position">
          <VStack px={4} space={2} mt={4}>
            <Input
              h={'56px'}
              error={errorsCategory.name?.message}
              control={controlCategory}
              name="name"
              placeholder="Name"
            />
            <Pressable
              onPress={handleSubmitCategory(handleCreateCategory)}
              h={'56px'}
              bg={colors.primary}
            >
              <Text semibold color={colors.white}>
                Create Category
              </Text>
            </Pressable>
          </VStack>
        </KeyboardAvoidingView>
      </ModalBottomSheet>
    </>
  )
}
