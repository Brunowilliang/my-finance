import React, { useMemo, ReactNode } from 'react'
import BottomSheetComponent, {
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import { SharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '~/styles/theme'

interface BottomSheetProps {
  children?: ReactNode
  index?: number
  animatedIndex?: SharedValue<number>
  snapPoints: Array<string | number> | SharedValue<Array<string | number>>
}

export default function BottomSheet({
  children,
  index,
  animatedIndex,
  snapPoints,
}: BottomSheetProps) {
  const { top, bottom } = useSafeAreaInsets()
  // variables
  const snapPointsExample = useMemo(() => ['70%', '100%'], [])

  // renders
  return (
    <BottomSheetComponent
      snapPoints={snapPoints || snapPointsExample}
      animatedIndex={animatedIndex}
      topInset={top + 10}
      index={index || 0}
      handleIndicatorStyle={{
        backgroundColor: colors.grayLight,
        width: 40,
      }}
      backgroundStyle={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: colors.white,
      }}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: bottom + 40,
        }}
      >
        {children}
      </BottomSheetScrollView>
    </BottomSheetComponent>
  )
}
