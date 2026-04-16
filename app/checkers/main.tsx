import React from "react";
import { Dimensions, Image, ImageBackground, Text, View } from "react-native";
import GamePlay from "../component/GamePlay";

const { width, height } = Dimensions.get('window');
export default function Main(){
   
    return (
        <ImageBackground
            source={require('@/assets/checkers/checkers.png')}
            style={{flex:1}}
            resizeMode="cover"
            >
        {/* profile data settings */}
            <View  style={{position:'absolute',top: 1, zIndex:10, justifyContent:'center', width:'100%',paddingVertical:3}}>
                <View style={{paddingHorizontal: 14, paddingVertical:3}}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',marginTop:48}}>
                        <View style={{flexDirection:'row', alignItems:'center', gap:14}}>
                            {/* user profile image */}
                            <Image
                                source={require('@/assets/checkers/user.png')}
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
                        <View style={{flexDirection:'row', gap:5, alignItems:'center'}}>
                            <Image
                                source={require('@/assets/checkers/rank.png')}
                                style={{height:50, width:50}}
                            />
                            {/* user profile rank score */}
                            <Text style={{color:'white',fontSize:22, fontWeight:'600',paddingTop: 1}}>
                                20
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            {/* user data */}
            <View
            style={{
                position: 'absolute',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: height * 0.18,
                justifyContent: 'space-between',
                width: width * 0.90, // IMPORTANT
                alignSelf: 'center', // center horizontally
            }}
            >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('@/assets/checkers/time.png')} />
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', paddingLeft: 5 }}>
                12:10
                </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('@/assets/checkers/coin.png')} />
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', paddingLeft: 5 }}>
                2000
                </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('@/assets/checkers/white.png')} />
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', paddingLeft: 5 }}>
                6
                </Text>
            </View>
            </View>

            {/* match board. this area willl be replaced in the real game */}
            <View style={{paddingHorizontal:12, marginTop:height * 0.239}}>
                <Image source={require('@/assets/checkers/board.png')} />
            </View>

            {/* second user profile data settings */}
            <View  style={{position:'absolute',top: height * 0.743, zIndex:10, justifyContent:'center', width:'100%',paddingVertical:3}}>
                <View style={{paddingHorizontal: 14, paddingVertical:2}}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',marginTop:28}}>
                        <View style={{flexDirection:'row', alignItems:'center', gap:14}}>
                            {/* user profile image */}
                            <Image
                                source={require('@/assets/checkers/user.png')}
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
                        <View style={{flexDirection:'row', gap:5, alignItems:'center'}}>
                            <Image
                                source={require('@/assets/checkers/rank.png')}
                                style={{height:50, width:50}}
                            />
                            {/* user profile rank score */}
                            <Text style={{color:'white',fontSize:22, fontWeight:'600',paddingTop: 1}}>
                                20
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            {/* user data */}
            <View
            style={{
                position: 'absolute',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: height * 0.90,
                justifyContent: 'space-between',
                width: width * 0.90, // IMPORTANT
                alignSelf: 'center', // center horizontally
            }}
            >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('@/assets/checkers/time.png')} />
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', paddingLeft: 5 }}>
                12:10
                </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('@/assets/checkers/coin.png')} />
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', paddingLeft: 5 }}>
                2000
                </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('@/assets/checkers/black.png')} />
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', paddingLeft: 5 }}>
                6
                </Text>
            </View>
            </View>
            {/* buttons under */}
            <GamePlay/>
        </ImageBackground>
    )
}