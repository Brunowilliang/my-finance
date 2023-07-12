import React from 'react'
import { Box, Center, Spinner } from 'native-base'
import { colors } from '~/styles/theme'

type Props = {
  loading: boolean
}

const Loading = ({ loading }: Props) =>
  loading ? (
    <>
      <Box
        bg={colors.blackOpacity}
        zIndex={20}
        position="absolute"
        opacity={0.7}
        w="full"
        h="full"
      />
      <Center zIndex={30} position="absolute" w="full" h="full">
        <Spinner size="lg" color={colors.white} />
      </Center>
    </>
  ) : null

export default Loading
