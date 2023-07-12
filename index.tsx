import 'react-native-gesture-handler'
import { registerRootComponent } from 'expo'
import { ExpoRoot } from 'expo-router'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop.'])

export function App() {
  // @ts-ignore
  const ctx = require.context('./src/app')
  return <ExpoRoot context={ctx} />
}

registerRootComponent(App)
