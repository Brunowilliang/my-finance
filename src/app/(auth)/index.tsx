import { VStack } from 'native-base'
import React from 'react'
import { useAuthStore } from '~/stores/AuthStore'
import { colors } from '~/styles/theme'
import Pressable from '~/components/pressable'
import Text from '~/components/text'
import { useRouter } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import Loading from '~/components/loading'
import { ImageBackground } from 'react-native'

export default function Page() {
  const { oauth2Auth, isLoading } = useAuthStore()
  const router = useRouter()

  const loginGithub = async () => {
    try {
      await oauth2Auth('github')
      router.replace('(app)/home')
    } catch (err) {
      console.log(err)
    }
  }

  const loginGoogle = async () => {
    try {
      await oauth2Auth('google')
      router.replace('(app)/home')
    } catch (err) {
      console.log(err)
    }
  }

  const loginApple = async () => {
    try {
      await oauth2Auth('apple')
      router.replace('(app)/home')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Loading loading={isLoading} />
      {/* @ts-ignore */}
      <ImageBackground
        resizeMode="cover"
        defaultSource={require('~/assets/background.png')}
        fadeDuration={10}
        style={{ flex: 1, justifyContent: 'center' }}
      >
        <VStack alignItems={'center'} space={3} mb={'12'}>
          <Text
            h1
            bold
            color={colors.background}
            lineHeight={30}
            textAlign={'center'}
          >
            {`In control of your money,\nat the pace of your life`}
          </Text>
          <Text
            medium
            h3
            color={colors.background}
            lineHeight={20}
            w={'270px'}
            textAlign={'center'}
          >
            {`Manage your income and expenses in real-time with the pulse of your finances in the palm of your hand`}
          </Text>
        </VStack>
        <VStack px={4} space={2}>
          <Pressable
            flexDir={'row'}
            onPress={loginGithub}
            bg={colors.background}
            h={'56px'}
            w={'full'}
            textAlign={'center'}
          >
            <AntDesign name="github" size={23} color={colors.primary} />
            <Text ml={2} h4 semibold color={colors.primary}>
              Sign up GitHub
            </Text>
          </Pressable>
          <Pressable
            flexDir={'row'}
            onPress={loginGoogle}
            bg={colors.background}
            h={'56px'}
            w={'full'}
          >
            <AntDesign name="google" size={23} color={colors.primary} />
            <Text ml={2} h4 semibold color={colors.primary}>
              Sign up Google
            </Text>
          </Pressable>
          <Pressable
            flexDir={'row'}
            onPress={loginApple}
            bg={colors.background}
            h={'56px'}
            w={'full'}
          >
            <AntDesign name="apple1" size={23} color={colors.primary} />
            <Text ml={2} h4 semibold color={colors.primary}>
              Sign up Apple
            </Text>
          </Pressable>
        </VStack>
      </ImageBackground>
    </>
  )
}
