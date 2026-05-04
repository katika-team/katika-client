import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

interface BtnProps {
  onBackPress: () => void;
  onHintPress: () => void;
  onSettingsPress: () => void;
}

export default function Btn({ onBackPress, onHintPress, onSettingsPress }: BtnProps) {
  return (
    <View style={{flexDirection:'row',justifyContent:'center', gap:100}}>
        <TouchableOpacity 
          onPress={onBackPress}
          style={{width:60, height:60 , borderRadius:10}}
        >
            <Image 
              source={require('@/assets/ttt/back.png')} 
              style={{width:'100%', height:'100%'}} 
              resizeMode='cover'
            />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={onHintPress}
          style={{width:60, height:60 , borderRadius:10}}
        >
            <Image 
              source={require('@/assets/ttt/hint.png')} 
              style={{width:'100%', height:'100%'}} 
              resizeMode='cover'
            />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={onSettingsPress}
          style={{width:60, height:60 , borderRadius:10}}
        >
            <Image 
              source={require('@/assets/ttt/settings.png')} 
              style={{width:'100%', height:'100%'}} 
              resizeMode='cover'
            />
        </TouchableOpacity>
    </View>
  )
}