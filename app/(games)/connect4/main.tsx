import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import SessionProvider from "../../../components/SessionProvider";
import Connect4Board from "../../../component/Connect4Board";
import { useConnect4Game } from "../../../hooks/useConnect4Game";

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
    <View style={{
      flex: 1,
      backgroundColor: '#0A0A1A',
      backgroundImage: 'linear-gradient(135deg, #0A0A1A 0%, #1A0A2E 50%, #16213E 100%)'
    }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
        
        {/* Player vs AI header */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 30,
          paddingHorizontal: 40
        }}>
          <View style={{ alignItems: 'center', flex: 1 }}>
            <View style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#FF1744',
              borderWidth: 3,
              borderColor: '#FF6B6B',
              shadowColor: '#FF1744',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 10,
              elevation: 10,
            }} />
            <Text style={{
              color: '#FF6B6B',
              fontSize: 16,
              fontWeight: 'bold',
              marginTop: 8
            }}>
              Player
            </Text>
          </View>
          
          <Text style={{
            color: '#00E5FF',
            fontSize: 24,
            fontWeight: 'bold',
            marginHorizontal: 20
          }}>
            VS
          </Text>
          
          <View style={{ alignItems: 'center', flex: 1 }}>
            <View style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#00E5FF',
              borderWidth: 3,
              borderColor: '#40C4FF',
              shadowColor: '#00E5FF',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 10,
              elevation: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{ color: '#0A0A1A', fontSize: 24, fontWeight: 'bold' }}>×</Text>
            </View>
            <Text style={{
              color: '#40C4FF',
              fontSize: 16,
              fontWeight: 'bold',
              marginTop: 8
            }}>
              AI
            </Text>
          </View>
        </View>

        {/* Turn indicator */}
        <View style={{
          backgroundColor: 'rgba(255, 0, 255, 0.1)',
          borderWidth: 2,
          borderColor: '#FF00FF',
          borderRadius: 25,
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginBottom: 20,
          shadowColor: '#FF00FF',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 10,
        }}>
          <Text style={{
            color: isMyTurn ? '#FF6B6B' : '#40C4FF',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            {isMyTurn ? 'Your Turn' : 'AI Turn'}
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
    </View>
  );
}

export default function Connect4Main() {
  return (
    <SessionProvider fallbackToken="bg_test_demo_token_for_connect4">
      <Connect4Game />
    </SessionProvider>
  );
}