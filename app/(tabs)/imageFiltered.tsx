import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/template/HelloWave';
import ParallaxScrollView from '@/components/template/ParallaxScrollView';
import ThemedText from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/template/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, ScrollView } from 'react-native';

import { Colors } from '@/constants/Colors';
import ResponsiveImage from '@/components/ResponsiveImage';

import { useImage } from '@/context/ImageContext';
import { useState } from 'react';

type Flag = {
  key: string,
  desc: string
}

export default function ImageFiltered() {
  const {imageUri} = useImage();

  const [flags, setFlags] = useState<Flag[]>([
    {
      key: "Car license plate",
      desc: "some desc"
    },
    {
      key: "Car license plate 2",
      desc: "some desc"
    },
    {
      key: "Car license plate 3",
      desc: "some desc"
    },
  ])

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText fontSize={28} font="Montserrat" color={Colors.colorPrimary} weight="Bold">
          AI Censored Results
          </ThemedText>
          <ThemedText fontSize={16} weight="Light">
            Let AI censor your personal information to keep your post safe!
          </ThemedText>

          <ThemedText weight="SemiBold" fontSize={18} style={{marginTop: 32, alignSelf: "center"}}>
            Original Image
          </ThemedText>
          {imageUri && <ResponsiveImage 
                source={{uri: imageUri}} 
                maxHeight={350}
                style={{marginTop: 16}}>
          </ResponsiveImage>}
          <View>
            {
              flags.map((flag, index)=> {
                return <View key={index}>
                  
                </View>
              })
            }
          </View>

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
