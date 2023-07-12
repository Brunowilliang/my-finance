import React from 'react'
import { ITextProps, Text as NativeBaseText } from 'native-base'
import { colors, fonts } from '~/styles/theme'

interface TextProps extends ITextProps {
  children?: React.ReactNode | string
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  h5?: boolean
  h6?: boolean
  color?: string
  regular?: boolean
  medium?: boolean
  semibold?: boolean
  bold?: boolean
}

const fontSizes = {
  h1: 24,
  h2: 20,
  h3: 18,
  h4: 16,
  h5: 14,
  h6: 12,
  default: 16,
}

const fontStyles = {
  bold: fonts.bold,
  semibold: fonts.semibold,
  medium: fonts.medium,
  regular: fonts.regular,
  default: fonts.medium,
}

const DEFAULT_COLOR = colors.gray

const Text = ({ color, ...props }: TextProps) => {
  const fontSize =
    // @ts-ignore
    fontSizes[Object.keys(props).find((key) => key.startsWith('h'))] ||
    fontSizes.default

  const fontFamily =
    // @ts-ignore
    Object.entries(fontStyles).find(([style, _]) => props[style])?.[1] ||
    fontStyles.default

  return (
    <NativeBaseText
      {...props}
      allowFontScaling={false}
      color={color ?? DEFAULT_COLOR}
      fontSize={fontSize}
      fontFamily={fontFamily}
    >
      {props.children}
    </NativeBaseText>
  )
}

export default Text
