import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import TicTacToeLoader from './components/TicTacToeLoader'
import { router } from 'expo-router'

export default function loading() {
  return (
    <ImageBackground
    source={require('@/assets/ttt/bg.png')}
        style={{flex:1, justifyContent:'center',alignItems:'center'}}
    >
        <View>
            <Image
                source={require('@/assets/ttt/ltext.png')}
                style={{width:200,height:55,alignSelf:'center',marginVertical:28}}
            />
            {/* <Image
                source={require('@/assets/ttt/board.png')}
                style={{width:200,height:50}}
            /> */}
            <TicTacToeLoader onFinish={() => router.replace('/TTT/home')} displayDuration={5000} />
            <Text style={{color:'white', fontSize:18, textAlign:'center',paddingVertical:24}}>Loading...</Text>
        </View>
    </ImageBackground>
  )
}

