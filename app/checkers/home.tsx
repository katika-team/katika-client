import { router } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ImageBackground } from "react-native";
import { Dimensions } from "react-native";

const {height} = Dimensions.get('window')
export default function Home(){
    return (
    <ImageBackground
        source={require('@/assets/checkers/screen.png')}
        style={{flex:1}}
        imageStyle={{top: 0
            ,height: height * 1.28
            ,width: 'auto'
            ,left:-50, right:-50, bottom:-100
            ,resizeMode:'contain',
            transform: [{ scaleY: 1.1 }],
        }}
        >
        <View>
            {/*first image up */}
            <Image source={require('@/assets/checkers/band.png')} style={{top: -height *0.1999,zIndex:0, height: height * 1.4,left:0,right:4, opacity:1.00}} />
        </View>
        {/* top buttons */}
        <View style={{position:'absolute', flexDirection:'row', justifyContent:'space-between',width:'100%', marginTop:70, paddingHorizontal: 20, alignItems:'center'}}>
            <TouchableOpacity onPress={()=>router.push('/checkers/home')}>
                <Image source={require('@/assets/checkers/close.png')} style={{zIndex:10, resizeMode:'contain'}} />
                <Text style={{color:'white',fontSize:14, fontWeight:'400',textAlign:'center',paddingTop:2}}>
                    Close
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>router.push('/checkers/info')}>
                <Image source={require('@/assets/checkers/info.png')} style={{zIndex:10, resizeMode:'contain'}} />
                <Text style={{color:'white',fontSize:14, fontWeight:'400',textAlign:'center',paddingTop:2}}>
                    Info
                </Text>
            </TouchableOpacity>
        </View>

        <View style={{position:'absolute',width:'100%', marginTop:75, paddingHorizontal: 20, alignItems:'center'}}>
                <Image source={require('@/assets/checkers/piece.png')} style={{zIndex:10, resizeMode:'contain', width: 200}} />
        </View>
        {/* play button */}
        <TouchableOpacity onPress={()=> router.push('/checkers/bet')}  style={{position:'absolute',width:'100%', marginTop:height * 0.30, paddingHorizontal: 20, alignItems:'center'}}>
                <Image source={require('@/assets/checkers/btn.png')} style={{zIndex:10, resizeMode:'contain', width: '100%'}} />
                <Text style={{color:'white',fontSize:24, fontWeight:'700',textAlign:'center',paddingTop:20, position:'absolute',zIndex:10}}>
                    PLAY
                </Text>
        </TouchableOpacity>
        {/* local match button */}
        <TouchableOpacity style={{position:'absolute',width:'100%', marginTop:height * 0.45, paddingHorizontal: 20, alignItems:'center'}}>
                <Image source={require('@/assets/checkers/btn.png')} style={{zIndex:10, resizeMode:'contain', width: '100%'}} />
                <Text style={{color:'white',fontSize:19, fontWeight:'700',textAlign:'center',paddingTop:24, position:'absolute',zIndex:10}}>
                    LOCAL MATCH
                </Text>
        </TouchableOpacity>
        {/* learn to play button */}
        <TouchableOpacity style={{position:'absolute',width:'100%', marginTop:height * 0.6, paddingHorizontal: 20, alignItems:'center'}}>
                <Image source={require('@/assets/checkers/btn.png')} style={{zIndex:10, resizeMode:'contain', width: '100%'}} />
                <Text style={{color:'white',fontSize:19, fontWeight:'700',textAlign:'center',paddingTop:24, position:'absolute',zIndex:10}}>
                    LEARN TO PLAY
                </Text>
        </TouchableOpacity>

        {/* buttom buttons */}
        <View style={{position:'absolute', flexDirection:'row', justifyContent:'space-between',width:'100%', marginTop: height * 0.93, paddingHorizontal: 20, alignItems:'center'}}>
            <TouchableOpacity onPress={()=>router.push('/checkers/policies')}>
                <Image source={require('@/assets/checkers/policy.png')} style={{zIndex:10, resizeMode:'contain'}} />
                <Text style={{color:'white',fontSize:14, fontWeight:'400',textAlign:'center',paddingTop:2}}>
                    Policies
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>router.push('/checkers/setting')}>
                <Image source={require('@/assets/checkers/setting.png')} style={{zIndex:10, resizeMode:'contain'}} />
                <Text style={{color:'white',fontSize:14, fontWeight:'400',textAlign:'center',paddingTop:2}}>
                    Setting
                </Text>
            </TouchableOpacity>
        </View>
    </ImageBackground>
    )
}