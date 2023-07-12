import React from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { colors } from '~/styles/theme'
import { HStack } from 'native-base'
import { Check, TrashSimple } from 'phosphor-react-native'
import Pressable from '~/components/pressable'
import Text from '~/components/text'

interface ICardProps {
  name: string
  onPress?: () => void
  onRemove?: () => void
  selected?: boolean
}

export default function CardCategory(props: ICardProps) {
  const rightContent = () => {
    return (
      <HStack space={2} mr={4}>
        <Pressable onPress={props.onRemove}>
          <TrashSimple size={25} color={colors.attention} />
        </Pressable>
      </HStack>
    )
  }

  return (
    <Swipeable renderRightActions={rightContent}>
      <Pressable
        onPress={props.onPress}
        h={'56px'}
        bg={colors.white}
        borderRadius={14}
        px={4}
        mx={4}
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
      >
        {props.selected && (
          <Check size={20} weight="bold" color={colors.primary} />
        )}
        <Text
          flex={1}
          ml={props.selected ? 2 : 0}
          semibold={props.selected}
          numberOfLines={1}
          color={props.selected ? colors.primary : colors.gray}
        >
          {props.name}
        </Text>
      </Pressable>
    </Swipeable>
  )
}
