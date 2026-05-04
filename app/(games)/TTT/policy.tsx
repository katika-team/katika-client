import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

function Section({ title, body }: { title: string; body: string }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionBody}>{body}</Text>
    </View>
  );
}

export default function Policy() {
  const { fromSettings } = useLocalSearchParams();

  const handleBack = () => {
    if (fromSettings === 'true') {
      router.push('/TTT/home?openSettings=true');
    } else {
      router.back();
    }
  };

  return (
    <ImageBackground source={require('@/assets/ttt/bg.png')} style={styles.bg} resizeMode="cover">
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backText}>BACK</Text>
        </Pressable>

        <Text style={styles.eyebrow}>TIC TAC TOE</Text>
        <Text style={styles.title}>POLICY</Text>
        <View style={styles.divider} />
        <Text style={styles.subtitle}>How stakes, matches, and results are handled.</Text>

        <Section
          title="Stake handling"
          body="The stake you choose before a match is the amount attached to that game. The backend should save it, verify it, and use it for settlement."
        />
        <Section
          title="Match results"
          body="The winner, draw, or timeout result should come from the server. The client only shows the result after the backend confirms it."
        />
        <Section
          title="Fair play"
          body="Moves, turns, and AFK warnings should be tracked so the game can be replayed or checked later if there is a dispute."
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4,10,42,0.5)',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  backButton: {
    alignSelf: 'flex-start',
    height: 30,
    minWidth: 78,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(120,180,255,0.26)',
    backgroundColor: 'rgba(8,18,58,0.32)',
    justifyContent: 'center',
    marginBottom: 26,
  },
  backText: {
    color: 'rgba(194,220,255,0.88)',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
  },
  eyebrow: {
    color: 'rgba(150,195,255,0.65)',
    fontSize: 11,
    letterSpacing: 4,
    fontWeight: '800',
  },
  title: {
    color: '#ffffff',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 4,
    marginTop: 2,
    textShadowColor: 'rgba(80,160,255,0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  divider: {
    width: 56,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(100,160,255,0.55)',
    marginTop: 14,
    marginBottom: 14,
  },
  subtitle: {
    color: 'rgba(150,195,255,0.78)',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 18,
  },
  section: {
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(120,180,255,0.35)',
    backgroundColor: 'rgba(10,28,86,0.9)',
    padding: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#c2dcff',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2.4,
    marginBottom: 8,
  },
  sectionBody: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.92,
  },
});
