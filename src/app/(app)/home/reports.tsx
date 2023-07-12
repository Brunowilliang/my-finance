import React, { useEffect, useMemo, useState } from 'react'
import { Box, HStack, VStack } from 'native-base'
import Text from '~/components/text'
import { useFocusRefetch } from '~/hooks/useFocusRefetch'
import { VictoryPie, VictoryTooltip } from 'victory-native'

import { colors } from '~/styles/theme'
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CaretLeft,
  CaretRight,
  DotsThreeVertical,
} from 'phosphor-react-native'
import Header from '~/components/header'
import { useAuthStore } from '~/stores/AuthStore'
import Pressable from '~/components/pressable'
import moment from 'moment'
import useReports from '~/hooks/useReports'
import CardReports from '~/components/pages/reports/card'
import MenuOptions from '~/components/menuOptions'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BottomSheet from '~/components/BottomSheet'
import { useWindowDimensions } from 'react-native'

export default function Page() {
  const { bottom } = useSafeAreaInsets()
  const { user } = useAuthStore()
  const { reportsCharts } = useReports()
  const { data, refetch } = reportsCharts
  const [type, setType] = useState<'income' | 'expense'>('income')
  const [month, setMonth] = useState(moment().format('MMMM, YYYY'))
  useFocusRefetch(refetch)

  const width = useWindowDimensions().width

  const nextMonth = () => {
    setMonth(moment(month, 'MMMM, YYYY').add(1, 'month').format('MMMM, YYYY'))
  }

  const prevMonth = () => {
    setMonth(
      moment(month, 'MMMM, YYYY').subtract(1, 'month').format('MMMM, YYYY'),
    )
  }

  const snapPointsNoData = useMemo(() => ['88%', '100%'], [])
  const snapPoints = useMemo(() => ['59%', '88%', '100%'], [])

  const animatedIndex = useSharedValue(0)

  const headerOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(animatedIndex.value, [0, 1, 2], [1, 1, 0])
    return { opacity }
  })

  const chartOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(animatedIndex.value, [0, 1, 2], [1, 0, 0])
    return { opacity }
  })

  const filteredDataCharts = data?.filter((item: any) => {
    return (
      moment(item.lastCreated).format('MMMM, YYYY') === month &&
      (type === 'expense' ? item.expense : item.income) > 0
    )
  }) as Array<any>

  const teste = useSharedValue(1)

  useEffect(() => {
    if (filteredDataCharts?.length > 0) {
      teste.value = withTiming(1, { duration: 1300 })
    } else if (filteredDataCharts?.length === 0) {
      teste.value = withTiming(0, { duration: 600 })
    }
  }, [filteredDataCharts?.length])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: teste.value,
    }
  })

  return (
    <Box safeAreaTop flex={1} bg={colors.background}>
      <Animated.View style={[headerOpacity]}>
        <Header
          title="Wellcome"
          subtitle={user?.name}
          rightComponent={
            <MenuOptions
              Icon={
                <DotsThreeVertical
                  size={28}
                  weight="bold"
                  color={colors.gray}
                />
              }
              items={[
                {
                  icon: (
                    <ArrowCircleUp
                      size={21}
                      weight="bold"
                      color={type === 'income' ? colors.success : colors.gray}
                    />
                  ),
                  active: type === 'income',
                  colorActive: colors.success,
                  name: 'Income',
                  onPress: () => setType('income'),
                },
                {
                  icon: (
                    <ArrowCircleDown
                      size={21}
                      weight="bold"
                      color={
                        type === 'expense' ? colors.attention : colors.gray
                      }
                    />
                  ),
                  active: type === 'expense',
                  colorActive: colors.attention,
                  name: 'Expense',
                  onPress: () => setType('expense'),
                },
              ]}
            />
          }
        />
      </Animated.View>

      <Animated.View style={[animatedStyle]}>
        <Animated.View style={[chartOpacity]}>
          <VictoryPie
            padAngle={2}
            startAngle={90}
            endAngle={-90}
            cornerRadius={6}
            innerRadius={100}
            width={width}
            labels={
              type === 'income'
                ? ({ datum }) =>
                    `${datum.expand.category.name} - ${datum.incomePercentage}%`
                : ({ datum }) =>
                    `${datum.expand.category.name} - ${datum.expensePercentage}%`
            }
            labelComponent={
              <VictoryTooltip
                renderInPortal={false}
                cornerRadius={6}
                center={{ x: width / 2, y: 180 }}
                pointerOrientation="bottom"
                flyoutPadding={8}
                flyoutStyle={{
                  fill:
                    type === 'income'
                      ? colors.successOpacity
                      : colors.attentionOpacity,
                  stroke: colors.transparent,
                }}
                style={{
                  backgroundColor: colors.transparent,
                  fontSize: 16,
                  fontWeight: 'medium',
                  fill: type === 'income' ? colors.success : colors.attention,
                }}
                pointerWidth={0}
                pointerLength={10}
              />
            }
            animate={{
              duration: 500,
            }}
            data={
              type === 'income'
                ? filteredDataCharts?.filter(
                    (item) => item.incomePercentage > 0,
                  )
                : filteredDataCharts?.filter(
                    (item) => item.expensePercentage > 0,
                  )
            }
            x={'category'}
            y={type === 'income' ? 'incomePercentage' : 'expensePercentage'}
            colorScale={
              type === 'income'
                ? ['#63c78f', '#41b675', '#12a454', '#088434', '#006614']
                : ['#ff9fbf', '#ff5f7f', '#e83f5b', '#d02040', '#b00020']
            }
          />
        </Animated.View>
      </Animated.View>

      <BottomSheet
        snapPoints={
          filteredDataCharts?.length > 0 ? snapPoints : snapPointsNoData
        }
        index={0}
        animatedIndex={animatedIndex}
      >
        <HStack m={4} justifyContent={'space-between'} alignItems={'center'}>
          <Pressable onPress={prevMonth}>
            <CaretLeft size={21} weight="bold" color={colors.gray} />
          </Pressable>
          <Text>{month}</Text>
          <Pressable onPress={nextMonth}>
            <CaretRight size={21} weight="bold" color={colors.gray} />
          </Pressable>
        </HStack>
        <VStack space={2} px={5} pb={bottom + 10}>
          {filteredDataCharts?.map((item) => (
            <CardReports key={item.id} item={item} type={type} />
          ))}
          {filteredDataCharts?.length === 0 && (
            <Text textAlign={'center'} color={colors.gray}>
              No data found
            </Text>
          )}
        </VStack>
      </BottomSheet>
    </Box>
  )
}
