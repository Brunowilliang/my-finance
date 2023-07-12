import React from 'react'
import { Pressable as Press, IPressableProps } from 'native-base'

const Pressable = ({ children, ...rest }: IPressableProps) => {
  return (
    <Press
      _pressed={{ opacity: 0.4 }}
      w="auto"
      h="auto"
      alignItems="center"
      rounded={8}
      justifyContent="center"
      {...rest}
    >
      {children}
    </Press>
  )
}

export default Pressable
