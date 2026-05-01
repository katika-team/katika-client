import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const boardSize = width * 0.8;
const cellSize = boardSize / 3;

type Player = 'X' | 'O';
type Cell = Player | null;

interface TictactoeBoardProps {
  board: Cell[];
  onCellPress: (position: number) => void;
  isMyTurn: boolean;
  mySymbol: Player;
  gameOver: boolean;
}

export default function TictactoeBoard({ 
  board, 
  onCellPress, 
  isMyTurn, 
  mySymbol, 
  gameOver 
}: TictactoeBoardProps) {
  
  console.log('TictactoeBoard render:', { board, isMyTurn, mySymbol, gameOver });
  
  const renderCell = (position: number) => {
    const cell = board[position];
    const isWinningCell = false; // TODO: Add winning line detection
    
    return (
      <TouchableOpacity
        key={position}
        style={[
          styles.cell,
          isWinningCell && styles.winningCell
        ]}
        onPress={() => {
          console.log('Cell pressed:', position, 'isMyTurn:', isMyTurn, 'gameOver:', gameOver, 'cell:', cell);
          onCellPress(position);
        }}
        disabled={!isMyTurn || gameOver || cell !== null}
      >
        <Text style={[
          styles.cellText,
          cell === 'X' ? styles.xText : styles.oText
        ]}>
          {cell || ''}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {/* Row 1 */}
        <View style={styles.row}>
          {renderCell(0)}
          {renderCell(1)}
          {renderCell(2)}
        </View>
        {/* Row 2 */}
        <View style={styles.row}>
          {renderCell(3)}
          {renderCell(4)}
          {renderCell(5)}
        </View>
        {/* Row 3 */}
        <View style={styles.row}>
          {renderCell(6)}
          {renderCell(7)}
          {renderCell(8)}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    backgroundColor: 'rgba(10,28,86,0.92)',
    borderRadius: 12,
    padding: 12,
    elevation: 20,
    shadowColor: '#4080ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(120,180,255,0.6)',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: cellSize,
    height: cellSize,
    margin: 4,
    backgroundColor: 'rgba(8,18,58,0.7)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(120,180,255,0.35)',
  },
  winningCell: {
    backgroundColor: 'rgba(45,105,250,0.7)',
    borderColor: 'rgba(120,180,255,0.9)',
    shadowColor: '#4080ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 16,
    elevation: 12,
  },
  cellText: {
    fontSize: cellSize * 0.45,
    fontWeight: '900',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  xText: {
    color: '#ff6b9d',
    textShadowColor: 'rgba(255,107,157,0.8)',
  },
  oText: {
    color: '#6ab0ff',
    textShadowColor: 'rgba(106,176,255,0.8)',
  },
});