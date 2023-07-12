import React from 'react'
import Pressable from '~/components/pressable'
import { colors } from '~/styles/theme'
import { Box, IPressableProps } from 'native-base'
import Text from '~/components/text'
import { TrendDown, TrendUp } from 'phosphor-react-native'
import moment from 'moment'

interface IOverviewProps extends IPressableProps {
  icon?: 'up' | 'down'
  total?: boolean
  name?: string
  report?: {
    value: number
    lastUpdate: string
  }
}

export default function Overview({
  icon,
  total,
  name,
  report,
  ...props
}: IOverviewProps) {
  let price
  let date

  if (report) {
    const value = report.value || 0
    price = Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'EUR',
    })

    if (report.lastUpdate === 'Today') {
      date = report.lastUpdate
    } else if (typeof report.lastUpdate === 'string') {
      date = moment(report.lastUpdate).format('[Last update] D MMM')
    } else {
      date = ''
    }
  }

  return (
    <Pressable
      {...props}
      isDisabled
      bg={total ? colors.primary : colors.white}
      rounded={'14px'}
      w="200px"
      alignItems="flex-start"
      p={4}
      position="relative"
    >
      <Box flexDir="row" w="100%" justifyContent="space-between">
        <Text h4 semibold color={total ? colors.white : colors.gray}>
          {name}
        </Text>
        {icon === 'up' && (
          <TrendUp size={27} weight="bold" color={colors.success} />
        )}
        {icon === 'down' && (
          <TrendDown size={27} weight="bold" color={colors.attention} />
        )}
      </Box>
      <Text
        h1
        bold
        color={
          total
            ? colors.white
            : icon === 'up'
            ? colors.success
            : colors.attention
        }
      >
        {price}
      </Text>
      <Text h5 color={total ? colors.white : colors.gray}>
        {date}
      </Text>
      <Box position="absolute" top={4} right={4}></Box>
    </Pressable>
  )
}
