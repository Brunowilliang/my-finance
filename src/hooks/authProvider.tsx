import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat'
import * as Font from 'expo-font'
import { SplashScreen, useRouter } from 'expo-router'
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import api from '~/lib/api'

export const AuthContext = createContext({} as any)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [appIsReady, setAppIsReady] = useState(false)
  const router = useRouter()
  const isValid = api.authStore.isValid

  async function loadData() {
    await Font.loadAsync({
      Montserrat_400Regular,
      Montserrat_500Medium,
      Montserrat_600SemiBold,
      Montserrat_700Bold,
    })
    setAppIsReady(true)
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (appIsReady) {
      if (isValid) {
        router.replace('(app)/home')
      } else {
        router.replace('(auth)')
      }
    }
  }, [appIsReady, router, isValid])

  const value = {} as any

  return (
    <AuthContext.Provider value={value}>
      {appIsReady ? children : <SplashScreen />}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
