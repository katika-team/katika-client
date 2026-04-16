import React from 'react';
import { Image, Modal as RNModal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ModalProps {
  visible: boolean;
  title: string;
  onYes: () => void;
  onNo: () => void;
}

export default function Modal({ visible, title, onYes, onNo }: ModalProps) {
  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onNo}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={onYes}
              activeOpacity={0.7}
            >
              <Image 
                source={require('@/assets/ttt/yes.png')} 
                style={styles.buttonImage} 
                resizeMode='contain'
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={onNo}
              activeOpacity={0.7}
            >
              <Image 
                source={require('@/assets/ttt/no.png')} 
                style={styles.buttonImage} 
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </RNModal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    width: '85%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    color: 'white',
    fontSize: 23,
    fontWeight: '500',
    paddingVertical: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  button: {
    width: 120,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
});