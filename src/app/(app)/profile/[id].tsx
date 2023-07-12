import { yupResolver } from '@hookform/resolvers/yup'
import { Box, ScrollView, VStack } from 'native-base'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import HeaderModal from '~/components/headerModal'
import Input from '~/components/input'
import Pressable from '~/components/pressable'
import Text from '~/components/text'
import api from '~/lib/api'
import { userSchema } from '~/schemas/user'
import { useAuthStore } from '~/stores/AuthStore'
import { colors } from '~/styles/theme'
import { Collections } from '~/types/types'
import Toast from '~/components/toast'

const Profile = () => {
  const { user, setUser } = useAuthStore()

  const {
    control,
    handleSubmit,
    getValues,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  })

  useEffect(() => {
    user && reset(user as any)
  }, [user])

  const onSubmit = async () => {
    try {
      const response = await api
        .collection(Collections.Users)
        .update(user!.id, { ...getValues() })
      Toast({
        message: 'success',
        type: 'success',
        description: 'User updated successfully',
      })
      setUser(response as any)
    } catch (error: any) {
      if (error.data.data && error.data.data.username) {
        setError('username', {
          type: 'manual',
          message: 'username already exists',
        })
      } else {
        console.log('Erro completo:', error)
      }
    }
  }

  return (
    <Box safeArea px={4} flex={1} bg={colors.background}>
      <HeaderModal back title="Profile" />
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <VStack flex={1} space={4} mb={4}>
          <Input
            h={'56px'}
            control={control}
            name="username"
            placeholder="Username"
            error={errors.username?.message}
          />
          <Input
            h={'56px'}
            control={control}
            name="name"
            placeholder="Name"
            error={errors.name?.message}
          />
        </VStack>
      </ScrollView>
      <Pressable
        onPress={handleSubmit(onSubmit)}
        h={'56px'}
        bg={colors.primary}
        borderRadius={14}
      >
        <Text semibold color={colors.white}>
          Update Profile
        </Text>
      </Pressable>
    </Box>
  )
}

export default Profile
