import React from 'react'
import { Box, HStack } from 'native-base'
import { colors } from '~/styles/theme'
import Text from '~/components/text'
import { IReportChart } from '~/types/interface'
import moment from 'moment'

interface ICardProps {
  item: IReportChart
  type: 'income' | 'expense'
}

export default function CardReports({ item, type }: ICardProps) {
  return (
    <Box
      key={item.id}
      p={3}
      bg={colors.background}
      rounded="lg"
      borderLeftWidth={4}
      borderLeftColor={
        type === 'expense' ? colors.attention_light : colors.success_light
      }
    >
      <Text semibold color={colors.gray}>
        {item.expand?.category.name}
      </Text>
      <HStack justifyContent={'space-between'} alignItems={'flex-end'}>
        <Text
          semibold
          h3
          color={type === 'income' ? colors.success : colors.attention}
        >
          {Number(
            type === 'expense' ? item.expense : item.income,
          ).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'EUR',
          })}
        </Text>
        <Text regular h5 color={colors.gray}>
          {moment(item.lastCreated).format('MMM, YYYY')}
        </Text>
      </HStack>
    </Box>
  )
}
