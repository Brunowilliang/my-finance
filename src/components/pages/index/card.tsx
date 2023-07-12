import moment from 'moment'
import { HStack, IPressableProps } from 'native-base'
import React from 'react'
import Text from '~/components/text'
import { colors } from '~/styles/theme'
import { ITransactionsProps } from '~/types/interface'
import Pressable from '~/components/pressable'

interface ICardProps extends IPressableProps {
  item: ITransactionsProps
}

export default function CardTransactions({ item, ...props }: ICardProps) {
  return (
    <Pressable
      {...props}
      alignItems="flex-start"
      p={3}
      bg={colors.background}
      rounded="lg"
    >
      <Text semibold color={colors.gray}>
        {item.name}
      </Text>
      <Text
        semibold
        h3
        color={item.type === 'income' ? colors.success : colors.attention}
      >
        {Number(item.price).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'EUR',
        })}
      </Text>
      <HStack width="100%" justifyContent="space-between">
        <Text regular h5 color={colors.gray}>
          {item.expand?.category.name}
        </Text>
        <Text regular h5 color={colors.gray}>
          {moment(item.date).format('D MMM, YYYY')}
        </Text>
      </HStack>
    </Pressable>
  )
}
