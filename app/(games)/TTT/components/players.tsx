import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Players({color, rank, name, direction, lightdistance, amount} : any) {
  return (
    <View style={{flexDirection:direction, gap:80, justifyContent:'space-between'}}>
        <View style={{flexDirection:"row", gap:22}}>
            <Image source={require('@/assets/checkers/user.png')} style={{width:60,height:60, borderRadius:50}}/>
            <View style={{width:20,height:20, borderRadius:40, backgroundColor:color, position:'absolute', top:40, left:lightdistance}}></View>
            <View style={{flexDirection:"column"}}>
                <Text style={{color:'white', fontSize:23, fontWeight:'500'}}>{name}</Text>
                <Text style={{color:'white', fontSize:16, fontWeight:'300'}}>{rank}</Text>
            </View>
        </View>
        <Text style={{color:'white', fontSize:22, fontWeight:'500', top:10}}>{amount} XAF</Text>
    </View>
  )
}