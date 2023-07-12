import React, {
  useMemo,
  forwardRef,
  useImperativeHandle,
  useRef,
  ReactNode,
} from 'react'
import { StyleSheet } from 'react-native'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '~/styles/theme'
import Text from './text'
import { Box, HStack } from 'native-base'

interface CustomBackdropProps {
  animatedIndex: Animated.SharedValue<number>
}

const CustomBackdrop: React.FC<CustomBackdropProps> = ({ animatedIndex }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [-1, 0, 1],
      [0, 0.5, 0.8],
      Animated.Extrapolate.CLAMP,
    )

    return {
      opacity,
    }
  })

  return <Animated.View style={[styles.backdrop, animatedStyle]} />
}

export interface IModalBottomSheet {
  open: () => void
  close: () => void
}

interface ModalTesteProps {
  children?: ReactNode
  title?: string
  leftComponent?: ReactNode
  rightComponent?: ReactNode
}

const ModalBottomSheet = forwardRef<IModalBottomSheet, ModalTesteProps>(
  (props, ref) => {
    const { top, bottom } = useSafeAreaInsets()
    const bottomSheetModalRef = useRef<BottomSheetModal | null>(null)

    // expose methods to parent components
    useImperativeHandle(ref, () => ({
      open: () => {
        bottomSheetModalRef.current?.present()
      },
      close: () => {
        bottomSheetModalRef.current?.dismiss()
      },
    }))

    // variables
    const snapPoints = useMemo(() => ['70%', '100%'], [])

    // renders
    return (
      <BottomSheetModal
        topInset={top + 10}
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={CustomBackdrop}
        handleIndicatorStyle={{
          backgroundColor: colors.grayLight,
          width: 40,
        }}
        backgroundStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: colors.background,
        }}
      >
        <BottomSheetScrollView
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: bottom + 40,
          }}
        >
          <HStack
            display={props.title ? 'flex' : 'none'}
            justifyContent={'space-between'}
            alignItems={'center'}
            bg={colors.background}
            py={3}
            px={5}
            // borderBottomWidth={1}
            // borderBottomColor={colors.grayLightOpacity}
          >
            <Box w={'20%'} alignItems={'flex-start'}>
              {props.leftComponent}
            </Box>
            <Text textAlign={'center'} h3 semibold>
              {props.title}
            </Text>
            <Box w={'20%'} alignItems={'flex-end'}>
              {props.rightComponent}
            </Box>
          </HStack>
          {props.children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
})

export default ModalBottomSheet
