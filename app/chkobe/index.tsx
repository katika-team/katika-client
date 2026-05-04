import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import SearchModal from '../component/Searchmodal';

export default function ChkobeIndex() {
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <ImageBackground
      source={require('@/assets/checkers/checkers.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
        <View style={{
          backgroundColor: 'rgba(46, 125, 50, 0.9)',
          padding: 40,
          borderRadius: 20,
          alignItems: 'center',
          width: '90%'
        }}>
          <Text style={{
            color: 'white',
            fontSize: 32,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center'
          }}>
            🃏 Chkobe
          </Text>
          
          <Text style={{
            color: '#ccc',
            fontSize: 16,
            marginBottom: 30,
            textAlign: 'center',
            lineHeight: 24
          }}>
            The classic card game!{'\n'}
            Get rid of all your cards to win.
          </Text>
          
          <TouchableOpacity
            onPress={() => setSearchVisible(true)}
            style={{
              backgroundColor: '#8E24AA',
              paddingHorizontal: 40,
              paddingVertical: 15,
              borderRadius: 25,
              marginBottom: 15,
              width: '100%',
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            }}
          >
            <Text style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              🎮 Play vs Bot
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => router.push('/control')}
            style={{
              backgroundColor: 'rgba(100, 100, 100, 0.6)',
              paddingHorizontal: 40,
              paddingVertical: 12,
              borderRadius: 25,
              width: '100%'
            }}
          >
            <Text style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              ← Back to Games
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <SearchModal
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
        nextRoute="/chkobe/main"
        mode="session"
      />
    </ImageBackground>
  );
}