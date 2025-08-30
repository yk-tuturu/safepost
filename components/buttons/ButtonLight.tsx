import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, ViewStyle } from "react-native";

import ThemedText from "../ui/ThemedText";

import { Colors } from "@/constants/Colors";

export type ButtonLightProps = {
  children?: React.ReactNode,
  style?: ViewStyle | ViewStyle[],
  onPress: ()=>void,
  
};

// pass in your own children as a prop
// caveat is tho, you have to style your own children text
const ButtonLight: React.FC<ButtonLightProps> = ({
    onPress,
    children,
    style
}) => {
    const styles = StyleSheet.create({
        button: {
            backgroundColor: "#A5CEFF",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 19,
            elevation: 8, // Android
            alignSelf: "flex-start",
            justifyContent: "center",
            alignItems: "center",
            borderColor: Colors.colorPrimary,
            borderWidth: 1,
            borderStyle: "solid"
        }
        });

  return (
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        {children}
      </TouchableOpacity>
  );
}

export default ButtonLight;

