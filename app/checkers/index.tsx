import { Dimensions, Image, ImageBackground, View , Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import SplashAnimation from "./animate";

const { width, height } = Dimensions.get('window');

export default function Index() {
  const router = useRouter();
  return (
    <ImageBackground
    source={require('@/assets/checkers/wood.png')}
    style={{flex:1}}
    >
    <View>
      {/*first image up */}
      <Image source={require('@/assets/checkers/band.png')} style={{top: -height *0.19,zIndex:0, height: height * 1.4,left:0,right:4, opacity:1.00}} />
    </View>
      <View style={{position:'absolute', width: '100%', top: height * 0.40, alignItems:'center', justifyContent:'center'}}>
        <Text style={{fontSize:38,fontWeight:'600',color:'rgba(255, 255, 255, 1)', textAlign: 'center'}}>
          Checkers
        </Text>
        <SplashAnimation 
          source={require('@/assets/checkers/icon.png')}
          duration={5000}
          imageSize={200}
          style={{resizeMode:'contain'}}
          onAnimationEnd={() => router.replace('/home')} // Redirect to home instead of / to avoid loop
        />
      </View>
    </ImageBackground>
  );
}
