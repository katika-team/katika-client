import React from "react";
import { Modal, View, Text, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import SessionProvider from "../components/SessionProvider";
import GameLayout from "../components/GameLayout";
import { useCheckersGame } from "../hooks/useCheckersGame";
import CustomCheckersBoard from "../component/CustomCheckersBoard";
import GamePlay from "../component/GamePlay";

function CheckersGame() {
  const {
    board,
    selectedPiece,
    validMoves,
    lastMove,
    isMyTurn,
    myColor,
    handleCellPress,
    gameOver,
    gameResult,
    myPlayerId
  } = useCheckersGame();

  // Custom Checkers Game Over Modal
  const CheckersGameOverModal = () => {
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
          <View style={{ width: '90%', alignItems: 'center' }}>
            <Image
              source={require('@/assets/checkers/btn.png')}
              style={{
                position: 'absolute',
                width: '100%',
                height: 200,
                resizeMode: 'stretch'
              }}
            />
            
            <Text style={{
              color: 'white',
              fontSize: 32,
              fontWeight: 'bold',
              marginTop: 30,
              zIndex: 1
            }}>
              {isWinner ? '🏆 Victory!' : isDraw ? '🤝 Draw!' : '💀 Defeat!'}
            </Text>
            
            <Text style={{
              color: 'white',
              fontSize: 16,
              marginTop: 10,
              opacity: 0.8,
              zIndex: 1
            }}>
              {gameResult.reason}
            </Text>
            
            <View style={{
              flexDirection: 'row',
              gap: 15,
              marginTop: 30,
              zIndex: 1
            }}>
              <TouchableOpacity
                onPress={() => router.push('/checkers/bet')}
                style={{
                  backgroundColor: 'rgba(255, 16, 16, 1)',
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
                onPress={() => router.push('/checkers/home')}
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
    <GameLayout
      topPlayer={{
        name: "John Doe",
        region: "Cameroon",
        rank: "Beginner",
        score: 20,
        pieces: 6
      }}
      bottomPlayer={{
        name: "John Doe",
        region: "Cameroon", 
        rank: "Beginner",
        score: 20,
        pieces: 6
      }}
      gameStats={{
        time: "12:10",
        coins: 2000
      }}
    >
      <CustomCheckersBoard
        board={board}
        selectedPiece={selectedPiece}
        validMoves={validMoves}
        lastMove={lastMove}
        onCellPress={handleCellPress}
        isMyTurn={isMyTurn}
        myColor={myColor}
        style={{
          borderRadius: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        }}
      />
      <GamePlay />
      <CheckersGameOverModal />
    </GameLayout>
  );
}

export default function Main() {
  return (
    <SessionProvider>
      <CheckersGame />
    </SessionProvider>
  );
}