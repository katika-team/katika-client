import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, ViewStyle, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Piece { player: 'red' | 'black'; type: 'man' | 'king'; }
interface Move { from: number; to: number; captures?: number[]; }

interface Props {
  board: (Piece | null)[];
  selectedPiece: number | null;
  validMoves: Move[];
  lastMove: { from: number; to: number } | null;
  onCellPress: (pos: number) => void;
  isMyTurn: boolean;
  myColor: 'red' | 'black';
  style?: ViewStyle;
}

const { width } = Dimensions.get('window');
const boardSize = width * 0.9;
const squareSize = boardSize / 8;

export default function CustomCheckersBoard({ 
  board, selectedPiece, validMoves, lastMove, onCellPress, isMyTurn, myColor, style 
}: Props) {
  
  const renderSquare = (pos: number) => {
    const row = Math.floor(pos / 8);
    const col = pos % 8;
    const isDark = (row + col) % 2 === 1;
    const piece = board[pos];
    const isSelected = selectedPiece === pos;
    const isValidMove = validMoves.some(m => m.to === pos);
    const isLastMove = lastMove && (lastMove.from === pos || lastMove.to === pos);

    return (
      <TouchableOpacity
        key={pos}
        style={[
          styles.square,
          isDark ? styles.darkSquare : styles.lightSquare,
          isSelected && styles.selectedSquare,
          isValidMove && styles.validMoveSquare,
          isLastMove && styles.lastMoveSquare,
        ]}
        onPress={() => onCellPress(pos)}
        disabled={!isMyTurn}
      >
        {/* Wood grain texture */}
        <LinearGradient
          colors={isDark ? ['#8B4513', '#A0522D', '#8B4513'] : ['#F5DEB3', '#DEB887', '#F5DEB3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
        
        {/* Piece */}
        {piece && (
          <View style={[
            styles.piece,
            piece.player === 'red' ? styles.lightPiece : styles.darkPiece,
          ]}>
            {/* Outer ring */}
            <View style={[
              styles.pieceRing,
              piece.player === 'red' ? styles.lightPieceRing : styles.darkPieceRing,
            ]} />
            
            {/* Inner ring */}
            <View style={[
              styles.pieceInnerRing,
              piece.player === 'red' ? styles.lightPieceInner : styles.darkPieceInner,
            ]} />
            
            {/* Center dot */}
            <View style={[
              styles.pieceDot,
              piece.player === 'red' ? styles.lightPieceDot : styles.darkPieceDot,
            ]} />
            
            {/* King crown */}
            {piece.type === 'king' && (
              <View style={styles.crown}>
                <LinearGradient
                  colors={['#FFD700', '#FFA500', '#FFD700']}
                  style={styles.crownGradient}
                />
              </View>
            )}
          </View>
        )}
        
        {/* Selection/move indicators */}
        {isSelected && (
          <View style={styles.selectionRing} />
        )}
        {isValidMove && (
          <View style={styles.validMoveIndicator} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.board}>
        {Array.from({ length: 64 }, (_, i) => renderSquare(i))}
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
    width: boardSize,
    height: boardSize,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  square: {
    width: squareSize,
    height: squareSize,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  darkSquare: {
    // Wood grain handled by LinearGradient
  },
  lightSquare: {
    // Wood grain handled by LinearGradient  
  },
  selectedSquare: {
    borderWidth: 3,
    borderColor: '#FF6B35',
  },
  validMoveSquare: {
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  lastMoveSquare: {
    backgroundColor: 'rgba(255, 107, 53, 0.3)',
  },
  piece: {
    width: squareSize * 0.75,
    height: squareSize * 0.75,
    borderRadius: squareSize * 0.375,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  lightPiece: {
    backgroundColor: '#DEB887',
  },
  darkPiece: {
    backgroundColor: '#654321',
  },
  pieceRing: {
    position: 'absolute',
    width: '85%',
    height: '85%',
    borderRadius: squareSize * 0.32,
    borderWidth: 2,
  },
  lightPieceRing: {
    borderColor: '#8B7355',
  },
  darkPieceRing: {
    borderColor: '#3E2723',
  },
  pieceInnerRing: {
    position: 'absolute',
    width: '60%',
    height: '60%',
    borderRadius: squareSize * 0.225,
    borderWidth: 1.5,
  },
  lightPieceInner: {
    borderColor: '#A0522D',
  },
  darkPieceInner: {
    borderColor: '#2E1A0F',
  },
  pieceDot: {
    width: squareSize * 0.15,
    height: squareSize * 0.15,
    borderRadius: squareSize * 0.075,
  },
  lightPieceDot: {
    backgroundColor: '#8B7355',
  },
  darkPieceDot: {
    backgroundColor: '#2E1A0F',
  },
  crown: {
    position: 'absolute',
    width: squareSize * 0.3,
    height: squareSize * 0.2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  crownGradient: {
    flex: 1,
    borderRadius: 4,
  },
  selectionRing: {
    position: 'absolute',
    width: '90%',
    height: '90%',
    borderRadius: squareSize * 0.45,
    borderWidth: 3,
    borderColor: '#FF6B35',
  },
  validMoveIndicator: {
    width: squareSize * 0.3,
    height: squareSize * 0.3,
    borderRadius: squareSize * 0.15,
    backgroundColor: 'rgba(255, 107, 53, 0.7)',
  },
});