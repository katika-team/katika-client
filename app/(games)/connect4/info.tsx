import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';

export default function Connect4Info() {
  return (
    <ImageBackground
      source={require('@/assets/checkers/checkers.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      {/* Back button */}
      <View style={{ position: 'absolute', width: '100%', marginTop: 50, paddingHorizontal: 20, zIndex: 10 }}>
        <TouchableOpacity onPress={() => router.push('/connect4/home')}>
          <Image source={require('@/assets/checkers/back.png')} style={{ width: 48, height: 48, resizeMode: 'contain' }} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, marginTop: 100 }} contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={{ paddingHorizontal: 20 }}>
          
          {/* Title */}
          <View style={{
            backgroundColor: 'rgba(21, 101, 192, 0.9)',
            padding: 25,
            borderRadius: 15,
            alignItems: 'center',
            marginBottom: 20
          }}>
            <Text style={{
              color: 'white',
              fontSize: 28,
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              🔴🟡 How to Play Connect 4
            </Text>
          </View>

          {/* Game rules */}
          <View style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 25,
            borderRadius: 15,
            marginBottom: 20
          }}>
            <Text style={{
              color: '#FFD700',
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 15
            }}>
              🎯 Objective
            </Text>
            <Text style={{
              color: 'white',
              fontSize: 16,
              lineHeight: 24,
              marginBottom: 20
            }}>
              Be the first player to connect 4 of your pieces in a row - horizontally, vertically, or diagonally!
            </Text>

            <Text style={{
              color: '#FFD700',
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 15
            }}>
              🎮 How to Play
            </Text>
            <Text style={{
              color: 'white',
              fontSize: 16,
              lineHeight: 24,
              marginBottom: 10
            }}>
              • Tap on any column to drop your piece{'\n'}
              • Pieces fall to the lowest available spot{'\n'}
              • Take turns with your opponent{'\n'}
              • First to get 4 in a row wins!
            </Text>
          </View>

          {/* Betting info */}
          <View style={{
            backgroundColor: 'rgba(255, 107, 53, 0.9)',
            padding: 25,
            borderRadius: 15,
            marginBottom: 20
          }}>
            <Text style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 15
            }}>
              💰 Betting Rules
            </Text>
            <Text style={{
              color: 'white',
              fontSize: 16,
              lineHeight: 24
            }}>
              • Choose your stake before playing{'\n'}
              • Winner takes the pot{'\n'}
              • Draws return stakes to both players{'\n'}
              • Minimum bet: 500 XAF{'\n'}
              • Maximum bet: 5,000 XAF
            </Text>
          </View>

          {/* Tips */}
          <View style={{
            backgroundColor: 'rgba(76, 175, 80, 0.9)',
            padding: 25,
            borderRadius: 15,
            marginBottom: 20
          }}>
            <Text style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 15
            }}>
              💡 Pro Tips
            </Text>
            <Text style={{
              color: 'white',
              fontSize: 16,
              lineHeight: 24
            }}>
              • Control the center columns{'\n'}
              • Block your opponent's winning moves{'\n'}
              • Look for diagonal opportunities{'\n'}
              • Plan 2-3 moves ahead{'\n'}
              • Practice makes perfect!
            </Text>
          </View>

          {/* Action buttons */}
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <TouchableOpacity
              onPress={() => router.push('/connect4/bet')}
              style={{
                backgroundColor: '#FF6B35',
                paddingVertical: 18,
                paddingHorizontal: 40,
                borderRadius: 15,
                marginBottom: 15,
                width: '80%'
              }}
            >
              <Text style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                💰 Start Playing
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push('/connect4/main')}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                paddingVertical: 15,
                paddingHorizontal: 40,
                borderRadius: 15,
                width: '80%',
                borderWidth: 2,
                borderColor: 'rgba(255, 255, 255, 0.3)'
              }}
            >
              <Text style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                🎯 Practice First
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}