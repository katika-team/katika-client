import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

interface GameOverModalProps {
  visible: boolean;
  result: { winner: string | null; reason: string } | null;
  myPlayerId: string;
  onPlayAgain: () => void;
  onHome: () => void;
}

export default function GameOverModal({ visible, result, myPlayerId, onPlayAgain, onHome }: GameOverModalProps) {
  if (!result) return null;

  const isWinner = result.winner === myPlayerId;
  const isDraw = !result.winner;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{
          backgroundColor: '#1a1a1a',
          borderRadius: 20,
          padding: 30,
          alignItems: 'center',
          width: '80%',
          borderWidth: 2,
          borderColor: isWinner ? '#4CAF50' : isDraw ? '#FFC107' : '#F44336'
        }}>
          <Text style={{ fontSize: 48, marginBottom: 20 }}>
            {isWinner ? '🏆' : isDraw ? '🤝' : '😔'}
          </Text>
          
          <Text style={{
            color: 'white',
            fontSize: 24,
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
            {result.reason}
          </Text>
          
          <View style={{ flexDirection: 'row', gap: 15 }}>
            <TouchableOpacity
              onPress={onPlayAgain}
              style={{
                backgroundColor: '#4CAF50',
                paddingHorizontal: 20,
                paddingVertical: 12,
                borderRadius: 10
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Play Again</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={onHome}
              style={{
                backgroundColor: '#666',
                paddingHorizontal: 20,
                paddingVertical: 12,
                borderRadius: 10
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}