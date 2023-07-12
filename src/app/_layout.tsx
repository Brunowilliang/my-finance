import { Slot } from 'expo-router'
import { NativeBaseProvider, StatusBar } from 'native-base'
import { Text } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import { AuthProvider } from '~/hooks/authProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HoldMenuProvider } from 'react-native-hold-menu'
import { NativeBaseConfig, NativeBaseTheme } from '~/styles/nativeBaseTheme'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import 'react-native-url-polyfill/auto'

export default function Layout() {
  // @ts-ignore
  if (Text.defaultProps == null) {
    // @ts-ignore
    Text.defaultProps = {}
    // @ts-ignore
    Text.defaultProps.allowFontScaling = false
  }

  const queryClient = new QueryClient()
  const { top, bottom, left, right } = useSafeAreaInsets()

  return (
    <>
      <NativeBaseProvider config={NativeBaseConfig} theme={NativeBaseTheme}>
        <HoldMenuProvider
          safeAreaInsets={{
            top,
            bottom,
            left,
            right,
          }}
        >
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <BottomSheetModalProvider>
                <FlashMessage position="top" />
                <StatusBar barStyle="default" translucent animated />
                <Slot />
              </BottomSheetModalProvider>
            </AuthProvider>
          </QueryClientProvider>
        </HoldMenuProvider>
      </NativeBaseProvider>
    </>
  )
}
