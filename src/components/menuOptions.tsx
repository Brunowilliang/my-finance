import React, { ReactNode } from 'react'
import { Box, Divider, Menu } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { colors } from '~/styles/theme'
import Text from './text'

type Props = {
  iconName?: string
  iconColor?: string
  iconSize?: number
  Icon?: React.ReactNode
  items?: Array<{
    name?: string
    onPress?: () => void
    icon?: ReactNode | any
    active?: boolean
    colorActive?: string
  }>
}

const MenuOptions = ({ Icon, items }: Props) => {
  return (
    <Menu
      p={0}
      overflow="hidden"
      rounded="8px"
      bg={colors.white}
      placement={'bottom right'}
      _backdrop={{ backgroundColor: colors.blackOpacity, opacity: 0.6 }}
      trigger={(triggerProps) => {
        return <TouchableOpacity {...triggerProps}>{Icon}</TouchableOpacity>
      }}
    >
      {items?.map(({ name, onPress, active, colorActive, icon }, index) => {
        return (
          <Box key={index}>
            <Menu.Item
              flex={1}
              onPress={onPress}
              pl={3}
              pr={5}
              py={4}
              _pressed={{ bgColor: colors.grayLightOpacity }}
            >
              {icon}
              <Text
                ml={-1}
                h4
                semibold
                color={active ? colorActive : colors.gray}
              >
                {name}
              </Text>
            </Menu.Item>
            {index < items.length - 1 && (
              <Divider bg={colors.grayLightOpacity} />
            )}
          </Box>
        )
      })}
    </Menu>
  )
}

export default MenuOptions
