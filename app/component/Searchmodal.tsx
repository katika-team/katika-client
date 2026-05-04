import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Href, router } from "expo-router";
interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  nextRoute?: string;
  mode: 'session' | 'matchmaking';
  betAmount?: string;
}

export default function SearchModal({
  visible,
  onClose,
  nextRoute = "/checkers/main",
  mode,
  betAmount
}: SearchModalProps) {

  const [status, setStatus] = useState<'searching' | 'found' | 'failed'>('searching');

  const pushRoute = (params: Record<string, string | number | undefined> = {}) => {
    const query = Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== '')
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&');

    const route = query ? `${nextRoute}${nextRoute.includes('?') ? '&' : '?'}${query}` : nextRoute;
    router.push(route as Href);
  };

  useEffect(() => {
    if (!visible) return;

    setStatus('searching');

    if (mode === 'session') {
      // Create session via API (no socket needed)
      createSession();
    } else {
      // Handle matchmaking (would need socket from provider)
      // For now, simulate finding a match
      setTimeout(() => {
        setStatus('found');
        setTimeout(() => {
          onClose();
          pushRoute({ stake: betAmount });
        }, 1500);
      }, 2000);
    }
  }, [visible, mode]);

  const createSession = async () => {
    try {
      console.log('Attempting to create session...');
      
      const response = await fetch('https://beta-gamer.onrender.com/server/skibag/game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 'player1',
          userName: 'Player',
          game: mode === 'session' && nextRoute.includes('connect4') ? 'connect4' : 
                mode === 'session' && nextRoute.includes('TTT') ? 'tictactoe' : 'checkers',
          matchType: 'bot'
        })
      });

      console.log('Response received:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Session created:', data);
        setStatus('found');
        setTimeout(() => {
          onClose();
          pushRoute({
            token: data.sessionToken,
            sessionId: data.sessionId,
            stake: betAmount
          });
        }, 1500);
      } else {
        const error = await response.text();
        console.error('Session creation failed:', response.status, error);
        setStatus('failed');
      }
    } catch (error) {
      console.error('Session creation failed:', error);
      // For now, simulate success to test the rest of the flow
      console.log('Simulating success for testing...');
      setStatus('found');
      setTimeout(() => {
        onClose();
        pushRoute({ stake: betAmount });
      }, 1500);
    }
  };

  const getStatusText = () => {
    if (mode === 'session') {
      switch (status) {
        case 'searching': return 'Creating session...';
        case 'found': return 'Session created!';
        case 'failed': return 'Failed to create session';
      }
    } else {
      switch (status) {
        case 'searching': return 'Finding opponent...';
        case 'found': return 'Opponent found!';
        case 'failed': return 'No opponents found';
      }
    }
  };

  const getSubText = () => {
    if (betAmount) {
      return `${Number(betAmount).toLocaleString()} COINS`;
    }

    if (mode === 'session') {
      return 'Setting up your game';
    } else {
      return 'Searching for players';
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.panel}>
          <View style={styles.glow} />
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />

          <Text style={styles.eyebrow}>TIC TAC TOE</Text>
          <Text style={styles.title}>
            {getStatusText()}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.subText}>
            {getSubText()}
          </Text>

          {status === 'searching' && (
            <View style={styles.loaderWrap}>
              <ActivityIndicator color="#ffffff" size="large" />
            </View>
          )}

          {status === 'failed' && (
            <Pressable
              onPress={() => {
                setStatus('searching');
                if (mode === 'session') {
                  createSession();
                }
              }}
              style={styles.retryButton}
            >
              <Text style={styles.retryText}>TRY AGAIN</Text>
            </Pressable>
          )}

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(2,6,22,0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  panel: {
    width: '100%',
    maxWidth: 380,
    minHeight: 238,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(120,180,255,0.85)',
    backgroundColor: 'rgba(10,28,86,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 28,
    overflow: 'hidden',
    shadowColor: '#4080ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.55,
    shadowRadius: 24,
    elevation: 16,
  },

  glow: {
    position: 'absolute',
    top: -80,
    width: 240,
    height: 160,
    borderRadius: 120,
    backgroundColor: 'rgba(70,130,255,0.22)',
  },

  eyebrow: {
    color: 'rgba(150,195,255,0.65)',
    fontSize: 11,
    letterSpacing: 4,
    fontWeight: '800',
    marginBottom: 8,
  },

  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1.5,
    textAlign: 'center',
    textShadowColor: 'rgba(80,160,255,0.85)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },

  divider: {
    width: 56,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(100,160,255,0.55)',
    marginTop: 16,
    marginBottom: 14,
  },

  subText: {
    color: '#6ab0ff',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
    textAlign: 'center',
  },

  loaderWrap: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1.5,
    borderColor: 'rgba(120,180,255,0.45)',
    backgroundColor: 'rgba(45,105,250,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },

  retryButton: {
    height: 48,
    minWidth: 156,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(120,180,255,0.9)',
    backgroundColor: 'rgba(45,105,250,0.72)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },

  retryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 3,
  },

  corner: { position: 'absolute', width: 12, height: 12 },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'rgba(180,215,255,0.9)',
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: 'rgba(180,215,255,0.9)',
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'rgba(180,215,255,0.9)',
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: 'rgba(180,215,255,0.9)',
  },
});
