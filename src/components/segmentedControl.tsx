import { Box, IBoxProps, Pressable } from 'native-base'
import React, { useEffect } from 'react'
import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { colors } from '~/styles/theme'
import Text from './text'

interface SegmentedControlProps {
  segments: Array<{
    label: string
    value: string | number
    icon?: React.ReactNode
    badge?: number
    visible: boolean
  }>
  currentIndex: number
  onChange: (index: number, segment: string) => void
  fontSize?: number
  badgeValues?: Array<number | null>
  isRTL?: boolean
  containerMargin?: number
  activeTextStyle?: TextStyle
  inactiveTextStyle?: TextStyle
  segmentedControlWrapper?: ViewStyle
  pressableWrapper?: IBoxProps
  tileStyle?: ViewStyle
  activeBadgeStyle?: ViewStyle
  inactiveBadgeStyle?: ViewStyle
  badgeTextStyle?: TextStyle
}

const DEFAULT_SPRING_CONFIG = {
  stiffness: 150,
  damping: 20,
  mass: 1,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  segments,
  currentIndex,
  fontSize,
  onChange,
  isRTL = false,
  containerMargin = 0,
  segmentedControlWrapper,
  tileStyle,
}: SegmentedControlProps) => {
  const width = widthPercentageToDP('100%') - containerMargin * 2
  const translateValue =
    width / segments.filter((segment) => segment.visible).length
  const tabTranslateValue = useSharedValue(0)

  useEffect(() => {
    const transitionMultiplier = isRTL ? -1 : 1
    tabTranslateValue.value = withSpring(
      currentIndex * (translateValue * transitionMultiplier),
      DEFAULT_SPRING_CONFIG,
    )
  }, [currentIndex])

  const tabTranslateAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabTranslateValue.value }],
    }
  })

  return (
    <Animated.View
      style={[styles.defaultSegmentedControlWrapper, segmentedControlWrapper]}
    >
      <Animated.View
        style={[
          styles.movingSegmentStyle,
          tileStyle,
          StyleSheet.absoluteFill,
          {
            width: width / segments.filter((segment) => segment.visible).length,
          },
          tabTranslateAnimatedStyles,
        ]}
      />
      {segments
        .filter((segment) => segment.visible)
        .map((segment, index) => {
          return (
            <Pressable
              onPress={() => {
                onChange(index, segment.value)
              }}
              key={index}
              py={2}
              flex={1}
            >
              <Box flexDir="row" alignItems="center" justifyContent="center">
                <Text
                  fontSize={fontSize}
                  bold={currentIndex === index}
                  medium={currentIndex !== index}
                  color={currentIndex === index ? colors.primary : colors.gray}
                >
                  {segment.label}
                </Text>
                {segment.icon && (
                  <Box ml={1} alignItems="center">
                    {segment.icon}
                  </Box>
                )}
              </Box>
            </Pressable>
          )
        })}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  defaultSegmentedControlWrapper: {
    position: 'relative',
    display: 'flex',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  movingSegmentStyle: {
    top: 0,
    margin: 5,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
})

export default SegmentedControl
