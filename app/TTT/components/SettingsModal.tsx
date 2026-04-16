import React, { useState } from 'react';
import { Image, Modal as RNModal, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SettingsModal({ visible, onClose }: SettingsModalProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [showHints, setShowHints] = useState(false);

  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Image source={require('@/assets/ttt/settings.png')} style={styles.headerIcon} />
            <Text style={styles.title}>Game Settings</Text>
          </View>

          {/* Settings Options */}
          <View style={styles.settingsContainer}>
            {/* Sound Effects */}
            <View style={styles.settingRow}>
              <View style={styles.settingLabel}>
                <Text style={styles.settingIcon}>🔊</Text>
                <Text style={styles.settingText}>Sound Effects</Text>
              </View>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: '#767577', true: '#9B59B6' }}
                thumbColor={soundEnabled ? '#fff' : '#f4f3f4'}
              />
            </View>

            {/* Background Music */}
            <View style={styles.settingRow}>
              <View style={styles.settingLabel}>
                <Text style={styles.settingIcon}>🎵</Text>
                <Text style={styles.settingText}>Background Music</Text>
              </View>
              <Switch
                value={musicEnabled}
                onValueChange={setMusicEnabled}
                trackColor={{ false: '#767577', true: '#9B59B6' }}
                thumbColor={musicEnabled ? '#fff' : '#f4f3f4'}
              />
            </View>

            {/* Vibration */}
            <View style={styles.settingRow}>
              <View style={styles.settingLabel}>
                <Text style={styles.settingIcon}>📳</Text>
                <Text style={styles.settingText}>Vibration</Text>
              </View>
              <Switch
                value={vibrationEnabled}
                onValueChange={setVibrationEnabled}
                trackColor={{ false: '#767577', true: '#9B59B6' }}
                thumbColor={vibrationEnabled ? '#fff' : '#f4f3f4'}
              />
            </View>

            {/* Show Hints */}
            <View style={styles.settingRow}>
              <View style={styles.settingLabel}>
                <Text style={styles.settingIcon}>💡</Text>
                <Text style={styles.settingText}>Show Hints</Text>
              </View>
              <Switch
                value={showHints}
                onValueChange={setShowHints}
                trackColor={{ false: '#767577', true: '#9B59B6' }}
                thumbColor={showHints ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.saveButtonText}>Save & Close</Text>
            </TouchableOpacity>
          </View>
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
  },
  modalContainer: {
    backgroundColor: '#1a1a2e',
    width: '90%',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#9B59B6',
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(155, 89, 182, 0.3)',
    marginHorizontal: 20,
  },
  headerIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    color: '#9B59B6',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  settingsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  settingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  saveButton: {
    backgroundColor: '#9B59B6',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#9B59B6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
