import React from "react";
import { TouchableOpacity, Text, ImageBackground, StyleSheet } from "react-native";

export default function GameButton({
  title,
  onPress,
  width = 150,
  height = 60,
  fontSize = 18,
}: any) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <ImageBackground
        source={require('@/assets/checkers/btn.png')}
        style={[
          styles.button,
          { width, height }
        ]}
        imageStyle={styles.image}
      >
        <Text style={[styles.text, { fontSize }]}>
          {title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "stretch", // or 'contain' depending on your asset
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontWeight: "700",
  },
});