import React from "react";
import { Modal, View, Text, Image, Dimensions, ScrollView, Switch, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import GameButton from "./GameButton";

const { height } = Dimensions.get('window');

export default function BetModal({ visible, onClose, onConfirm, amount, type }: any) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      {/* Background overlay */}
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        {/* BACK MODAL */}
        {type === 'back' && (
          <View style={{
            width: '90%',
            height: height * 0.13,
            alignItems: 'center'
          }}>
            <Image
              source={require('@/assets/checkers/btn.png')}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                resizeMode: 'stretch'
              }}
            />

            <Text style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '700',
              marginTop: 18,
              marginBottom:3
            }}>
              Do You Want To Exit The Game?
            </Text>

            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
              <GameButton
                title="Continue"
                onPress={() => router.push('/checkers/main')}
                width={140}
              />

              <GameButton
                title="Cancel"
                onPress={onClose}
                width={140}
              />
            </View>
          </View>
        )}

        {/* 🔥 HINT MODAL (same design) */}
        {type === 'hint' && (
          <View style={{
            width: '90%',
            height: height * 0.13,
            alignItems: 'center'
          }}>
            <Image
              source={require('@/assets/checkers/btn.png')}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                resizeMode: 'stretch'
              }}
            />

            <Text style={{
              color: 'white',
              fontSize: 22,
              fontWeight: '700',
              marginTop: 15
            }}>
              Need a Hint?
            </Text>
            {/* Subtitle */}
          <Text style={{
              color: 'white',
              fontSize: 14,
              marginTop: 5,
              textAlign: 'center'
            }}>
              Hints cost an extra 10 XAF
            </Text>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
              <GameButton
                title="Show"
                onPress={() => {
                  onConfirm && onConfirm(); // 🔥 trigger hint logic
                  onClose();
                }}
                width={140}
              />

              <GameButton
                title="Cancel"
                onPress={onClose}
                width={140}
              />
            </View>
          </View>
        )}

        {type === 'draw' && (
        <View style={{
          width: '90%',
          height: height * 0.13,
          alignItems: 'center'
        }}>
          
          <Image
            source={require('@/assets/checkers/btn.png')}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              resizeMode: 'stretch'
            }}
          />

          {/* Title */}
          <Text style={{
            color: 'white',
            fontSize: 22,
            fontWeight: '700',
            marginTop: 15
          }}>
            Request a Draw?
          </Text>

          {/* Subtitle */}
          <Text style={{
            color: 'white',
            fontSize: 14,
            marginTop: 5,
            marginBottom:6,
            textAlign: 'center'
          }}>
            Do you want to offer a draw to your opponent?
          </Text>

          {/* Buttons */}
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
            
            <GameButton
              title="Yes"
              onPress={() => {
                // 👉 later: trigger draw request logic
                onClose();
              }}
              width={140}
            />

            <GameButton
              title="Cancel"
              onPress={onClose}
              width={140}
            />

          </View>

        </View>
      )}


      {type === 'setting' && (
      <View style={{
        width: '90%',
        height: height * 0.4,
        alignItems: 'center'
      }}>

        {/* Background */}
        <Image
          source={require('@/assets/checkers/btn.png')}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            resizeMode: 'stretch'
          }}
        />

        {/* Title */}
        <Text style={{
          color: 'white',
          fontSize: 22,
          fontWeight: '700',
          marginTop: 34
        }}>
          Settings
        </Text>

        {/* CONTENT */}
        <View style={{ width: '85%', marginTop: 15 }}>

          {/* SOUND */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20
          }}>
            <View style={{flexDirection:'row' ,alignItems:'center',gap:12}}>
              <Image
              source={require('@/assets/checkers/vol.png')}
              style={{
                position: 'relative',
                width: '30%',
                height: 40,
                resizeMode: 'stretch'
              }}
            />
            <Text style={{ color: 'white', fontSize: 16 }}>
              Sound
            </Text>
            </View>

            {/* <Switch
              value={true} // 🔥 later connect to state
              onValueChange={(val) => {
                // 👉 handle sound toggle
              }}
              trackColor={{ false: "#555", true: "#4CAF50" }}  // background track
              thumbColor={true ? "#fff" : "#f4f3f4"}  // switch thumb
              style={{ transform: [{ scale: 1.2 }] }}  // slightly larger switch
            /> */}

            {/* sound settings */}
            {/*toogle button for on and off sound */}
            <View style={{width:55, height:24, backgroundColor:'white', borderRadius:50}}>
                <TouchableOpacity style={{width:30, height:24, backgroundColor:'rgba(169, 73, 9, 1)', borderRadius:50}} />
            </View>
          </View>

          {/* RULES */}
          <ScrollView style={{ maxHeight: 120 }}>
            <View style={{flexDirection:'row', alignItems:'center', gap:12, marginVertical:12}}>
              <Image 
              source={require('@/assets/checkers/world.png')} 
              style={{ width: 30, height: 30, resizeMode: 'contain' }}
            />
              <Text style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '700',
                marginBottom: 5
              }}>
                Rules of Checkers
              </Text>
            </View>
            <Text style={{
              color: 'white',
              fontSize: 16,
              lineHeight: 20
            }}>
              • Board is 10x10{'\n'}
              • Pieces move diagonally{'\n'}
              • Capturing is mandatory{'\n'}
              • Kings move multiple squares{'\n'}
              • Longest capture is preferred rule{'\n\n'}
              Win by capturing all opponent pieces or blocking moves.
            </Text>
          </ScrollView>

        </View>

        {/* CLOSE */}
        <View style={{ marginTop: 20 }}>
          <GameButton
            title="Close"
            onPress={onClose}
            width={140}
          />
        </View>

      </View>
    )}
      </View>
    </Modal>
  );
}