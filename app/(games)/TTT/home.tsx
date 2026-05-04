import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import SettingsModal from './components/SettingsModal';

const { width } = Dimensions.get('window');

// ── Icons ────────────────────────────────────────────────────────────

const OnlineIcon = ({ color }) => (
  <View style={[iconStyles.circle, { borderColor: color }]}>
    <View style={[iconStyles.hLine, { backgroundColor: color }]} />
    <View style={[iconStyles.vLine, { backgroundColor: color }]} />
  </View>
);

const LearnIcon = ({ color }) => (
  <View style={iconStyles.wrapper}>
    <View style={[iconStyles.triangle, { borderBottomColor: color }]} />
    <View style={[iconStyles.capLine, { backgroundColor: color }]} />
  </View>
);

const SettingsIcon = ({ color }) => (
  <View style={[iconStyles.gear, { borderColor: color }]}>
    <View style={[iconStyles.gearInner, { borderColor: color }]} />
    <View style={[iconStyles.gearDot, { backgroundColor: color }]} />
  </View>
);

// ── Animated Live Dot ────────────────────────────────────────────────

const LiveDot = () => {
  const blink = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blink, { toValue: 0.1, duration: 700, useNativeDriver: true }),
        Animated.timing(blink, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return <Animated.View style={[styles.badgeDot, { opacity: blink }]} />;
};

// ── Button ───────────────────────────────────────────────────────────

