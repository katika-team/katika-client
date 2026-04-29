import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

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
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: cellSize,
    height: cellSize,
    margin: 4,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#444',
  },
  winningCell: {
    backgroundColor: '#4CAF50',
    borderColor: '#2E7D32',
  },
  cellText: {
    fontSize: cellSize * 0.4,
    fontWeight: 'bold',
  },
  xText: {
    color: '#FF5722',
  },
  oText: {
    color: '#2196F3',
  },
});