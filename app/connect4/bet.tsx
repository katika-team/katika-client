import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { router } from 'expo-router';
import SearchModal from '../component/Searchmodal';

export default function Connect4Bet() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [selectedBet, setSelectedBet] = useState<string>('1000 XAF');

  const bets = ["500 XAF", "1000 XAF", "2000 XAF", "3000 XAF", "5000 XAF"];

  return (
    <ImageBackground
      source={require('@/assets/checkers/checkers.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      {/* Back button */}
      <View style={{ position: 'absolute', width: '100%', marginTop: 50, paddingHorizontal: 20, zIndex: 10 }}>
        <TouchableOpacity onPress={() => router.push('/connect4')}>
          <Image source={require('@/assets/checkers/back.png')} style={{ width: 48, height: 48, resizeMode: 'contain' }} />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View style={{
        position: 'absolute',
        width: '100%',
        marginTop: 120,
        paddingHorizontal: 20,
        alignItems: 'center'
      }}>
        <View style={{
          backgroundColor: 'rgba(21, 101, 192, 0.9)',
          paddingVertical: 20,
          paddingHorizontal: 30,
          borderRadius: 15,
          width: '100%',
          alignItems: 'center'
        }}>
          <Text style={{
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            🔴🟡 Connect 4 Betting
          </Text>
          <Text style={{
            color: 'white',
            fontSize: 16,
            opacity: 0.9,
            textAlign: 'center',
            marginTop: 5
          }}>
            Select your stake amount
          </Text>
        </View>
      </View>

      {/* Bet buttons */}
      <View style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        transform: [{ translateY: -120 }],
        alignItems: 'center',
        paddingHorizontal: 20
      }}>
        {bets.map((amount, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedBet(amount)}
            style={{
              width: '100%',
              backgroundColor: selectedBet === amount ? '#1565C0' : 'rgba(21, 101, 192, 0.7)',
              paddingVertical: 18,
              borderRadius: 12,
              marginVertical: 8,
              borderWidth: selectedBet === amount ? 3 : 1,
              borderColor: selectedBet === amount ? '#0D47A1' : '#1565C0'
            }}
          >
            <Text style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              {amount}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Play button */}
        <TouchableOpacity
          onPress={() => setSearchVisible(true)}
          style={{
            width: '80%',
            backgroundColor: '#FF6B35',
            paddingVertical: 20,
            borderRadius: 15,
            marginTop: 20,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          }}
        >
          <Text style={{
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            PLAY NOW
          </Text>
        </TouchableOpacity>

        <Text style={{
          color: 'white',
          fontSize: 14,
          fontWeight: '400',
          textAlign: 'center',
          paddingVertical: 16,
          opacity: 0.8
        }}>
          By playing, you agree to our terms and policies
        </Text>
      </View>

      <SearchModal
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
        nextRoute="/connect4/main"
        mode="session"
        betAmount={selectedBet}
      />
    </ImageBackground>
  );
}