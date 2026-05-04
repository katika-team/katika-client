import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { router } from 'expo-router';

export default function Connect4Home() {
  return (
    <ImageBackground
      source={require('@/assets/checkers/checkers.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      {/* Back button */}
      <View style={{ position: 'absolute', width: '100%', marginTop: 50, paddingHorizontal: 20, zIndex: 10 }}>
        <TouchableOpacity onPress={() => router.push('/control')}>
          <Image source={require('@/assets/checkers/back.png')} style={{ width: 48, height: 48, resizeMode: 'contain' }} />
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 }}>
        
        {/* Game logo/title */}
        <View style={{
          backgroundColor: 'rgba(21, 101, 192, 0.95)',
          padding: 40,
          borderRadius: 25,
          alignItems: 'center',
          marginBottom: 40,
          width: '100%',
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        }}>
          <Text style={{
            fontSize: 48,
            marginBottom: 15
          }}>
            🔴🟡
          </Text>
          <Text style={{
            color: 'white',
            fontSize: 32,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 10
          }}>
            Connect 4
          </Text>
          <Text style={{
            color: 'white',
            fontSize: 16,
            textAlign: 'center',
            opacity: 0.9,
            lineHeight: 22
          }}>
            Drop your pieces and get 4 in a row!{'\n'}
            Connect horizontally, vertically, or diagonally.
          </Text>
        </View>

        {/* Action buttons */}
        <View style={{ width: '100%', alignItems: 'center' }}>
          
          {/* Play for money */}
          <TouchableOpacity
            onPress={() => router.push('/connect4/bet')}
            style={{
              backgroundColor: '#FF6B35',
              paddingVertical: 18,
              paddingHorizontal: 40,
              borderRadius: 15,
              marginBottom: 15,
              width: '90%',
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            }}
          >
            <Text style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              💰 Play for Money
            </Text>
          </TouchableOpacity>

          {/* Practice mode */}
          <TouchableOpacity
            onPress={() => router.push('/connect4/main')}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              paddingVertical: 15,
              paddingHorizontal: 40,
              borderRadius: 15,
              marginBottom: 15,
              width: '90%',
              borderWidth: 2,
              borderColor: 'rgba(255, 255, 255, 0.3)'
            }}
          >
            <Text style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              🎯 Practice Mode
            </Text>
          </TouchableOpacity>

          {/* How to play */}
          <TouchableOpacity
            onPress={() => router.push('/connect4/info')}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              paddingVertical: 12,
              paddingHorizontal: 40,
              borderRadius: 15,
              width: '90%'
            }}
          >
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
              textAlign: 'center'
            }}>
              ❓ How to Play
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats section */}
        <View style={{
          position: 'absolute',
          bottom: 50,
          left: 30,
          right: 30,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: 20,
          borderRadius: 15,
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: '#FFD700', fontSize: 20, fontWeight: 'bold' }}>12</Text>
            <Text style={{ color: 'white', fontSize: 12 }}>Wins</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: '#FF6B35', fontSize: 20, fontWeight: 'bold' }}>3</Text>
            <Text style={{ color: 'white', fontSize: 12 }}>Losses</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: '#4CAF50', fontSize: 20, fontWeight: 'bold' }}>2,500</Text>
            <Text style={{ color: 'white', fontSize: 12 }}>XAF Won</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}