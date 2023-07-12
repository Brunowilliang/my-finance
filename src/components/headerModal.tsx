import { useRouter } from 'expo-router'
import { Box, HStack, IBoxProps } from 'native-base'
import { CaretDown } from 'phosphor-react-native'
import React from 'react'
import { colors } from '~/styles/theme'
import Pressable from './pressable'
import Text from './text'

interface Props extends IBoxProps {
  title: string
  onPress?: () => void
  back?: boolean
  rightComponent?: React.ReactNode
}

const HeaderModal = (p: Props) => {
  const router = useRouter()

  return (
    <Box
      pt={3}
      pb={6}
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
      {...p}
    >
      <Box w="60px">
        {p.back && (
          <Pressable alignItems="flex-start" onPress={() => router.back()}>
            <CaretDown size={25} weight="bold" color={colors.gray} />
          </Pressable>
        )}
      </Box>
      <Text h3 semibold color={colors.gray}>
        {p.title}
      </Text>
      <HStack w="60px" space={2} alignItems="center" justifyContent="flex-end">
        {p.rightComponent}
      </HStack>
    </Box>
  )
}

export default HeaderModal
