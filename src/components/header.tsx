import React from 'react'
import { Box, IBoxProps } from 'native-base'
import { CaretLeft } from 'phosphor-react-native'
import Text from '~/components/text'
import { colors } from '~/styles/theme'
import Pressable from './pressable'
import { useRouter } from 'expo-router'
import { useAuthStore } from '~/stores/AuthStore'

interface Props extends IBoxProps {
  back?: boolean
  onBack?: () => void
  title?: string
  subtitle?: string
  rightComponent?: React.ReactNode
  leftComponent?: React.ReactNode
  color?: string
}

const Header = ({
  back,
  title,
  subtitle,
  rightComponent,
  leftComponent,
  color,
  ...rest
}: Props) => {
  const router = useRouter()
  const { user } = useAuthStore()

  const finalTitle = title || 'Welcome'
  const finalSubtitle = subtitle || user?.name || user?.username

  return (
    <Box
      bg={colors.background}
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      p={5}
      {...rest}
    >
      {back && (
        <Pressable onPress={router.back} mr={3}>
          <CaretLeft size={26} weight="bold" color={color || colors.white} />
        </Pressable>
      )}

      {leftComponent && <Box>{leftComponent}</Box>}

      <Box flex={1}>
        {finalTitle && (
          <Text h2 medium color={color || colors.gray}>
            {finalTitle}
          </Text>
        )}
        {finalSubtitle && (
          <Text h2 bold mt={-1} color={color || colors.gray}>
            {finalSubtitle}
          </Text>
        )}
      </Box>

      {rightComponent && <Box>{rightComponent}</Box>}
    </Box>
  )
}

export default Header
