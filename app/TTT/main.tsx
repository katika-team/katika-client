import React from "react";
import { Modal, View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { router } from "expo-router";
import SessionProvider from "../components/SessionProvider";
import TictactoeBoard from "../component/TictactoeBoard";
import { useTictactoeGame } from "../hooks/useTictactoeGame";

function TictactoeGame() {
  const {
    board,
    isMyTurn,
    mySymbol,
    handleCellPress,
    gameOver,
    gameResult,
    myPlayerId,
  } = useTictactoeGame();

  // Custom Tictactoe Game Over Modal
  const TictactoeGameOverModal = () => {
    if (!gameResult) return null;
    
    const isWinner = gameResult.winner === myPlayerId;
    const isDraw = !gameResult.winner;

    return (
      <Modal visible={gameOver} transparent animationType="fade">
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.9)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: '#1a1a1a',
            borderRadius: 20,
            padding: 30,
            alignItems: 'center',
            width: '80%',
            borderWidth: 3,
            borderColor: isWinner ? '#4CAF50' : isDraw ? '#FFC107' : '#F44336'
          }}>
            
            <Text style={{
              color: 'white',
              fontSize: 48,
              marginBottom: 20
            }}>
              {isWinner ? '🎯' : isDraw ? '🤝' : '❌'}
            </Text>
            
            <Text style={{
              color: 'white',
              fontSize: 28,
              fontWeight: 'bold',
              marginBottom: 10
            }}>
              {isWinner ? 'You Won!' : isDraw ? 'Draw!' : 'You Lost'}
            </Text>
            
            <Text style={{
              color: '#ccc',
              fontSize: 16,
              marginBottom: 30,
              textAlign: 'center'
            }}>
              {gameResult.reason}
            </Text>
            
            <View style={{
              flexDirection: 'row',
              gap: 15
            }}>
              <TouchableOpacity
                onPress={() => router.push('/TTT')}
                style={{
                  backgroundColor: '#4CAF50',
                  paddingHorizontal: 25,
                  paddingVertical: 15,
                  borderRadius: 10
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                  Play Again
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => router.push('/')}
                style={{
                  backgroundColor: 'rgba(100, 100, 100, 0.8)',
                  paddingHorizontal: 25,
                  paddingVertical: 15,
                  borderRadius: 10
                }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                  Home
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ImageBackground
      source={require('@/assets/ttt/bg.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
        <View style={{
          backgroundColor: 'rgba(0,0,0,0.7)',
          borderRadius: 20,
          padding: 20,
          alignItems: 'center',
          marginBottom: 20
        }}>
          <Text style={{
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 10
          }}>
            {isMyTurn ? 'Your Turn' : 'Opponent\'s Turn'}
          </Text>
          <Text style={{
            color: 'white',
            fontSize: 18,
            opacity: 0.8
          }}>
            You are: {mySymbol}
          </Text>
        </View>
        
        <TictactoeBoard
          board={board}
          onCellPress={handleCellPress}
          isMyTurn={isMyTurn}
          mySymbol={mySymbol}
          gameOver={gameOver}
        />
      </View>
      <TictactoeGameOverModal />
    </ImageBackground>
  );
}

export default function TictactoeMain() {
  return (
    <SessionProvider fallbackToken="bg_test_demo_token_for_tictactoe">
      <TictactoeGame />
    </SessionProvider>
  );
}