import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import Btn from './components/btn'
import Modal from './components/Modal'
import Players from './components/players'
import Scores from './components/scores'
import SettingsModal from './components/SettingsModal'
import SearchModal from '../component/Searchmodal'

export default function index() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [modalType, setModalType] = useState<'back' | 'hint'>('back');

  const handleBackPress = () => {
    setModalType('back');
    setModalVisible(true);
  };

  const handleHintPress = () => {
    setModalType('hint');
    setModalVisible(true);
  };

  const handleSettingsPress = () => {
    setSettingsVisible(true);
  };

  const handleModalYes = () => {
    setModalVisible(false);
    if (modalType === 'back') {
      router.back();
    } else if (modalType === 'hint') {
      Alert.alert('Hint', 'Try the center square for better control!');
    }
  };

  const handleModalNo = () => {
    setModalVisible(false);
  };

  const handleSettingsClose = () => {
    setSettingsVisible(false);
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'back':
        return 'Are you sure you want to go back?';
      case 'hint':
        return 'Do you want to see a hint? it will cost 20 XAF';
      default:
        return '';
    }
  };

  return (
   <ImageBackground
    source={require('@/assets/ttt/bg.png')}
    resizeMode='cover'
    style={{flex:1, paddingTop:65, paddingHorizontal:2}}
   >
    <View style={{flexDirection:'row',justifyContent:'space-between',gap:3, paddingHorizontal:10}}>
      {/*player 1 */}
      <Players 
      color="red" 
      name="Ester Victory"  
      rank="beginner"
      direction= "row" 
      lightdistance = {35}
      amount = {1000}
      />
    </View>
    <View style={{width:'96%',marginTop:19, height:'12%', borderRadius: 2, position:'relative', overflow:'hidden', alignSelf:'center', justifyContent:'center'}}>
      <Image source={require('@/assets/ttt/frame.png')} style={{width:'100%', height:'100%'}} resizeMode='stretch'/>
      <View style={{flexDirection:'row', position:'absolute', top:11, width:'100%', gap:100, justifyContent:'center'}}>
        <Image source={require('@/assets/ttt/cross.png')} style={{top:21}}/>
        <View style={{flexDirection:"column"}}>
          <Image source={require('@/assets/ttt/timer.png')} style={{left:8}}/>
          <Text style={{color:'white', fontSize:14, fontWeight:'500', top:8}}>12:36:02</Text>
        </View>
        <Image source={require('@/assets/ttt/circle.png')} style={{top:21}}/>
      </View>
    </View>
    <View style={{flexDirection:'row',justifyContent:'space-between', paddingVertical:13, alignItems:'center', paddingHorizontal:12
    }}>
      <Scores score={3} />
      <Scores score="X" />
      <Scores score={3} />
    </View>

    {/* game board */}
    <View style={{width:'100%',height:'43%', position: 'relative'}}>
      <Image source={require('@/assets/ttt/board.png')} style={{width:'100%', height:'100%'}} resizeMode='contain'/>
      
      {/* Play Live Button Overlay */}
      <TouchableOpacity
        onPress={() => setSearchVisible(true)}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: [{ translateX: -75 }, { translateY: -25 }],
          backgroundColor: 'rgba(76, 175, 80, 0.9)',
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 25,
          borderWidth: 2,
          borderColor: '#4CAF50'
        }}
      >
        <Text style={{
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          🎮 Play Live
        </Text>
      </TouchableOpacity>
    </View>

    <View style={{top:22, paddingHorizontal:10}}>
      <Players 
      color="green" 
      name="Michael"  
      rank="borice"
      direction= "row" 
      lightdistance = {35}
      amount = {1000}
      />
    </View>
    <View style={{marginTop:50}}>
      <Btn 
        onBackPress={handleBackPress}
        onHintPress={handleHintPress}
        onSettingsPress={handleSettingsPress}
      />
    </View>

    <Modal
      visible={modalVisible}
      title={getModalTitle()}
      onYes={handleModalYes}
      onNo={handleModalNo}
    />

    <SettingsModal
      visible={settingsVisible}
      onClose={handleSettingsClose}
    />

    <SearchModal
      visible={searchVisible}
      onClose={() => setSearchVisible(false)}
      nextRoute="/TTT/main"
      mode="session"
    />
    
  </ImageBackground>
  )
}