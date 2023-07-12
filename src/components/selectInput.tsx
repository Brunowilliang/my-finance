import React from 'react'
import Text from './text'
import Pressable from './pressable'
import { colors } from '~/styles/theme'
import { CaretDown } from 'phosphor-react-native'
import { IPressableProps } from 'native-base'

interface IProps extends IPressableProps {
  placeholder?: string
  value?: string
}

export default function ScrollableModal(p: IProps) {
  return (
    <Pressable
      {...p}
      borderRadius={14}
      px={5}
      flexDir={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      h={'56px'}
      bg={colors.white}
    >
      <Text color={colors.grayDark}>{p.value || p.placeholder}</Text>
      <CaretDown size={22} weight="bold" color={colors.grayDark} />
    </Pressable>
  )
}
