import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name="animate" />
        <Stack.Screen name="policies" />
        <Stack.Screen name="setting" />
        <Stack.Screen name="info" />
        <Stack.Screen name="home" />
        <Stack.Screen name="bet" />
        <Stack.Screen name="main" />
        <Stack.Screen name='index' />
    </Stack>
  )
}

export default _layout