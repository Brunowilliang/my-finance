import React, { useMemo, useState } from 'react'
import { Box, HStack, ScrollView, VStack } from 'native-base'
import Text from '~/components/text'
import Header from '~/components/header'
import { useAuthStore } from '~/stores/AuthStore'
import { colors } from '~/styles/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useTransactions from '~/hooks/useTransactions'
import { useFocusRefetch } from '~/hooks/useFocusRefetch'
import useReports from '~/hooks/useReports'
import CardTransactions from '~/components/pages/index/card'
import Overview from '~/components/pages/index/overview'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Layout,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated'
import BottomSheet from '~/components/BottomSheet'
import { useRouter } from 'expo-router'
import moment from 'moment'
import Pressable from '~/components/pressable'
import { CaretLeft, CaretRight, DotsThreeVertical } from 'phosphor-react-native'
import MenuOptions from '~/components/menuOptions'

export default function Page() {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const [month, setMonth] = useState(moment().format('MMM, YY'))
  const { bottom } = useSafeAreaInsets()
  const { transactions, deleteTransaction } = useTransactions()
  const { data } = transactions
  const { reportsType } = useReports()
  const { data: reports, refetch: refetchReports } = reportsType

  useFocusRefetch(refetchReports)

  const AnimatedVStack = Animated.createAnimatedComponent(VStack)

  const snapPoints = useMemo(() => ['66%', '100%'], [])
  const animatedIndex = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animatedIndex.value, [0, 0.9], [1, 0])
    return { opacity }
  })

  const nextMonth = () => {
    setMonth(moment(month, 'MMM, YY').add(1, 'month').format('MMM, YY'))
  }

  const prevMonth = () => {
    setMonth(moment(month, 'MMM, YY').subtract(1, 'month').format('MMM, YY'))
  }

  const filteredReports = reports?.filter((item) => {
    return moment(item.monthYear as string).format('MMM, YY') === month
  }) as Array<any>

  const filteredTransactions = data?.filter((item) => {
    return moment(item.date).format('MMM, YY') === month
  }) as Array<any>

  const reportIncome = {
    value: reports
      ? filteredReports.reduce(
          (acc, item) => acc + (Number(item.income) || 0),
          0,
        )
      : 0,
    lastUpdate: reports ? (reports[0]?.lastUpdateIncome as string) : '',
  }

  const reportExpense = {
    value: reports
      ? filteredReports.reduce(
          (acc, item) => acc + (Number(item.expense) || 0),
          0,
        )
      : 0,
    lastUpdate: reports ? (reports[0]?.lastUpdateExpense as string) : '',
  }

  const reportTotal = {
    value: reports
      ? filteredReports.reduce(
          (acc, item) => acc + (Number(item.total) || 0),
          0,
        )
      : 0,
    lastUpdate: 'Today',
  }

  const logoutUser = async () => {
    try {
      await logout()
      router.replace('(auth)')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Box safeAreaTop flex={1} bg={colors.background}>
        <Animated.View style={[animatedStyle]}>
          <Header
            title="Wellcome"
            subtitle={user?.name || user?.username}
            rightComponent={
              <MenuOptions
                Icon={
                  <DotsThreeVertical
                    size={27}
                    weight="bold"
                    color={colors.gray}
                  />
                }
                items={[
                  {
                    name: 'Logout',
                    onPress: () => {
                      logoutUser()
                    },
                  },
                  {
                    name: 'Account',
                    onPress: () => {
                      router.push(`/profile/${user?.id}`)
                    },
                  },
                ]}
              />
            }
          />
          <HStack px={5} justifyContent={'space-between'} alignItems={'center'}>
            <Text semibold h2>
              Overview
            </Text>
            <HStack justifyContent={'space-between'} alignItems={'center'}>
              <Pressable onPress={prevMonth}>
                <CaretLeft size={21} weight="bold" color={colors.gray} />
              </Pressable>
              <Text
                semibold
                textAlign={'center'}
                numberOfLines={1}
                width={'20'}
              >
                {month}
              </Text>
              <Pressable onPress={nextMonth}>
                <CaretRight size={21} weight="bold" color={colors.gray} />
              </Pressable>
            </HStack>
          </HStack>
          <ScrollView
            bg={colors.background}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <HStack space={4} px={5} py={2}>
              <Overview icon="up" name="Income" report={reportIncome} />
              <Overview icon="down" name="Expenses" report={reportExpense} />
              <Overview total name="Total Balance" report={reportTotal} />
            </HStack>
          </ScrollView>
        </Animated.View>
      </Box>

      <BottomSheet snapPoints={snapPoints} animatedIndex={animatedIndex}>
        <AnimatedVStack
          layout={Layout}
          entering={FadeIn}
          exiting={FadeOut}
          space={2}
          px={5}
          pb={bottom + 10}
        >
          <Text pb={3} semibold h2>
            Transactions{' '}
            {moment(month, 'MMM, YY').format('MMMM, YYYY').toLowerCase()}
          </Text>
          {filteredTransactions?.map((item, i) => (
            <CardTransactions
              onPress={() => {
                router.push(`/transaction/${item.id}`)
              }}
              onLongPress={() => deleteTransaction(item.id)}
              key={item.id}
              item={item}
            />
          ))}
          {filteredTransactions?.length === 0 && (
            <Text textAlign={'center'} color={colors.gray}>
              No data found
            </Text>
          )}
        </AnimatedVStack>
      </BottomSheet>
    </>
  )
}
