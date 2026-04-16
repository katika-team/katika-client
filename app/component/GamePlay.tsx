import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BetModal from "./Modal";
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const GamePlay = () => {
  const [visible, setVisible] = useState(false);
  const [selectedBet, setSelectedBet] = useState("");
  const [modalType, setmodalType] = useState("");

  return (
    <View
      style={{
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: height * 0.98,
        justifyContent: 'space-between',
        width: width * 0.90,
        alignSelf: 'center',
      }}
    >
      {/* BACK */}
      <TouchableOpacity
        onPress={() => {
          setmodalType('back');
          setVisible(true);
        }}
        style={{ flexDirection: 'column', alignItems: 'center' }}
      >
        <Image source={require('@/assets/checkers/back.png')} style={{ width: 40, height: 40 }} />
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', top: 3 }}>
          Back
        </Text>
      </TouchableOpacity>

      {/* HINT */}
      <TouchableOpacity
        onPress={() => {
          setmodalType('hint');
          setVisible(true);
        }}
        style={{ flexDirection: 'column', alignItems: 'center' }}
      >
        <Image source={require('@/assets/checkers/play.png')} style={{ width: 40, height: 40 }} />
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', top: 3 }}>
          Hint
        </Text>
      </TouchableOpacity>

      {/* DRAW */}
      <TouchableOpacity
        onPress={() => {
        setmodalType('draw');
        setVisible(true);
        }}
        style={{ flexDirection: 'column', alignItems: 'center' }}
      >
        <Image source={require('@/assets/checkers/resign.png')} style={{ width: 40, height: 40 }} />
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', top: 3 }}>
          Draw
        </Text>
      </TouchableOpacity>

      {/* SETTING */}
      <TouchableOpacity
        onPress={() => {
          setmodalType('setting');
          setVisible(true);
        }}
        style={{ flexDirection: 'column', alignItems: 'center' }}
      >
        <Image source={require('@/assets/checkers/setting.png')} style={{ width: 40, height: 40 }} />
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '500', top: 3 }}>
          Setting
        </Text>
      </TouchableOpacity>

      {/* ✅ SINGLE MODAL ONLY */}
      <BetModal
        visible={visible}
        amount={selectedBet}
        onClose={() => setVisible(false)}
        onConfirm={() => {
          setVisible(false);
          router.push('/checkers/home');
        }}
        type={modalType}
      />

    </View>
  )
}

export default GamePlay;