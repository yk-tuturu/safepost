import { Image } from 'expo-image';
import { Platform, StyleSheet, Dimensions } from 'react-native';

import { HelloWave } from '@/components/template/HelloWave';
import ParallaxScrollView from '@/components/template/ParallaxScrollView';
import ThemedText from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/template/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import {useState } from "react";

type Flag = {
  key: string, 
  desc: string
}

const screenWidth = Dimensions.get("window").width;


export default function ImageScanResult() {
  const imageWidth = screenWidth - 24 * 2;
  const maxHeight = 300;

  const [flags, setFlags] = useState<Flag[]>([
    {
      key: "Car license plate",
      desc: "A license plate can be used to identify a vehicle's owner, potentially exposing personal information"
    }
  ])

  return (
    <SafeAreaView style={styles.container}>
        <ThemedText style={{textAlign: "center"}} color={Colors.colorPrimary} font="Montserrat" fontSize={32} weight="Bold">
          Privacy Scan Results
        </ThemedText>
        <ThemedText style={{textAlign: "center"}}>
          Potential privacy risks detected
        </ThemedText>
        <Image source={require("../../assets/images/privacyTestImage.png")}
          style={{width: "100%", maxHeight: 200, height: "50%"}}
        ></Image>
        <View>
          {
            flags.map((flag, index)=> {
              return <View key={index}>
                <ThemedText>
                  <ThemedText color="#FF0000">{flag.key}</ThemedText><ThemedText>:{flag.desc}</ThemedText>
                </ThemedText>
              </View>
            })
          }
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 32
  }
});
