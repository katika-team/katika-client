import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

export default function Control() {
  return (
    <ImageBackground
      source={require('@/assets/ttt/bg.png')}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      resizeMode="cover"
    >
      <View style={{
        backgroundColor: 'rgba(27, 32, 47, 0.36)',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        width: '80%'
      }}>
        <Text style={{
          color: 'white',
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 30,
          textAlign: 'center'
        }}>
          Choose Your Game
        </Text>
        
        <TouchableOpacity
          onPress={() => router.push('/checkers/home')}
          style={{
            backgroundColor: '#FF4444',
            paddingHorizontal: 40,
            paddingVertical: 15,
            borderRadius: 10,
            marginBottom: 15,
            width: '100%'
          }}
        >
          <Text style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            🔴 Checkers
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => router.push('/TTT/loading')}
          style={{
            backgroundColor: '#4CAF50',
            paddingHorizontal: 40,
            paddingVertical: 15,
            borderRadius: 10,
            marginBottom: 15,
            width: '100%'
          }}
        >
          <Text style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            ⭕ Tic Tac Toe
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => router.push('/connect4/home')}
          style={{
            backgroundColor: '#1565C0',
            paddingHorizontal: 40,
            paddingVertical: 15,
            borderRadius: 10,
            marginBottom: 15,
            width: '100%'
          }}
        >
          <Text style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            🔴🟡 Connect 4
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => router.push('/chkobe')}
          style={{
            backgroundColor: '#8E24AA',
            paddingHorizontal: 40,
            paddingVertical: 15,
            borderRadius: 10,
            width: '100%'
          }}
        >
          <Text style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            🃏 Chkobe
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}