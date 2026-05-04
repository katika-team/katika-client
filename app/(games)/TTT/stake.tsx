import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import SearchModal from '../../../component/Searchmodal';

const { width } = Dimensions.get('window');

type BackButtonProps = {
  onPress: () => void;
  delay?: number;
};

type CoinIconProps = {
  color: string;
};

type StakeCardProps = {
  amount: number;
  selected: boolean;
  onPress: () => void;
  delay?: number;
};

type ProceedButtonProps = {
  onPress: () => void;
  enabled: boolean;
  delay?: number;
};

// ── Coin Icon ────────────────────────────────────────────────────────

const CoinIcon = ({ color }: CoinIconProps) => (
  <View style={[iconStyles.coin, { borderColor: color }]}>
    <Text style={[iconStyles.coinText, { color }]}>₦</Text>
  </View>
);

// ── Stake Card ───────────────────────────────────────────────────────

const StakeCard = ({ amount, selected, onPress, delay = 0 }: StakeCardProps) => {
  const entranceOpacity = useRef(new Animated.Value(0)).current;
  const entranceY = useRef(new Animated.Value(30)).current;
  const pressScale = useRef(new Animated.Value(1)).current;
  const pressOverlay = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    if (selected) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
          Animated.timing(glowAnim, { toValue: 0.4, duration: 900, useNativeDriver: true }),
        ])
      ).start();
    } else {
      glowAnim.stopAnimation();
      glowAnim.setValue(0);
    }
  }, [selected]);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(pressScale, { toValue: 0.96, tension: 250, friction: 12, useNativeDriver: true }),
      Animated.timing(pressOverlay, { toValue: 1, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(pressScale, { toValue: 1, tension: 250, friction: 12, useNativeDriver: true }),
      Animated.timing(pressOverlay, { toValue: 0, duration: 180, useNativeDriver: true }),
    ]).start();
  };

  const cardStyle = selected ? styles.cardSelected : styles.cardIdle;

  return (
    <Animated.View
      style={{
        opacity: entranceOpacity,
        transform: [{ translateY: entranceY }],
        width: (width * 0.78 - 12) / 2,
        marginVertical: 6,
      }}
    >
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
        <Animated.View style={[styles.card, cardStyle, { transform: [{ scale: pressScale }] }]}>

          {/* Press overlay */}
          <Animated.View
            style={[
              styles.pressOverlay,
              {
                backgroundColor: selected
                  ? 'rgba(150,200,255,0.2)'
                  : 'rgba(80,140,255,0.22)',
                opacity: pressOverlay,
              },
            ]}
          />

          {/* Corner accents */}
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />

          {/* Selected checkmark */}
          {selected && (
            <View style={styles.checkBadge}>
              <Text style={styles.checkText}>✓</Text>
            </View>
          )}

          <View style={styles.cardContent}>
            <CoinIcon color={selected ? '#ffffff' : '#a8d0ff'} />
            <Text style={[styles.cardAmount, selected ? styles.amountSelected : styles.amountIdle]}>
              {amount.toLocaleString()}
            </Text>
            <Text style={[styles.cardSub, selected ? styles.subSelected : styles.subIdle]}>
              COINS
            </Text>
          </View>

        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

// ── Proceed Button ───────────────────────────────────────────────────

const ProceedButton = ({ onPress, enabled, delay = 0 }: ProceedButtonProps) => {
  const entranceOpacity = useRef(new Animated.Value(0)).current;
  const entranceY = useRef(new Animated.Value(30)).current;
  const pressScale = useRef(new Animated.Value(1)).current;
  const pressOverlay = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(entranceOpacity, { toValue: 1, duration: 500, delay, useNativeDriver: true }),
      Animated.spring(entranceY, { toValue: 0, tension: 55, friction: 9, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    if (!enabled) return;
    Animated.parallel([
      Animated.spring(pressScale, { toValue: 0.96, tension: 250, friction: 12, useNativeDriver: true }),
      Animated.timing(pressOverlay, { toValue: 1, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(pressScale, { toValue: 1, tension: 250, friction: 12, useNativeDriver: true }),
      Animated.timing(pressOverlay, { toValue: 0, duration: 180, useNativeDriver: true }),
    ]).start();
  };

  return (
    <Animated.View
      style={{
        opacity: entranceOpacity,
        transform: [{ translateY: entranceY }],
        width: width * 0.78,
        marginTop: 10,
      }}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={enabled ? onPress : null}
      >
        <Animated.View
          style={[
            styles.btn,
            enabled ? styles.btnPrimary : styles.btnDisabled,
            { transform: [{ scale: pressScale }] },
          ]}
        >
          <Animated.View
            style={[
              styles.pressOverlay,
              { backgroundColor: 'rgba(150,200,255,0.2)', opacity: pressOverlay },
            ]}
          />
          {enabled && (
            <>
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
            </>
          )}
          <Text style={[styles.btnLabel, enabled ? styles.labelPrimary : styles.labelDisabled]}>
            PROCEED
          </Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

// ── Select Stake Screen ──────────────────────────────────────────────

const BackButton = ({ onPress, delay = 0 }: BackButtonProps) => {
  const entranceOpacity = useRef(new Animated.Value(0)).current;
  const entranceY = useRef(new Animated.Value(-12)).current;
  const pressScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(entranceOpacity, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
      Animated.spring(entranceY, { toValue: 0, tension: 55, friction: 9, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(pressScale, { toValue: 0.96, tension: 250, friction: 12, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressScale, { toValue: 1, tension: 250, friction: 12, useNativeDriver: true }).start();
  };

  return (
    <Animated.View
      style={[
        styles.backWrap,
        {
          opacity: entranceOpacity,
          transform: [{ translateY: entranceY }],
        },
      ]}
    >
      <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View style={[styles.backBtn, { transform: [{ scale: pressScale }] }]}>
          <View style={styles.backMark} />
          <Text style={styles.backText}>BACK</Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default function SelectStakeScreen() {
  // Stores the stake amount selected by the user before matchmaking starts.
  const [selectedStake, setSelectedStake] = useState<number | null>(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerY = useRef(new Animated.Value(-30)).current;

  const stakes = [500, 1000, 3000, 5000];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.spring(headerY, { toValue: 0, tension: 45, friction: 9, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <ImageBackground
      source={require('@/assets/ttt/bg.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.overlay} />
      <View style={styles.glowBloom} />

      <BackButton onPress={() => router.replace('/TTT/home')} delay={120} />

      <View style={styles.container}>

        {/* Header */}
        <Animated.View
          style={{
            opacity: headerOpacity,
            transform: [{ translateY: headerY }],
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <Text style={styles.subtitle}>TIC TAC TOE</Text>
          <Text style={styles.logoBlue}>STAKE</Text>
          <View style={styles.divider} />
          <Text style={styles.hint}>Choose the amount you want to play with</Text>
        </Animated.View>

        {/* Stake Grid */}
        <View style={styles.grid}>
          {stakes.map((amount, i) => (
            <StakeCard
              key={amount}
              amount={amount}
              selected={selectedStake === amount}
              onPress={() => setSelectedStake(amount)}
              delay={180 + i * 100}
            />
          ))}
        </View>

        {/* Selected label */}
        <Animated.View style={{ opacity: headerOpacity, marginVertical: 16, alignItems: 'center' }}>
          {selectedStake ? (
            <Text style={styles.selectedLabel}>
              STAKE: <Text style={styles.selectedAmount}>{selectedStake.toLocaleString()} COINS</Text>
            </Text>
          ) : (
            <Text style={styles.selectedLabel}>NO STAKE SELECTED</Text>
          )}
        </Animated.View>

        {/* Proceed Button */}
        <ProceedButton
          enabled={!!selectedStake}
          delay={600}
          onPress={() => setSearchVisible(true)}
        />

        <Text style={styles.footer}>v1.0.0  ·  Tic Tac Toe</Text>
      </View>

      <SearchModal
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
        nextRoute="/TTT/main"
        mode="session"
        betAmount={selectedStake ? String(selectedStake) : undefined}
      />
    </ImageBackground>
  );
}

// ── Styles ───────────────────────────────────────────────────────────

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

  backWrap: {
    position: 'absolute',
    top: 22,
    left: 18,
    zIndex: 20,
  },

  backBtn: {
    height: 30,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(120,180,255,0.28)',
    backgroundColor: 'rgba(8,18,58,0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    shadowColor: '#2050cc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },

  backMark: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6ab0ff',
    marginRight: 6,
  },

  backText: {
    color: 'rgba(194,220,255,0.85)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },

  subtitle: {
    color: 'rgba(150,195,255,0.65)',
    fontSize: 11,
    letterSpacing: 5,
    fontWeight: '700',
    marginBottom: 4,
  },

//   logoWhite: {
//     color: '#ffffff',
//     fontSize: 36,
//     fontWeight: '900',
//     letterSpacing: 2,
//     textShadowColor: 'rgba(80,140,255,0.5)',
//     textShadowOffset: { width: 0, height: 0 },
//     textShadowRadius: 20,
//   },

  logoBlue: {
    color: '#6ab0ff',
    fontSize: 46,
    fontWeight: '900',
    letterSpacing: 4,
    textShadowColor: 'rgba(80,160,255,1)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 28,
  },

  divider: {
    marginTop: 14,
    marginBottom: 10,
    width: 56,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(100,160,255,0.45)',
  },

  hint: {
    color: 'rgba(150,195,255,0.55)',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: '600',
  },

  // ── Grid ──
  grid: {
    width: width * 0.78,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // ── Card ──
  card: {
    height: 100,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },

  cardIdle: {
    backgroundColor: 'rgba(25,60,160,0.42)',
    borderWidth: 1.5,
    borderColor: 'rgba(90,145,255,0.55)',
    shadowColor: '#2050cc',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },

  cardSelected: {
    backgroundColor: 'rgba(45,105,250,0.72)',
    borderWidth: 1.5,
    borderColor: 'rgba(120,180,255,0.9)',
    shadowColor: '#4080ff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.7,
    shadowRadius: 18,
    elevation: 14,
  },

  cardContent: {
    alignItems: 'center',
    gap: 4,
  },

  cardAmount: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 6,
  },

  amountSelected: {
    color: '#ffffff',
    textShadowColor: 'rgba(140,200,255,0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },

  amountIdle: {
    color: '#c2dcff',
  },

  cardSub: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 3,
  },

  subSelected: { color: 'rgba(200,230,255,0.8)' },
  subIdle: { color: 'rgba(150,190,255,0.55)' },

  checkBadge: {
    position: 'absolute',
    top: 6,
    right: 8,
  },
  checkText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '900',
  },

  // ── Selected display ──
  selectedLabel: {
    color: 'rgba(150,195,255,0.65)',
    fontSize: 11,
    letterSpacing: 3,
    fontWeight: '700',
  },
  selectedAmount: {
    color: '#6ab0ff',
    textShadowColor: 'rgba(80,160,255,0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },

  // ── Proceed Button ──
  btn: {
    height: 64,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },

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

  btnDisabled: {
    backgroundColor: 'rgba(17,26,57,0.48)',
    borderWidth: 1.5,
    borderColor: 'rgba(70,115,210,0.3)',
    elevation: 0,
  },

  pressOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 6,
  },

  btnLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 3.5,
  },

  labelPrimary: {
    color: '#ffffff',
    textShadowColor: 'rgba(140,200,255,0.7)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },

  labelDisabled: {
    color: 'rgba(120,160,220,0.4)',
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

  footer: {
    marginTop: 32,
    color: 'rgba(255,255,255,1)',
    fontSize: 11,
    letterSpacing: 3,
  },
});

// ── Icon Styles ──────────────────────────────────────────────────────

const iconStyles = StyleSheet.create({
  coin: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinText: {
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 14,
  },
});
