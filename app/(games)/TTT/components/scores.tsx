import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Scores({score} : any) {
  return (
    <View style={{width:50, height: 50}}>
        <Image source={require('@/assets/ttt/scores.png')} style={{width: '100%', height: '100%'}}/>
        <Text style={{color:'white', fontSize:22, fontWeight:'500', position:'absolute', top:7, left:17}}>{score}</Text>
    </View>
  )
}