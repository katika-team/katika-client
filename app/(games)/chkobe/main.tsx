import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import SessionProvider from "../components/SessionProvider";
import ChkobeBoard from "../component/ChkobeBoard";
import { useChkobeGame } from "../hooks/useChkobeGame";

function ChkobeGame() {
  const {
    hand,
    discardPile,
    isMyTurn,
    playCard,
    drawCard,
    gameOver,
    gameResult,
    myPlayerId,
    resetGame,
    activeSuit,
    pendingPickup,
    players,
    roomId
  } = useChkobeGame();

  const ChkobeGameOverModal = () => {
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
              {isWinner ? '🃏' : isDraw ? '🤝' : '🎴'}
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
                  router.push('/chkobe');
                }}
                style={{
                  backgroundColor: '#8E24AA',
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
      backgroundColor: '#2E7D32'
    }}>
      <ChkobeBoard
        hand={hand}
        discardPile={discardPile}
        onPlayCard={playCard}
        onDrawCard={drawCard}
        isMyTurn={isMyTurn}
        gameOver={gameOver}
        activeSuit={activeSuit}
        pendingPickup={pendingPickup}
        roomId={roomId}
        players={players}
        myPlayerId={myPlayerId}
      />
      <ChkobeGameOverModal />
    </View>
  );
}

export default function ChkobeMain() {
  return (
    <SessionProvider 
      fallbackToken="bg_test_demo_token_for_chkobe"
      namespace="/chkobe"
    >
      <ChkobeGame />
    </SessionProvider>
  );
}