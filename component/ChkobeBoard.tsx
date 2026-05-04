import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Card } from '../hooks/useChkobeGame';

interface ChkobeBoardProps {
  hand: Card[];
  discardPile: Card[];
  onPlayCard: (cardId: string) => void;
  onDrawCard: () => void;
  isMyTurn: boolean;
  gameOver: boolean;
  activeSuit: string | null;
  pendingPickup: number;
  roomId: string | null;
  players: any[];
  myPlayerId: string;
}

const RANK_INDEX: Record<string, number> = {
  A: 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6,
  '8': 7, '9': 8, '10': 9, J: 10, Q: 11, K: 12, JOKER: 13,
};

const SUIT_INDEX: Record<string, number> = {
  clubs: 0, diamonds: 1, spades: 2, hearts: 3, black: 0, red: 1,
};

export default function ChkobeBoard({ 
  hand, 
  discardPile, 
  onPlayCard, 
  onDrawCard,
  isMyTurn, 
  gameOver,
  activeSuit,
  pendingPickup,
  roomId,
  players,
  myPlayerId
}: ChkobeBoardProps) {
  
  const getCardImageUrl = (card: Card) => {
    const baseUrl = process.env.CHKOBE_ASSETS_URL || 'https://beta-gamer.onrender.com/card/playingCards';
    const r = RANK_INDEX[card.rank] ?? 0;
    const s = SUIT_INDEX[card.suit] ?? 0;
    return `${baseUrl}/${r}${s}.png`;
  };

  const getCardBackUrl = () => {
    const baseUrl = process.env.CHKOBE_ASSETS_URL || 'https://beta-gamer.onrender.com/card/playingCards';
    return `${baseUrl}/turnedback-black.png`;
  };

  // Get opponents (excluding current player)
  const opponents = (players || []).filter(p => p.id !== myPlayerId);
  const topOpponent = opponents[0];
  const leftOpponent = opponents[1]; 
  const rightOpponent = opponents[2];

  const renderCard = (card: Card, onPress?: () => void, style?: any) => (
    <TouchableOpacity
      key={card.id}
      onPress={onPress}
      disabled={!onPress || !isMyTurn || gameOver}
      style={[styles.cardContainer, style]}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: getCardImageUrl(card) }}
        style={styles.cardImage}
        resizeMode="contain"
        onError={() => console.log('Failed to load card image:', getCardImageUrl(card))}
      />
      {/* Fallback text overlay */}
      <View style={styles.cardTextOverlay}>
        <Text style={styles.cardText}>{card.rank}</Text>
        <Text style={styles.cardSuit}>{card.suit[0]?.toUpperCase()}</Text>
      </View>
      {onPress && isMyTurn && !gameOver && (
        <View style={styles.cardHighlight} />
      )}
    </TouchableOpacity>
  );

  const topCard = discardPile[discardPile.length - 1];

  return (
    <View style={styles.container}>
      
      {/* Top opponent */}
      <View style={styles.topOpponent}>
        <Text style={styles.playerName}>
          {topOpponent?.username || 'Bot 1'} ({topOpponent?.hand?.length || 0} cards)
        </Text>
        <View style={styles.opponentHand}>
          {Array.from({ length: topOpponent?.hand?.length || 0 }, (_, i) => (
            <View key={i} style={[styles.cardContainer, styles.opponentCard, { marginLeft: i * -8 }]}>
              <Image
                source={{ uri: getCardBackUrl() }}
                style={styles.cardImage}
                resizeMode="contain"
              />
            </View>
          ))}
        </View>
      </View>

      {/* Left and Right opponents + Center play area */}
      <View style={styles.middleRow}>
        
        {/* Left opponent */}
        <View style={styles.leftOpponent}>
          <Text style={[styles.playerName, styles.verticalText]}>
            {leftOpponent?.username || 'Bot 2'}
          </Text>
          <View style={styles.leftOpponentHand}>
            {Array.from({ length: leftOpponent?.hand?.length || 0 }, (_, i) => (
              <View key={i} style={[styles.cardContainer, styles.opponentCard, { marginTop: i * -12 }]}>
                <Image
                  source={{ uri: getCardBackUrl() }}
                  style={[styles.cardImage, { transform: [{ rotate: '90deg' }] }]}
                  resizeMode="contain"
                />
              </View>
            ))}
          </View>
        </View>

        {/* Center play area */}
        <View style={styles.centerArea}>
          
          {/* Status */}
          <View style={styles.statusSection}>
            {activeSuit && (
              <Text style={styles.statusLabel}>Active: {activeSuit}</Text>
            )}
            {pendingPickup > 0 && (
              <Text style={[styles.statusLabel, styles.warningText]}>
                Pick up: {pendingPickup}
              </Text>
            )}
          </View>

          {/* Draw and Discard piles */}
          <View style={styles.playArea}>
            <TouchableOpacity 
              style={styles.pileContainer}
              onPress={onDrawCard}
              disabled={!isMyTurn || gameOver}
              activeOpacity={0.8}
            >
              <View style={styles.pileStack}>
                <Image
                  source={{ uri: getCardBackUrl() }}
                  style={[styles.cardImage, styles.stackCard, { top: 2, left: 2 }]}
                  resizeMode="contain"
                />
                <Image
                  source={{ uri: getCardBackUrl() }}
                  style={[styles.cardImage, styles.stackCard]}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.pileLabel}>Draw</Text>
            </TouchableOpacity>

            <View style={styles.pileContainer}>
              <View style={styles.pileStack}>
                {topCard ? (
                  renderCard(topCard, undefined, styles.discardCard)
                ) : (
                  <View style={[styles.cardContainer, styles.emptyPile]}>
                    <Text style={styles.emptyText}>Empty</Text>
                  </View>
                )}
              </View>
              <Text style={styles.pileLabel}>Discard</Text>
            </View>
          </View>
        </View>

        {/* Right opponent */}
        <View style={styles.rightOpponent}>
          <Text style={[styles.playerName, styles.verticalText]}>
            {rightOpponent?.username || 'Bot 3'}
          </Text>
          <View style={styles.rightOpponentHand}>
            {Array.from({ length: rightOpponent?.hand?.length || 0 }, (_, i) => (
              <View key={i} style={[styles.cardContainer, styles.opponentCard, { marginTop: i * -12 }]}>
                <Image
                  source={{ uri: getCardBackUrl() }}
                  style={[styles.cardImage, { transform: [{ rotate: '90deg' }] }]}
                  resizeMode="contain"
                />
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Bottom area - Player hand */}
      <View style={styles.bottomArea}>
        <Text style={styles.playerName}>Your Hand ({hand.length} cards)</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.handContainer}
        >
          {hand.map((card, index) => 
            renderCard(
              card, 
              () => onPlayCard(card.id),
              [styles.handCard, { zIndex: hand.length - index, marginLeft: index > 0 ? -15 : 0 }]
            )
          )}
        </ScrollView>
      </View>

      {/* Turn indicator */}
      <View style={[
        styles.turnIndicator,
        isMyTurn ? styles.myTurnIndicator : styles.opponentTurnIndicator
      ]}>
        <Text style={styles.turnText}>
          {gameOver ? '🃏 Game Over' : roomId ? (isMyTurn ? '🃏 Your Turn' : '⏳ Opponent\'s Turn') : '⏳ Waiting for players...'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F5132', // Windows Hearts green
    padding: 12,
  },
  
  // Top opponent
  topOpponent: {
    height: 80,
    alignItems: 'center',
    marginBottom: 10,
  },
  
  // Middle row with left opponent, center, right opponent
  middleRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  leftOpponent: {
    width: 80,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  rightOpponent: {
    width: 80,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  centerArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Player names
  playerName: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  
  verticalText: {
    transform: [{ rotate: '90deg' }],
    marginBottom: 0,
  },
  
  // Opponent hands
  opponentHand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  leftOpponentHand: {
    alignItems: 'center',
  },
  
  rightOpponentHand: {
    alignItems: 'center',
  },
  
  opponentCard: {
    opacity: 0.9,
    elevation: 1,
  },
  
  statusSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  
  statusLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  
  warningText: {
    color: '#FF6B6B',
  },
  
  playArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 200,
  },
  
  pileContainer: {
    alignItems: 'center',
  },
  
  pileStack: {
    position: 'relative',
    width: 60,
    height: 84,
  },
  
  stackCard: {
    position: 'absolute',
  },
  
  pileLabel: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  
  bottomArea: {
    height: 120,
    marginTop: 10,
  },
  
  handContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  
  cardContainer: {
    width: 50,
    height: 70,
    borderRadius: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    backgroundColor: 'white',
  },
  
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  
  cardTextOverlay: {
    position: 'absolute',
    top: 2,
    left: 2,
    alignItems: 'center',
  },
  
  cardText: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  
  cardSuit: {
    color: '#000',
    fontSize: 8,
    fontWeight: 'bold',
  },
  
  cardHighlight: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFD700',
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  
  handCard: {
    elevation: 3,
    transform: [{ translateY: -2 }], // Slight lift effect like Windows Hearts
  },
  
  discardCard: {
    elevation: 4,
  },
  
  emptyPile: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  emptyText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
    fontStyle: 'italic',
  },
  
  turnIndicator: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    elevation: 5,
  },
  
  myTurnIndicator: {
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
    borderColor: '#4CAF50',
  },
  
  opponentTurnIndicator: {
    backgroundColor: 'rgba(211, 47, 47, 0.9)',
    borderColor: '#F44336',
  },
  
  turnText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});