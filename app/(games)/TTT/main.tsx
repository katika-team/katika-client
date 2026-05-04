import Slider from '@react-native-community/slider';
import { router } from "expo-router";
import { useState } from "react";
import { Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TictactoeBoard from "../../../component/TictactoeBoard";
import SessionProvider from "../../../components/SessionProvider";
import { useTictactoeGame } from "../../../hooks/useTictactoeGame";

function TictactoeGame() {
  const {
    board,
    isMyTurn,
    mySymbol,
    handleCellPress,
    gameOver,
    gameResult,
    myPlayerId,
    resetGame
  } = useTictactoeGame();

  // Modal states
  const [resignModalVisible, setResignModalVisible] = useState(false);
  const [hintModalVisible, setHintModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.6);

  // Placeholder data - replace with actual game data
  const playerStake = 100; // Get from route params or game state
  const opponentName = "Opponent";
  const playerName = "You";

  // Resign Modal
  const ResignModal = () => (
    <Modal visible={resignModalVisible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>RESIGN GAME?</Text>
          <Text style={styles.modalText}>Are you sure you want to resign?</Text>
          
          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={() => setResignModalVisible(false)}
              style={[styles.modalButton, styles.modalButtonNo]}
            >
              <Text style={styles.modalButtonText}>NO</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => {
                setResignModalVisible(false);
                // Handle resign logic here
                router.replace('/TTT/home');
              }}
              style={[styles.modalButton, styles.modalButtonYes]}
            >
              <Text style={styles.modalButtonText}>YES</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Hint Modal
  const HintModal = () => (
    <Modal visible={hintModalVisible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>GET HINT?</Text>
          <Text style={styles.modalText}>Hints cost 25 coins</Text>
          
          <View style={styles.modalButtons}>
            <TouchableOpacity
              onPress={() => setHintModalVisible(false)}
              style={[styles.modalButton, styles.modalButtonNo]}
            >
              <Text style={styles.modalButtonText}>DENY</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => {
                setHintModalVisible(false);
                // Handle hint logic here
              }}
              style={[styles.modalButton, styles.modalButtonYes]}
            >
              <Text style={styles.modalButtonText}>ACCEPT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Settings Modal
  const SettingsModal = () => (
    <Modal visible={settingsModalVisible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { paddingVertical: 28 }]}>
          <Text style={styles.modalTitle}>SETTINGS</Text>
          
          <View style={styles.volumeSection}>
            <View style={styles.volumeHeader}>
              <Text style={styles.volumeLabel}>Music Volume</Text>
              <Text style={styles.volumeValue}>{Math.round(musicVolume * 100)}%</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={musicVolume}
              onValueChange={setMusicVolume}
              minimumTrackTintColor="rgba(106,176,255,0.85)"
              maximumTrackTintColor="rgba(120,180,255,0.25)"
              thumbTintColor="#ffffff"
            />
          </View>
          
          <TouchableOpacity
            onPress={() => setSettingsModalVisible(false)}
            style={[styles.modalButton, styles.modalButtonClose]}
          >
            <Text style={styles.modalButtonText}>CLOSE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );



  // Custom Tictactoe Game Over Modal
  const TictactoeGameOverModal = () => {
    if (!gameResult) return null;
    
    const isWinner = gameResult.winner === myPlayerId;
    const isDraw = !gameResult.winner;

    return (
      <Modal visible={gameOver} transparent animationType="fade">
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(4,10,42,0.85)',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
        }}>
          <View style={{
            width: '100%',
            maxWidth: 340,
            backgroundColor: 'rgba(10,28,86,0.98)',
            borderRadius: 20,
            padding: 36,
            alignItems: 'center',
            borderWidth: 1.5,
            borderColor: 'rgba(120,180,255,0.35)',
            shadowColor: isWinner ? '#4080ff' : '#ffffff',
            shadowOffset: { width: 0, height: 16 },
            shadowOpacity: isWinner ? 0.5 : 0.2,
            shadowRadius: 40,
            elevation: 24,
          }}>
            
            <Text style={{
              color: 'white',
              fontSize: 72,
              marginBottom: 20,
            }}>
              {isWinner ? '🏆' : isDraw ? '⚖️' : '💔'}
            </Text>
            
            <Text style={{
              color: '#ffffff',
              fontSize: 36,
              fontWeight: '900',
              letterSpacing: 3,
              marginBottom: 16,
              textShadowColor: isWinner ? 'rgba(106,176,255,0.7)' : 'rgba(255,255,255,0.3)',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 20,
            }}>
              {isWinner ? 'VICTORY' : isDraw ? 'DRAW' : 'DEFEAT'}
            </Text>
            
            <Text style={{
              color: 'rgba(194,220,255,0.75)',
              fontSize: 15,
              marginBottom: 32,
              textAlign: 'center',
              lineHeight: 22,
              paddingHorizontal: 8,
            }}>
              {gameResult.reason}
            </Text>
            
            <View style={{
              flexDirection: 'row',
              gap: 14,
              width: '100%',
            }}>
              <TouchableOpacity
                onPress={() => { resetGame(); router.replace('/TTT/stake'); }}
                style={{
                  flex: 1,
                  minHeight: 56,
                  backgroundColor: 'rgba(45,105,250,0.75)',
                  borderRadius: 12,
                  borderWidth: 1.5,
                  borderColor: 'rgba(120,180,255,0.5)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#4080ff',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.6,
                  shadowRadius: 16,
                  elevation: 10,
                }}
              >
                <Text style={{ 
                  color: 'white', 
                  fontWeight: '900', 
                  fontSize: 14,
                  letterSpacing: 2.5,
                }}>
                  PLAY AGAIN
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => { resetGame(); router.replace('/TTT/home')}}
                style={{
                  flex: 1,
                  minHeight: 56,
                  backgroundColor: 'rgba(8,18,58,0.7)',
                  borderRadius: 12,
                  borderWidth: 1.5,
                  borderColor: 'rgba(120,180,255,0.25)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ 
                  color: 'rgba(194,220,255,0.85)', 
                  fontWeight: '900', 
                  fontSize: 14,
                  letterSpacing: 2.5,
                }}>
                  HOME
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ImageBackground
      source={require('@/assets/ttt/bg.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.gameContainer}>
        {/* Top Section: Two Players + Timer in Row */}
        <View style={styles.topSection}>
          {/* Left Player */}
          <View style={styles.playerCard}>
            {/* Player Image - Replace with actual image */}
            {/* <Image 
              source={{ uri: 'https://i.pravatar.cc/150?img=1' }} 
              style={styles.playerImage}
            /> */}
            <View style={styles.playerImage}>
              <Text style={styles.playerImagePlaceholder}>👤</Text>
            </View>
            <Text style={styles.playerNameTop}>{playerName}</Text>
          </View>

          {/* Timer in Middle - With icon */}
          <View style={styles.timerMiddle}>
            <Text style={styles.timerIcon}>⏱️</Text>
            <Text style={styles.timerTextLarge}>12:55</Text>
          </View>

          {/* Right Player */}
          <View style={styles.playerCard}>
            {/* Player Image - Replace with actual image */}
            {/* <Image 
              source={{ uri: 'https://i.pravatar.cc/150?img=2' }} 
              style={styles.playerImage}
            /> */}
            <View style={styles.playerImage}>
              <Text style={styles.playerImagePlaceholder}>👤</Text>
            </View>
            <Text style={styles.playerNameTop}>{opponentName}</Text>
          </View>
        </View>

        {/* Points Section - Smaller */}
        <View style={styles.pointsSection}>
          <View style={styles.pointsBox}>
            <Text style={styles.pointsNumber}>3</Text>
          </View>

          <View style={styles.currentTurnBox}>
            <Text style={styles.currentTurnSymbol}>{isMyTurn ? mySymbol : (mySymbol === 'X' ? 'O' : 'X')}</Text>
          </View>

          <View style={styles.pointsBox}>
            <Text style={styles.pointsNumber}>3</Text>
          </View>
        </View>

        {/* Board Area */}
        <View style={styles.boardArea}>
          <TictactoeBoard
            board={board}
            onCellPress={handleCellPress}
            isMyTurn={isMyTurn}
            mySymbol={mySymbol}
            gameOver={gameOver}
          />
        </View>

        {/* Action Buttons - Pushed down */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setResignModalVisible(true)}
          >
            <Image 
              source={require('./components/icons/back.png')} 
              style={styles.actionButtonIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setHintModalVisible(true)}
          >
            <Image 
              source={require('./components/icons/hint.png')} 
              style={styles.actionButtonIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setSettingsModalVisible(true)}
          >
            <Image 
              source={require('./components/icons/settings.png')} 
              style={styles.actionButtonIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modals */}
      <ResignModal />
      <HintModal />
      <SettingsModal />
      <TictactoeGameOverModal />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  // Top Section - Cleaner with spacing
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  playerCard: {
    alignItems: 'center',
    gap: 8,
  },
  playerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(45,105,250,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(120,180,255,0.6)',
  },
  playerImagePlaceholder: {
    fontSize: 32,
  },
  playerNameTop: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  // Timer - With icon
  timerMiddle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  timerIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  timerTextLarge: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '900',
    textShadowColor: 'rgba(106,176,255,0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  // Points Section - space-between to align with players
  pointsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  pointsBox: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: 'rgba(10,28,86,0.7)',
    borderWidth: 1.5,
    borderColor: 'rgba(120,180,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsNumber: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
  },
  currentTurnBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(10,28,86,0.8)',
    borderWidth: 2,
    borderColor: 'rgba(120,180,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentTurnSymbol: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '900',
  },
  // Board Area with spacing
  boardArea: {
   
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    marginTop:2
  },
  // Action Buttons - space-between with spread
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingBottom: 18,
    marginTop:5
  },
  actionButton: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(45,105,250,0.6)',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(120,180,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4080ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  actionButtonIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(4,10,42,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: 'rgba(10,28,86,0.98)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(120,180,255,0.4)',
    shadowColor: '#4080ff',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 20,
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 12,
    textShadowColor: 'rgba(106,176,255,0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  modalText: {
    color: 'rgba(194,220,255,0.85)',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonNo: {
    backgroundColor: 'rgba(8,18,58,0.7)',
    borderColor: 'rgba(120,180,255,0.3)',
  },
  modalButtonYes: {
    backgroundColor: 'rgba(45,105,250,0.7)',
    borderColor: 'rgba(120,180,255,0.5)',
    shadowColor: '#4080ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  modalButtonClose: {
    width: '100%',
    backgroundColor: 'rgba(45,105,250,0.7)',
    borderColor: 'rgba(120,180,255,0.5)',
    marginTop: 8,
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2,
  },
  volumeSection: {
    width: '100%',
    marginBottom: 20,
  },
  volumeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  volumeLabel: {
    color: 'rgba(194,220,255,0.9)',
    fontSize: 14,
    fontWeight: '700',
  },
  volumeValue: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default function TictactoeMain() {
  return (
    <SessionProvider fallbackToken="bg_test_demo_token_for_tictactoe">
      <TictactoeGame />
    </SessionProvider>
  );
}
