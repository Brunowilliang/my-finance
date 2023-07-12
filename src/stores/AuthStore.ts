import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import api from '~/lib/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Collections } from '~/types/types'
import { IUserProps } from '~/types/interface'
import { openAuthSessionAsync, dismissAuthSession } from 'expo-web-browser'

interface AuthState {
  user: IUserProps | null
  isLoading: boolean
  setUser: (user: IUserProps | null) => void
  oauth2Auth: (provider: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      setUser: (user: IUserProps | null) => set({ user }),
      oauth2Auth: async (provider: string) => {
        try {
          set({ isLoading: true })
          const response = await api
            .collection(Collections.Users)
            .authWithOAuth2({
              provider,
              urlCallback: async (url) => {
                await openAuthSessionAsync(url)
                  .then((response) => {
                    console.log(response)
                  })
                  .catch((err) => {
                    console.log(err)
                  })
                  .finally(() => {
                    dismissAuthSession()
                    set({ isLoading: false })
                  })
              },
            })
          set({ user: response.record as any })
        } catch (err: any) {
          console.log(err.originalError)
          set({ user: null })
        } finally {
          set({ isLoading: false })
          dismissAuthSession()
        }
      },
      logout: async () => {
        api.authStore.clear()
        return Promise.resolve()
      },
    }),
    {
      name: '@MyFinance:auth',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ) as any,
)
