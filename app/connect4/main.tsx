import React from "react";
import { Modal, View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { router } from "expo-router";
import SessionProvider from "../components/SessionProvider";
import Connect4Board from "../component/Connect4Board";
import { useConnect4Game } from "../hooks/useConnect4Game";

function Connect4Game() {
  const {
    board,
    isMyTurn,
    myColor,
    handleColumnPress,
    gameOver,
    gameResult,
    myPlayerId,
    resetGame,
    getPosition,
    getRowCol
  } = useConnect4Game();

  // Custom Connect4 Game Over Modal
  const Connect4GameOverModal = () => {
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
              {isWinner ? '🔴' : isDraw ? '🤝' : '🟡'}
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
                onPress={() => {
                  resetGame();
                  router.push('/connect4');
                }}
                style={{
                  backgroundColor: '#1565C0',
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
                onPress={() => {
                  resetGame();
                  router.push('/');
                }}
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
      source={require('@/assets/checkers/checkers.png')} // Using checkers bg for now
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
            You are: {myColor === 'red' ? '🔴 Red' : '🟡 Yellow'}
          </Text>
        </View>
        
        <Connect4Board
          board={board}
          onColumnPress={handleColumnPress}
          isMyTurn={isMyTurn}
          myColor={myColor}
          gameOver={gameOver}
          getPosition={getPosition}
          getRowCol={getRowCol}
        />
      </View>
      <Connect4GameOverModal />
    </ImageBackground>
  );
}

export default function Connect4Main() {
  return (
    <SessionProvider fallbackToken="bg_test_demo_token_for_connect4">
      <Connect4Game />
    </SessionProvider>
  );
}