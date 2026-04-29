import React, { useEffect, useState } from "react";
import { Modal, View, Text, Image, Dimensions } from "react-native";
import { router } from "expo-router";
import GameButton from "./GameButton";

const { height } = Dimensions.get("window");

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
          router.push(nextRoute);
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
          game: 'checkers',
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
          // Pass the session token via URL params
          router.push(`${nextRoute}?token=${data.sessionToken}&sessionId=${data.sessionId}`);
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
        router.push(nextRoute);
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
    if (mode === 'session') {
      return 'Setting up your game';
    } else {
      return betAmount ? `Bet: ${betAmount}` : 'Searching for players';
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        <View style={{
          width: '90%',
          height: height * 0.25,
          alignItems: 'center'
        }}>

          <Image
            source={require('@/assets/checkers/btn.png')}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              resizeMode: 'stretch'
            }}
          />

          <Text style={{
            color: 'white',
            fontSize: 22,
            fontWeight: '700',
            marginTop: 20
          }}>
            {getStatusText()}
          </Text>

          <Text style={{
            color: 'white',
            fontSize: 16,
            fontWeight: '400',
            marginTop: 10,
            opacity: 0.8
          }}>
            {getSubText()}
          </Text>

          {status === 'searching' && (
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              borderWidth: 3,
              borderColor: '#FFD700',
              borderTopColor: 'transparent',
              marginTop: 15
            }} />
          )}

          {status === 'failed' && (
            <GameButton
              title="Try Again"
              onPress={() => {
                setStatus('searching');
                if (mode === 'session') {
                  createSession();
                }
              }}
              style={{ marginTop: 15 }}
            />
          )}

        </View>
      </View>
    </Modal>
  );
}