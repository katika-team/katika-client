import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const boardWidth = width * 0.9;
const cellSize = boardWidth / 7;

type Player = 'red' | 'yellow';
type Cell = Player | null;

interface Connect4BoardProps {
  board: Cell[]; // 1D array
  onColumnPress: (column: number) => void;
  isMyTurn: boolean;
  myColor: Player;
  gameOver: boolean;
  getPosition: (row: number, col: number) => number;
  getRowCol: (position: number) => { row: number; col: number };
}

export default function Connect4Board({ 
  board, 
  onColumnPress, 
  isMyTurn, 
  myColor, 
  gameOver,
  getPosition,
  getRowCol
}: Connect4BoardProps) {
  
  console.log('Connect4Board render:', { board: board?.length, isMyTurn, myColor, gameOver });
  
  // Safety check for board initialization
  if (!board || !Array.isArray(board) || board.length !== 42) {
    console.log('Board not ready:', board?.length);
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white' }}>Loading board...</Text>
      </View>
    );
  }
  
  const renderCell = (row: number, col: number) => {
    const position = getPosition(row, col);
    const cell = board[position];
    
    return (
      <View
        key={`${row}-${col}`}
        style={[
          styles.cell,
          cell === 'red' && styles.redPiece,
          cell === 'yellow' && styles.yellowPiece
        ]}
      />
    );
  };

  const renderColumn = (colIndex: number) => {
    return (
      <TouchableOpacity
        key={colIndex}
        style={styles.column}
        onPress={() => {
          console.log('Column pressed:', colIndex, 'isMyTurn:', isMyTurn, 'gameOver:', gameOver);
          onColumnPress(colIndex);
        }}
        disabled={!isMyTurn || gameOver}
      >
        {Array.from({ length: 6 }, (_, rowIndex) => renderCell(rowIndex, colIndex))}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {Array.from({ length: 7 }, (_, colIndex) => renderColumn(colIndex))}
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
    flexDirection: 'row',
    backgroundColor: '#1565C0',
    borderRadius: 12,
    padding: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  column: {
    flexDirection: 'column',
  },
  cell: {
    width: cellSize - 8,
    height: cellSize - 8,
    margin: 4,
    borderRadius: (cellSize - 8) / 2,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#0D47A1',
  },
  redPiece: {
    backgroundColor: '#F44336',
    borderColor: '#C62828',
  },
  yellowPiece: {
    backgroundColor: '#FFEB3B',
    borderColor: '#F57F17',
  },
});