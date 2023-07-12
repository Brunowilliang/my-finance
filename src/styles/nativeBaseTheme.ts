import { LinearGradient } from 'expo-linear-gradient'
import { extendTheme } from 'native-base'
import { colors, fonts } from './theme'

export const NativeBaseConfig = {
  dependencies: {
    'linear-gradient': LinearGradient,
  },
}

export const NativeBaseTheme = extendTheme({
  colors,
  fonts,
})

type CustomThemeType = typeof NativeBaseTheme

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {} // eslint-disable-line
}
