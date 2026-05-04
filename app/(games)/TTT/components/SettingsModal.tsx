import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Modal as RNModal, StyleSheet, Text, View } from 'react-native';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

function VolumeControl({
  icon,
  label,
  value,
  onValueChange,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: number;
  onValueChange: (value: number) => void;
}) {
  return (
    <View style={styles.volumeControl}>
      <View style={styles.volumeLabel}>
        <Ionicons name={icon} size={18} color="#c2dcff" />
        <Text style={styles.volumeText}>{label}</Text>
        <Text style={styles.volumeValue}>{Math.round(value * 100)}%</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor="rgba(106,176,255,0.85)"
        maximumTrackTintColor="rgba(120,180,255,0.25)"
        thumbTintColor="#ffffff"
      />
    </View>
  );
}

function NavButton({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.navButton, pressed && styles.navButtonPressed]}>
      <Ionicons name={icon} size={20} color="#ffffff" />
      <Text style={styles.navButtonText}>{label}</Text>
      <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.6)" />
    </Pressable>
  );
}

export default function SettingsModal({ visible, onClose }: SettingsModalProps) {
  const [musicVolume, setMusicVolume] = useState(0.6);

  return (
    <RNModal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.panel}>
          <View style={styles.cornerTL} />
          <View style={styles.cornerTR} />
          <View style={styles.cornerBL} />
          <View style={styles.cornerBR} />

          <Text style={styles.eyebrow}>TIC TAC TOE</Text>
          <Text style={styles.title}>SETTINGS</Text>
          <View style={styles.divider} />

          {/* Section 1: Volume Customization */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="volume-high" size={16} color="#c2dcff" />
              <Text style={styles.sectionTitle}>VOLUME CONTROL</Text>
            </View>
            <VolumeControl 
              icon="musical-notes-outline" 
              label="Music" 
              value={musicVolume} 
              onValueChange={setMusicVolume} 
            />
          </View>

          {/* Section 2: Policy */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="shield-checkmark" size={16} color="#c2dcff" />
              <Text style={styles.sectionTitle}>POLICY</Text>
            </View>
            <NavButton
              label="View Privacy Policy"
              icon="document-text-outline"
              onPress={() => {
                onClose();
                router.push('/TTT/policy?fromSettings=true');
              }}
            />
          </View>

          {/* Section 3: Game Info */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="information-circle" size={16} color="#c2dcff" />
              <Text style={styles.sectionTitle}>GAME INFO</Text>
            </View>
            <NavButton
              label="How to Play & Rules"
              icon="game-controller-outline"
              onPress={() => {
                onClose();
                router.push('/TTT/gameinfo?fromSettings=true');
              }}
            />
          </View>

          <Pressable onPress={onClose} style={({ pressed }) => [styles.closeButton, pressed && styles.closeButtonPressed]}>
            <Text style={styles.closeButtonText}>CLOSE</Text>
          </Pressable>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(2,6,22,0.76)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  panel: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(120,180,255,0.85)',
    backgroundColor: 'rgba(10,28,86,0.95)',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 18,
    overflow: 'hidden',
    shadowColor: '#4080ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 18,
  },
  eyebrow: {
    color: 'rgba(150,195,255,0.65)',
    fontSize: 11,
    letterSpacing: 4,
    fontWeight: '800',
    textAlign: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 4,
    textShadowColor: 'rgba(80,160,255,0.85)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  divider: {
    width: 56,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(100,160,255,0.55)',
    marginTop: 14,
    marginBottom: 16,
    alignSelf: 'center',
  },
  section: {
    borderWidth: 1,
    borderColor: 'rgba(120,180,255,0.22)',
    backgroundColor: 'rgba(8,18,58,0.34)',
    borderRadius: 6,
    padding: 14,
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#c2dcff',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2.4,
  },
  volumeControl: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(120,180,255,0.12)',
  },
  volumeLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  volumeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  volumeValue: {
    color: 'rgba(194,220,255,0.8)',
    fontSize: 12,
    fontWeight: '700',
    minWidth: 40,
    textAlign: 'right',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  navButton: {
    minHeight: 50,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(120,180,255,0.32)',
    backgroundColor: 'rgba(45,105,250,0.64)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 12,
  },
  navButtonPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.98 }],
  },
  navButtonText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
  },
  closeButton: {
    alignSelf: 'center',
    minWidth: 132,
    minHeight: 40,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(120,180,255,0.25)',
    backgroundColor: 'rgba(8,18,58,0.42)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonPressed: {
    opacity: 0.86,
  },
  closeButtonText: {
    color: 'rgba(194,220,255,0.9)',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2.4,
  },
  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 12,
    height: 12,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'rgba(180,215,255,0.9)',
  },
  cornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: 'rgba(180,215,255,0.9)',
  },
  cornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 12,
    height: 12,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'rgba(180,215,255,0.9)',
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: 'rgba(180,215,255,0.9)',
  },
});
