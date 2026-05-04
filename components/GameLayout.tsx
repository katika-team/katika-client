import React from "react";
import { Dimensions, Image, ImageBackground, Text, View } from "react-native";

const { width, height } = Dimensions.get('window');

interface PlayerInfo {
  name: string;
  region: string;
  rank: string;
  score: number;
  pieces?: number;
  color?: string;
}

interface GameLayoutProps {
  children: React.ReactNode;
  topPlayer: PlayerInfo;
  bottomPlayer: PlayerInfo;
  gameStats: {
    time: string;
    coins: number;
  };
}

export default function GameLayout({ children, topPlayer, bottomPlayer, gameStats }: GameLayoutProps) {
  const PlayerRow = ({ player, isTop = false }: { player: PlayerInfo; isTop?: boolean }) => (
    <View style={{
      position: 'absolute',
      top: isTop ? 1 : height * 0.743,
      zIndex: 10,
      justifyContent: 'center',
      width: '100%',
      paddingVertical: 3
    }}>
      <View style={{ paddingHorizontal: 14, paddingVertical: isTop ? 3 : 2 }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: isTop ? 48 : 28
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <Image
              source={require('@/assets/checkers/user.png')}
              style={{ height: 80, width: 80 }}
            />
            <View style={{ paddingTop: 0, gap: 1 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', paddingTop: 0 }}>
                {player.name}
              </Text>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '400', paddingTop: 0 }}>
                {player.region}
              </Text>
              <Text style={{ color: 'white', fontSize: 14, fontWeight: '300', paddingTop: 0 }}>
                {player.rank}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
            <Image
              source={require('@/assets/checkers/rank.png')}
              style={{ height: 50, width: 50 }}
            />
            <Text style={{ color: 'white', fontSize: 22, fontWeight: '600', paddingTop: 1 }}>
              {player.score}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const GameStats = ({ marginTop }: { marginTop: number }) => (
    <View style={{
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop,
      justifyContent: 'space-between',
      width: width * 0.90,
      alignSelf: 'center',
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('@/assets/checkers/time.png')} />
        <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', paddingLeft: 5 }}>
          {gameStats.time}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('@/assets/checkers/coin.png')} />
        <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', paddingLeft: 5 }}>
          {gameStats.coins}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('@/assets/checkers/white.png')} />
        <Text style={{ color: 'white', fontSize: 20, fontWeight: '500', paddingLeft: 5 }}>
          {topPlayer.pieces || 6}
        </Text>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('@/assets/checkers/checkers.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <PlayerRow player={topPlayer} isTop />
      <GameStats marginTop={height * 0.18} />
      
      <View style={{ paddingHorizontal: 12, marginTop: height * 0.239 }}>
        {children}
      </View>
      
      <PlayerRow player={bottomPlayer} />
      <GameStats marginTop={height * 0.90} />
    </ImageBackground>
  );
}