import { router } from "expo-router";
import React from "react";
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
/* 
    This is the settings page
    It contains the user profile, scores and game settings
    The user can also return back to the home page
*/
const { width, height } = Dimensions.get('window');
export default function Settings(){
    return (
        <ImageBackground
            source={require('@/assets/checkers/polished.png')}
            style={{flex:1}}
            >
            <View style={{zIndex:0}}>
              {/*first image up */}
              <Image source={require('@/assets/checkers/band.png')} style={{top: -height *0.19,zIndex:0, 
                height: height * 1.4,left:0,right:4, opacity:1.00}} />
            </View>
            <View  style={{position:'absolute',top: height * 0.14, zIndex:10, justifyContent:'center', width:'100%',paddingVertical:23}}>
                {/* header */}
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Image source={require('@/assets/checkers/policy.png')} style={{zIndex:10, resizeMode:'contain', height:34}} />
                    <Text style={{color:'white',fontSize:22, fontWeight:'600',textAlign:'center',paddingTop:4}}>
                        Settings
                    </Text>
                </View>
                <View>

                {/* profile data settings */}
                <View style={{paddingHorizontal: 12, paddingVertical:2}}>
                    <Text style={{color:'#ffffffb1',fontSize:22, fontWeight:'600',paddingTop: 30}}>
                        Account Settings
                    </Text>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',marginTop:28}}>
                        <View style={{flexDirection:'row', alignItems:'center', gap:14}}>
                             {/* user profile image */}
                            <Image
                                source={require('@/assets/checkers/icon.png')}
                                style={{height:80, width:80}}
                            />
                            {/* user profile name */}
                            <View style={{paddingTop:0, gap:1}}>
                                <Text style={{color:'white',fontSize:20, fontWeight:'500',paddingTop: 0}}>
                                    John Doe
                                </Text>
                                {/* user profile region */}
                                <Text style={{color:'white',fontSize:16, fontWeight:'400',paddingTop: 0}}>
                                    Cameroon
                                </Text>

                                {/* user profile rank */}
                                <Text style={{color:'white',fontSize:14, fontWeight:'300',paddingTop: 0}}>
                                    Beginner
                                </Text>
                            </View>
                        </View>

                        {/* user profile rank image */}
                        <View style={{flexDirection:'row', gap:2}}>
                            <Image
                                source={require('@/assets/checkers/piece.png')}
                                style={{height:80, width:80}}
                            />
                            {/* user profile rank score */}
                            <Text style={{color:'white',fontSize:22, fontWeight:'600',paddingTop: 20}}>
                                20
                            </Text>
                        </View>
                    </View>
                </View>
                </View>
            </View>

            {/* scores settings */}
            <View style={{paddingHorizontal: 12, paddingTop:height * 0.50, position:'absolute', flexDirection:'row',justifyContent:'space-between', alignItems:'center',gap:109}}>
                <View>
                    <Text style={{color:'#ffffffc0',fontSize:22, fontWeight:'600',paddingTop: 0, textAlign:'center'}}>
                        Wins
                    </Text>
                    <Text style={{color:'#ffffffe6',fontSize:22, fontWeight:'600',paddingTop: 0, textAlign:'center'}}>
                        1
                    </Text>
                </View>
                <View>
                    <Text style={{color:'#ffffffc0',fontSize:22, fontWeight:'600',paddingTop: 0, textAlign:'center'}}>
                        Draws
                    </Text>
                    <Text style={{color:'#ffffffe6',fontSize:22, fontWeight:'600',paddingTop: 0, textAlign:'center'}}>
                        0
                    </Text>
                </View>
                <View>
                    <Text style={{color:'#ffffffc0',fontSize:22, fontWeight:'600',paddingTop: 0, textAlign:'center'}}>
                        Loses
                    </Text>
                    <Text style={{color:'#ffffffe6',fontSize:22, fontWeight:'600',paddingTop: 0, textAlign:'center'}}>
                        3
                    </Text>
                </View>
            </View>

            {/* game settings */}
            <View style={{paddingHorizontal: 12, paddingTop:height * 0.64, position:'absolute'}}>
                <Text style={{color:'#ffffffa4',fontSize:22, fontWeight:'600',paddingTop: 0}}>
                    Game Settings
                </Text>
                {/* sound settings */}
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingTop:32 , gap:149}}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', gap:12}}>
                        <Image source={require('@/assets/checkers/vol.png')} style={{zIndex:10, resizeMode:'contain', height:54}} />
                        <Text style={{color:'white',fontSize:20, fontWeight:'600',textAlign:'center',paddingTop:3}}>
                            Allow sound
                        </Text>
                    </View>
                    {/*toogle button for on and off sound */}
                    <View style={{width:55, height:30, backgroundColor:'white', borderRadius:50}}>
                        <TouchableOpacity style={{width:30, height:30, backgroundColor:'rgba(169, 73, 9, 1)', borderRadius:50}} />
                    </View>
                </View>
            </View>

            {/* learn to play button */}
            <TouchableOpacity onPress={()=>router.push('/home')} style={{position:'absolute',width:'100%', marginTop:height * 0.89, paddingHorizontal: 20, alignItems:'center'}}>
                    <Image source={require('@/assets/checkers/btn.png')} style={{zIndex:10, resizeMode:'contain', width: '100%'}} />
                    <Text style={{color:'white',fontSize:19, fontWeight:'700',textAlign:'center',paddingTop:24, position:'absolute',zIndex:10}}>
                        Return Back
                    </Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}