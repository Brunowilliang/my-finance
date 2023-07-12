import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function Layout() {
  return (
    <>
      <StatusBar style="dark" translucent />
      <Stack
        screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
      />
    </>
  )
}
