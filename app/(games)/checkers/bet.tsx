import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";

import SearchModal from "../../../component/Searchmodal"; // ✅ ADD

const { height } = Dimensions.get('window');

export default function Bet() {

    const [searchVisible, setSearchVisible] = useState(false); // ✅ ADD

    const bets = ["500 XAF", "1000 XAF", "2000 XAF", "3000 XAF", "5000 XAF"];

    return (
        <ImageBackground
            source={require('@/assets/checkers/checkers.png')}
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            {/* DO NOT TOUCH */}
            <View style={{ zIndex: 0 }}>
                <Image
                    source={require('@/assets/checkers/band.png')}
                    style={{
                        top: -height * 0.19,
                        zIndex: 0,
                        height: height * 1.4,
                        left: 0,
                        right: 4,
                        opacity: 1.00
                    }}
                />
            </View>

            {/* top buttons */}
            <View style={{position:'absolute', width:'100%', marginTop:-165, paddingHorizontal: 20}}>
                <TouchableOpacity onPress={()=>router.push('/checkers/home')}>
                    <Image source={require('@/assets/checkers/back.png')} style={{zIndex:10, resizeMode:'contain', width:48}} />
                </TouchableOpacity>
            </View>

            {/* Title (unchanged) */}
            <View style={{
                position: 'absolute',
                width: '100%',
                marginTop: height * 0.20,
                paddingHorizontal: 20,
                alignItems: 'center'
            }}>
                <Image
                    source={require('@/assets/checkers/btn.png')}
                    style={{ zIndex: 10, resizeMode: 'contain', width: '100%' }}
                />
                <Text style={{
                    color: 'white',
                    fontSize: 19,
                    fontWeight: '700',
                    textAlign: 'center',
                    paddingTop: 24,
                    position: 'absolute',
                    zIndex: 10
                }}>
                    Select a stake
                </Text>
            </View>

            {/* ALL BUTTONS */}
            <View style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                transform: [{ translateY: -180 }],
                alignItems: 'center',
                paddingHorizontal: 20
            }}>

                {/* Bet buttons */}
                {bets.map((amount, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            marginVertical: 8
                        }}
                    >
                        <Image
                            source={require('@/assets/checkers/btn.png')}
                            style={{ resizeMode: 'contain', width: '100%' }}
                        />
                        <Text style={{
                            color: 'white',
                            fontSize: 19,
                            fontWeight: '700',
                            textAlign: 'center',
                            position: 'absolute',
                            top: 24
                        }}>
                            {amount}
                        </Text>
                    </TouchableOpacity>
                ))}

                {/* PLAY NOW → SEARCH MODAL (ONLY CHANGE HERE) */}
                <TouchableOpacity
                    onPress={() => setSearchVisible(true)} // ✅ CHANGED ONLY THIS LINE
                    style={{
                        width: '80%',
                        borderRadius: 10,
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 16, 16, 1)',
                        paddingVertical: 19,
                        marginTop: 16
                    }}
                >
                    <Text style={{
                        color: 'white',
                        fontSize: 19,
                        fontWeight: '700',
                        textAlign: 'center'
                    }}>
                        PLAY NOW
                    </Text>
                </TouchableOpacity>

                <Text style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: '400',
                        textAlign: 'center',
                        paddingVertical:16
                    }}>
                    By accepting to play , you agree to our policies and our terms of services
                </Text>
            </View>

            {/* ✅ ADD MODAL (NO STYLE CHANGE ABOVE) */}
            <SearchModal
                visible={searchVisible}
                onClose={() => setSearchVisible(false)}
                nextRoute="/checkers/main"
                mode="session"
                betAmount="1000 XAF"
            />

        </ImageBackground>
    );
}