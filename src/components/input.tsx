import React from 'react'
import { Input as InputText, IInputProps } from 'native-base'
import { colors, fonts } from '~/styles/theme'
import { Controller } from 'react-hook-form'
import Text from './text'

interface Props extends IInputProps {
  control: any
  name: string
  error?: string
}

export default function Input({ control, name, error, ...props }: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <InputText
            flex={1}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            fontFamily={fonts.medium}
            fontSize={16}
            allowFontScaling={false}
            borderRadius={14}
            bg={colors.white}
            borderColor={error ? colors.attention : colors.transparent}
            color={error ? colors.attention : colors.grayDark}
            px={5}
            _focus={{
              borderColor: error ? colors.attention : colors.grayLight,
              borderWidth: 1,
              bg: colors.white,
              color: error ? colors.attention : colors.grayDark,
              placeholderTextColor: error ? colors.attention : colors.grayDark,
            }}
            {...props}
          />
          {error && (
            <Text mt={0.5} ml={2} h5 color={colors.attention}>
              {error}
            </Text>
          )}
        </>
      )}
    />
  )
}
