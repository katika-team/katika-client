import { router } from "expo-router";
import React from "react";
import { Dimensions, Image, ImageBackground, TouchableOpacity, View, Text } from "react-native";

const { width, height } = Dimensions.get('window');
export default function Info(){
    return (
        <ImageBackground
            source={require('@/assets/checkers/checkers.png')}
            style={{flex:1}}
            resizeMode="cover"
            >
            <View style={{zIndex:0}}>
              {/*first image up */}
              <Image source={require('@/assets/checkers/band.png')} style={{top: -height *0.19,zIndex:0, 
                height: height * 1.4,left:0,right:4, opacity:1.00}} />
            </View>
            <View  style={{position:'absolute',top: height * 0.15, zIndex:10, justifyContent:'center', width:'100%'}}>
                {/* header */}
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Image source={require('@/assets/checkers/info.png')} style={{zIndex:10, resizeMode:'contain', height:34}} />
                    <Text style={{color:'white',fontSize:22, fontWeight:'600',textAlign:'center',paddingTop:4}}>
                        Information center
                    </Text>
                </View>
                <Text style={{color:'white',fontSize:15, fontWeight:'400',textAlign:'center',paddingTop:30,paddingHorizontal:3, letterSpacing:1,  padding:2, lineHeight:29}}>
                    🎮 Welcome to Checkers! Get ready to test your strategy and outsmart your opponent as you 
                    move your pieces diagonally across the board, capturing enemies by jumping over them and aiming to dominate
                     every square. Reach the other side to crown your piece a KING 👑, 
                     unlocking the power to move both forward and backward and turning the tide of the game. 
                     Think ahead because every move matters, capture whenever you get the chance, 
                     and protect your back row to stop your opponent from gaining easy kings. Controlling the center of the board
                      gives you more options and a stronger position, while smart planning and patience will lead you to victory. 
                      Outplay, outthink, and rise to become the ultimate
                     Checkers champion 🏆
                </Text>
            </View>
            
            {/* learn to play button */}
            <TouchableOpacity onPress={()=>router.push('/home')} style={{position:'absolute',width:'100%', marginTop:height * 0.82, paddingHorizontal: 20, alignItems:'center'}}>
                    <Image source={require('@/assets/checkers/btn.png')} style={{zIndex:10, resizeMode:'contain', width: '100%'}} />
                    <Text style={{color:'white',fontSize:19, fontWeight:'700',textAlign:'center',paddingTop:24, position:'absolute',zIndex:10}}>
                        Return Back
                    </Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}