const TicTacToeButton = ({ label, variant = 'primary', icon, badge, onPress, delay = 0 }) => {
  const entranceOpacity = useRef(new Animated.Value(0)).current;
  const entranceY = useRef(new Animated.Value(30)).current;
  const pressScale = useRef(new Animated.Value(1)).current;
  const pressOverlay = useRef(new Animated.Value(0)).current;
  const borderGlow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(entranceOpacity, {
        toValue: 1, duration: 500, delay, useNativeDriver: true,
      }),
      Animated.spring(entranceY, {
        toValue: 0, tension: 55, friction: 9, delay, useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(pressScale, {
        toValue: 0.96, tension: 250, friction: 12, useNativeDriver: true,
      }),
      Animated.timing(pressOverlay, {
        toValue: 1, duration: 60, useNativeDriver: true,
      }),
      Animated.timing(borderGlow, {
        toValue: 1, duration: 60, useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(pressScale, {
        toValue: 1, tension: 250, friction: 12, useNativeDriver: true,
      }),
      Animated.timing(pressOverlay, {
        toValue: 0, duration: 180, useNativeDriver: true,
      }),
      Animated.timing(borderGlow, {
        toValue: 0, duration: 250, useNativeDriver: true,
      }),
    ]).start();
  };

  // Per-variant config
  const config = {
    primary: {
      base: styles.btnPrimary,
      label: styles.labelPrimary,
      iconColor: '#ffffff',
      overlayColor: 'rgba(150,200,255,0.2)',
      corners: true,
    },
    secondary: {
      base: styles.btnSecondary,
      label: styles.labelSecondary,
      iconColor: '#a8d0ff',
      overlayColor: 'rgba(80,140,255,0.22)',
      corners: true,
    },
    ghost: {
      base: styles.btnGhost,
      label: styles.labelGhost,
      iconColor: '#7eaaee',
      overlayColor: 'rgba(60,110,220,0.18)',
      corners: false,
    },
  }[variant];

  return (
    <Animated.View
      style={{
        opacity: entranceOpacity,
        transform: [{ translateY: entranceY }],
        width: width * 0.78,
        marginVertical: 9,
        overflow: 'visible',
      }}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={styles.pressable}
      >
        <Animated.View
          style={[
            styles.btn,
            config.base,
            { transform: [{ scale: pressScale }] },
          ]}
        >
          {/* Animated press overlay */}
          <Animated.View
            style={[
              styles.pressOverlay,
              { backgroundColor: config.overlayColor, opacity: pressOverlay },
            ]}
          />

          {/* Corner accents */}
          {config.corners && (
            <>
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
            </>
          )}

          {/* Live badge */}
          {badge && (
            <View style={styles.badge}>
              <LiveDot />
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}

          {/* Row content */}
          <View style={styles.btnContent}>
            <View style={styles.iconWrap}>
              {React.cloneElement(icon, { color: config.iconColor })}
            </View>
            <Text style={[styles.btnLabel, config.label]}>{label}</Text>
          </View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

// ── Home Screen ──────────────────────────────────────────────────────

export default function HomeScreen({ navigation }) {
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerY = useRef(new Animated.Value(-30)).current;
  const [settingsVisible, setSettingsVisible] = useState(false);
  const { openSettings } = useLocalSearchParams();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(headerY, { toValue: 0, tension: 45, friction: 9, useNativeDriver: true }),
    ]).start();
  }, []);

  // Open settings modal if returning from policy/gameinfo
  useEffect(() => {
    if (openSettings === 'true') {
      setSettingsVisible(true);
      // Clear the parameter by replacing the route
      router.setParams({ openSettings: undefined });
    }
  }, [openSettings]);

  return (
    <ImageBackground
      source={require('@/assets/ttt/bg.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.overlay} />
      <View style={styles.glowBloom} />

      <View style={styles.container}>

        {/* Header */}
        <Animated.View
          style={{
            opacity: headerOpacity,
            transform: [{ translateY: headerY }],
            alignItems: 'center',
            marginBottom: 48,
          }}
        >
          <Text style={styles.subtitle}>A GAME OF WITS</Text>
          <View style={styles.logoRow}>
            <Text style={styles.logoWhite}>TIC</Text>
            <Text style={styles.logoBlue}>TAC</Text>
            <Text style={styles.logoWhite}>TOE</Text>
          </View>
          <View style={styles.divider} />
        </Animated.View>

        {/* Buttons */}
        <TicTacToeButton
          label="PLAY ONLINE"
          variant="primary"
          badge="LIVE"
          delay={200}
          icon={<OnlineIcon color="#fff" />}
          onPress={() => router.push('/TTT/stake')}
        />

        <TicTacToeButton
          label="LEARN TO PLAY"
          variant="secondary"
          delay={320}
          icon={<LearnIcon color="#a8d0ff" />}
          onPress={() => navigation?.navigate('Learn')}
        />

        <TicTacToeButton
          label="SETTINGS"
          variant="ghost"
          delay={440}
          icon={<SettingsIcon color="#7eaaee" />}
          onPress={() => setSettingsVisible(true)}
        />

        <Text style={styles.footer}>v1.0.0  ·  Tic Tac Toe</Text>
      </View>

      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
      />
    </ImageBackground>
  );
}

// ── Main Styles ──────────────────────────────────────────────────────

const styles = StyleSheet.create({
  bg: { flex: 1 },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4,10,42,0.48)',
  },

  glowBloom: {
    position: 'absolute',
    top: '20%',
    alignSelf: 'center',
    width: 340,
    height: 340,
    borderRadius: 170,
    backgroundColor: 'transparent',
    shadowColor: '#3060ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 100,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  subtitle: {
    color: 'rgba(150,195,255,0.65)',
    fontSize: 11,
    letterSpacing: 5,
    fontWeight: '700',
    marginBottom: 10,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoWhite: {
    color: '#ffffff',
    fontSize: 46,
    fontWeight: '900',
    letterSpacing: 2,
    textShadowColor: 'rgba(80,140,255,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  logoBlue: {
    color: '#6ab0ff',
    fontSize: 46,
    fontWeight: '900',
    letterSpacing: 2,
    textShadowColor: 'rgba(80,160,255,1)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 28,
  },
  divider: {
    marginTop: 16,
    width: 56,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(100,160,255,0.45)',
  },

  // ── Buttons ──
  btn: {
    height: 64,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'visible',
  },

  pressable: {
    overflow: 'visible',
  },

  // Primary — bright solid blue
  btnPrimary: {
    backgroundColor: 'rgba(45,105,250,0.72)',
    borderWidth: 1.5,
    borderColor: 'rgba(120,180,255,0.9)',
    shadowColor: '#4080ff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 14,
  },

  // Secondary — clearly visible with its own strong blue identity
  btnSecondary: {
    backgroundColor: 'rgba(27, 68, 181, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(90,145,255,0.75)',
    shadowColor: '#2050cc',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 9,
  },

  // Ghost — no longer invisible; dark blue tinted, clear border
  btnGhost: {
    backgroundColor: 'rgba(21, 44, 130, 0.67)',
    borderWidth: 1.5,
    borderColor: 'rgba(70,115,210,0.55)',
    shadowColor: '#1a3a99',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },

  pressOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 6,
  },

  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 22,
  },

  iconWrap: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 3.5,
  },

  // Label colors — all bright and clear
  labelPrimary: {
    color: '#ffffff',
    textShadowColor: 'rgba(140,200,255,0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  labelSecondary: {
    color: '#c2dcff',
  },
  labelGhost: {
    color: '#8ab4ee',
  },

  // Corner accents
  corner: { position: 'absolute', width: 10, height: 10 },
  cornerTL: {
    top: 0, left: 0,
    borderTopWidth: 2, borderLeftWidth: 2,
    borderColor: 'rgba(140,190,255,0.8)',
  },
  cornerTR: {
    top: 0, right: 0,
    borderTopWidth: 2, borderRightWidth: 2,
    borderColor: 'rgba(140,190,255,0.8)',
  },
  cornerBL: {
    bottom: 0, left: 0,
    borderBottomWidth: 2, borderLeftWidth: 2,
    borderColor: 'rgba(140,190,255,0.8)',
  },
  cornerBR: {
    bottom: 0, right: 0,
    borderBottomWidth: 2, borderRightWidth: 2,
    borderColor: 'rgba(140,190,255,0.8)',
  },

  // Badge
  badge: {
    position: 'absolute',
    top: -6,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2860ff',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 3,
    gap: 5,
    shadowColor: '#2255ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 7,
  },
  badgeDot: {
    width: 5, height: 5,
    borderRadius: 3,
    backgroundColor: '#ffffff',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  footer: {
    marginTop: 42,
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 11,
    letterSpacing: 3,
  },
});

// ── Icon Styles ──────────────────────────────────────────────────────

const iconStyles = StyleSheet.create({
  circle: {
    width: 18, height: 18,
    borderRadius: 9, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },
  hLine: { position: 'absolute', width: 18, height: 1.5 },
  vLine: { position: 'absolute', width: 1.5, height: 18 },

  wrapper: { alignItems: 'center', justifyContent: 'center', width: 18, height: 18 },
  triangle: {
    width: 0, height: 0,
    borderLeftWidth: 9, borderRightWidth: 9, borderBottomWidth: 10,
    borderLeftColor: 'transparent', borderRightColor: 'transparent',
  },
  capLine: { width: 18, height: 1.5, marginTop: 2 },

  gear: {
    width: 18, height: 18,
    borderRadius: 9, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },
  gearInner: {
    position: 'absolute',
    width: 10, height: 10,
    borderRadius: 5, borderWidth: 1,
  },
  gearDot: { width: 4, height: 4, borderRadius: 2 },
});
