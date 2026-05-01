import Slider from '@react-native-community/slider';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, Modal as RNModal, StyleSheet, Text, View } from 'react-native';

interface CheckersSettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

function VolumeControl({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
}) {
  return (
    <View style={styles.volumeControl}>
      <View style={styles.volumeLabel}>
        <Image source={require('@/assets/checkers/vol.png')} style={styles.volumeIcon} />
        <Text style={styles.volumeText}>{label}</Text>
        <Text style={styles.volumeValue}>{Math.round(value * 100)}%</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={value}
        onValueChange={onValueChange}
        minimumTrackTintColor="rgba(255, 16, 16, 0.85)"
        maximumTrackTintColor="rgba(255, 255, 255, 0.25)"
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
  icon: any;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.navButton, pressed && styles.navButtonPressed]}>
      <Image source={icon} style={styles.navIcon} />
      <Text style={styles.navButtonText}>{label}</Text>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

export default function CheckersSettingsModal({ visible, onClose }: CheckersSettingsModalProps) {
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [soundEffectsVolume, setSoundEffectsVolume] = useState(0.7);
  const [musicVolume, setMusicVolume] = useState(0.6);

  return (
    <RNModal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.panel}>
          {/* Decorative corners */}
          <View style={styles.cornerTL} />
          <View style={styles.cornerTR} />
          <View style={styles.cornerBL} />
          <View style={styles.cornerBR} />

          {/* Header */}
          <View style={styles.header}>
            <Image source={require('@/assets/checkers/setting.png')} style={styles.headerIcon} />
            <Text style={styles.title}>SETTINGS</Text>
          </View>
          <View style={styles.divider} />

          {/* Section 1: Volume Control */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Image source={require('@/assets/checkers/vol.png')} style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>VOLUME CONTROL</Text>
            </View>
            <VolumeControl 
              label="Master Volume" 
              value={masterVolume} 
              onValueChange={setMasterVolume} 
            />
            <VolumeControl 
              label="Music" 
              value={musicVolume} 
              onValueChange={setMusicVolume} 
            />
            <VolumeControl 
              label="Sound Effects" 
              value={soundEffectsVolume} 
              onValueChange={setSoundEffectsVolume} 
            />
          </View>

          {/* Section 2: Policy */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Image source={require('@/assets/checkers/policy.png')} style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>POLICY</Text>
            </View>
            <NavButton
              label="View Privacy Policy"
              icon={require('@/assets/checkers/policy.png')}
              onPress={() => {
                onClose();
                router.push('/checkers/policies');
              }}
            />
          </View>

          {/* Section 3: Game Info */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Image source={require('@/assets/checkers/info.png')} style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>GAME INFO</Text>
            </View>
            <NavButton
              label="How to Play & Rules"
              icon={require('@/assets/checkers/info.png')}
              onPress={() => {
                onClose();
                router.push('/checkers/info');
              }}
            />
          </View>

          {/* Close Button */}
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
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  panel: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 16, 16, 0.8)',
    backgroundColor: 'rgba(20, 10, 10, 0.95)',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 18,
    overflow: 'hidden',
    shadowColor: '#ff1010',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 24,
    elevation: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 8,
  },
  headerIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  title: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 16, 16, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  divider: {
    width: 56,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255, 16, 16, 0.6)',
    marginTop: 14,
    marginBottom: 16,
    alignSelf: 'center',
  },
  section: {
    borderWidth: 1,
    borderColor: 'rgba(255, 16, 16, 0.3)',
    backgroundColor: 'rgba(40, 20, 20, 0.4)',
    borderRadius: 6,
    padding: 14,
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  sectionIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  sectionTitle: {
    color: '#ffcccc',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2.4,
  },
  volumeControl: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.12)',
  },
  volumeLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  volumeIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  volumeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  volumeValue: {
    color: 'rgba(255, 204, 204, 0.9)',
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
    borderColor: 'rgba(255, 16, 16, 0.4)',
    backgroundColor: 'rgba(255, 16, 16, 0.6)',
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
  navIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  navButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    flex: 1,
  },
  chevron: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 24,
    fontWeight: '300',
  },
  closeButton: {
    alignSelf: 'center',
    minWidth: 132,
    minHeight: 40,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 16, 16, 0.3)',
    backgroundColor: 'rgba(40, 20, 20, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  closeButtonPressed: {
    opacity: 0.86,
  },
  closeButtonText: {
    color: 'rgba(255, 204, 204, 0.9)',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2.4,
  },
  cornerTL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 14,
    height: 14,
    borderTopWidth: 2.5,
    borderLeftWidth: 2.5,
    borderColor: 'rgba(255, 100, 100, 0.9)',
  },
  cornerTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 14,
    height: 14,
    borderTopWidth: 2.5,
    borderRightWidth: 2.5,
    borderColor: 'rgba(255, 100, 100, 0.9)',
  },
  cornerBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 14,
    height: 14,
    borderBottomWidth: 2.5,
    borderLeftWidth: 2.5,
    borderColor: 'rgba(255, 100, 100, 0.9)',
  },
  cornerBR: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderBottomWidth: 2.5,
    borderRightWidth: 2.5,
    borderColor: 'rgba(255, 100, 100, 0.9)',
  },
});
