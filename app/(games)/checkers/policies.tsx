import { router } from "expo-router";
import React from "react";
import { Dimensions, Image, ImageBackground, TouchableOpacity, View, Text } from "react-native";

const { width, height } = Dimensions.get('window');
export default function Policies(){
    return (
        <ImageBackground
            source={require('@/assets/checkers/checkers.png')}
            style={{flex:1}}
            >
            <View style={{zIndex:0}}>
              {/*first image up */}
              <Image source={require('@/assets/checkers/band.png')} style={{top: -height *0.19,zIndex:0, 
                height: height * 1.4,left:0,right:4, opacity:1.00}} />
            </View>
            <View  style={{position:'absolute',top: height * 0.15, zIndex:10, justifyContent:'center', width:'100%'}}>
                {/* header */}
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Image source={require('@/assets/checkers/policy.png')} style={{zIndex:10, resizeMode:'contain', height:34}} />
                    <Text style={{color:'white',fontSize:22, fontWeight:'600',textAlign:'center',paddingTop:4}}>
                        Our Policies
                    </Text>
                </View>
                <Text style={{color:'white',fontSize:15, fontWeight:'400',textAlign:'center',paddingTop:30,paddingHorizontal:3, letterSpacing:1, wordWrap:true, padding:2, lineHeight:29}}>
                    📜 By playing this game, you agree to follow fair play and respect all players.
                     Any form of cheating, exploiting bugs, or using unauthorized tools is strictly prohibited and may result
                      in penalties or restricted access. Your progress and in-game data may be stored to improve your experience, 
                      and basic information may be collected in accordance with our privacy practices. 
                      The game is provided “as is,” and while we strive for smooth gameplay, 
                      we are not responsible for unexpected issues, losses, or interruptions. 
                      Continued use of the game means you accept these terms and any future updates. 
                    Play fair, have fun, and enjoy the challenge! 🎮
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