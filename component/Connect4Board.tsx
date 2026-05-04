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
    backgroundColor: 'rgba(20, 20, 40, 0.9)',
    borderRadius: 15,
    padding: 12,
    borderWidth: 3,
    borderColor: '#FF00FF',
    shadowColor: '#FF00FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 15,
  },
  column: {
    flexDirection: 'column',
    marginHorizontal: 2,
  },
  cell: {
    width: cellSize - 10,
    height: cellSize - 10,
    margin: 2,
    borderRadius: (cellSize - 10) / 2,
    backgroundColor: 'rgba(40, 40, 80, 0.8)',
    borderWidth: 2,
    borderColor: '#8A2BE2',
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  redPiece: {
    backgroundColor: '#FF1744',
    borderColor: '#FF6B6B',
    shadowColor: '#FF1744',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  yellowPiece: {
    backgroundColor: '#00E5FF',
    borderColor: '#40C4FF',
    shadowColor: '#00E5FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
});