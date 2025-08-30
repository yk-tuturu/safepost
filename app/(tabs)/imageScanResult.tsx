import { Image } from 'expo-image';
import { Platform, StyleSheet, Dimensions, ScrollView } from 'react-native';

import { HelloWave } from '@/components/template/HelloWave';
import ParallaxScrollView from '@/components/template/ParallaxScrollView';
import ThemedText from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/template/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import {useState } from "react";
import TextButton from '@/components/buttons/TextButton';

import { useRouter } from 'expo-router';
import { useImage } from '@/context/ImageContext';
import ResponsiveImage from '@/components/ResponsiveImage';

type Flag = {
  key: string, 
  desc: string
}

const screenWidth = Dimensions.get("window").width;


export default function ImageScanResult() {
  const imageWidth = screenWidth - 24 * 2;
  const maxHeight = 300;

  const router = useRouter();

  const [flags, setFlags] = useState<Flag[]>([
    {
      key: "Car license plate",
      desc: "A license plate can be used to identify a vehicle's owner, potentially exposing personal information"
    },
    {
      key: "Car license plate",
      desc: "A license plate can be used to identify a vehicle's owner, potentially exposing personal information"
    },
    {
      key: "Car license plate",
      desc: "A license plate can be used to identify a vehicle's owner, potentially exposing personal information"
    },
    {
      key: "Car license plate",
      desc: "A license plate can be used to identify a vehicle's owner, potentially exposing personal information"
    },
    {
      key: "Car license plate",
      desc: "A license plate can be used to identify a vehicle's owner, potentially exposing personal information"
    },
    {
      key: "Car license plate",
      desc: "A license plate can be used to identify a vehicle's owner, potentially exposing personal information"
    },
  ])

  const {imageUri } = useImage();

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText style={{textAlign: "center"}} color={Colors.colorPrimary} font="Montserrat" fontSize={32} weight="Bold">
          Privacy Scan Results
        </ThemedText>
        <ThemedText style={{textAlign: "center"}}>
          Potential privacy risks detected
        </ThemedText>
        { imageUri && <ResponsiveImage source={{uri: imageUri}} style={{marginTop: 32}}/>}
        
        
          <View style={{marginTop: 16}}>
          {
            flags.map((flag, index)=> {
              return <View key={index} style={{marginBottom: 16}}>
                <ThemedText>
                  <ThemedText color="#FF0000">{flag.key}: </ThemedText><ThemedText>{flag.desc}</ThemedText>
                </ThemedText>
              </View>
            })
          }
        </View>
        
        
        <TextButton onPress={()=>{}} style={{alignSelf: "center", marginTop: 64, width: "80%"}}>
          <ThemedText color="#FFF" fontSize={18}>
            Let AI censor your image!
          </ThemedText>
        </TextButton>
        <TextButton onPress={()=>{router.push("./imageUpload")}} style={{alignSelf: "center", marginTop: 16, width: "80%"}}>
          <ThemedText color="#FFF" fontSize={18}>
            Scan another image
          </ThemedText>
        </TextButton>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 32
  }
});
