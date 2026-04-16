import React, { useEffect, useState } from "react";
import { Modal, View, Text, Image, Dimensions } from "react-native";
import { router } from "expo-router";
import GameButton from "./GameButton";

const { height } = Dimensions.get("window");

export default function SearchModal({
  visible,
  onClose,
  nextRoute = "/main"
}: any) {

  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    let interval: any;

    if (visible) {
      setTimeLeft(5);

      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);

            onClose?.();
            router.push(nextRoute); // 🔥 go to game screen

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [visible]);

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
            Finding Opponent...
          </Text>

          <Text style={{
            color: '#FFD700',
            fontSize: 32,
            fontWeight: 'bold',
            marginTop: 10
          }}>
            {timeLeft}s
          </Text>

          <Text style={{
            color: '#ddd',
            fontSize: 14,
            marginTop: 10,
            textAlign: 'center'
          }}>
            Please wait while we match you
          </Text>

          <View style={{ marginTop: 20 }}>
            <GameButton
              title="Cancel"
              onPress={onClose}
              width={140}
            />
          </View>

        </View>
      </View>
    </Modal>
  );
}