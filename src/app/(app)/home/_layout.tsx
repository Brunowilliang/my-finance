import { Tabs, useRouter } from 'expo-router'
import { BlurView } from 'expo-blur'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Pressable from '~/components/pressable'
import Text from '~/components/text'
import { colors } from '~/styles/theme'
import { ChartPieSlice, House, Plus } from 'phosphor-react-native'

export default function Layout() {
  const router = useRouter()
  const { bottom } = useSafeAreaInsets()
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ state, descriptors, navigation }) => {
        return (
          <>
            <BlurView
              intensity={15}
              style={{
                flexDirection: 'row',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'space-between',
                bottom: 0,
                paddingHorizontal: 40,
                backgroundColor: 'rgba(255,255,255,0.1)',
                width: '100%',
                height: bottom + 50,
                // paddingBottom: bottom,
              }}
            >
              {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const { tabBarLabel, tabBarIcon } = options as any

                const isFocused = state.index === index

                const onPress = () => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  })

                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name)
                  }
                }

                const onLongPress = () => {
                  navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                  })
                }

                return (
                  <Pressable
                    key={route.key}
                    onPress={onPress}
                    disabled={!tabBarLabel}
                    onLongPress={onLongPress}
                    flex={1}
                    flexDir={'row'}
                    alignItems="center"
                    justifyContent="center"
                    pb={4}
                  >
                    {tabBarIcon?.({
                      color: isFocused ? '#3981F6' : '#C2C2C2',
                      focused: isFocused,
                    })}
                    <Text ml={1} bold color={isFocused ? '#3981F6' : '#C2C2C2'}>
                      {isFocused && tabBarLabel}
                    </Text>
                  </Pressable>
                )
              })}
            </BlurView>
          </>
        )
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <House
              color={color}
              size={24}
              weight={focused ? 'fill' : 'regular'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="button"
        options={{
          tabBarIcon: () => (
            <Pressable
              onPress={() => router.push('(app)/transaction/create')}
              flexDir={'row'}
              h={'60px'}
              w={'60px'}
              borderRadius={'20px'}
              alignItems="center"
              justifyContent="center"
              bg={colors.primary}
              mb={bottom}
            >
              <Plus color={colors.white} size={24} weight={'bold'} />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({ color, focused }) => (
            <ChartPieSlice
              color={color}
              size={24}
              weight={focused ? 'fill' : 'regular'}
            />
          ),
        }}
      />
    </Tabs>
  )
}
