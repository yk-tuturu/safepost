import { StyleSheet } from 'react-native';

import ThemedText from '@/components/ui/ThemedText';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ResponsiveImage from '@/components/ResponsiveImage';
import { Colors } from '@/constants/Colors';

import { useImage } from '@/context/ImageContext';
import { useState } from 'react';
import { Checkbox } from 'react-native-paper';

import { useRouter } from 'expo-router';

import TextButton from '@/components/buttons/TextButton';

type Flag = {
  key: string,
  desc: string,
  checked: boolean
}

export default function ImageFiltered() {
  const {imageUri} = useImage();

  const [flags, setFlags] = useState<Flag[]>([
    {
      key: "Car license plate",
      desc: "some desc",
      checked: true
    },
    {
      key: "Car license plate 2",
      desc: "some desc",
      checked: true
    },
    {
      key: "Car license plate 3",
      desc: "some desc",
      checked: true
    },
  ])

  const router = useRouter();

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
          <View style={styles.flagWrapper}>
            {
              flags.map((flag, index)=> {
                return <View key={index} style={styles.flagContainer}>
                  <Checkbox
                    status={flag.checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setFlags(prevFlags =>
                        prevFlags.map((flag, f_index) =>
                          f_index === index ? { ...flag, checked: !flag.checked } : flag
                        )
                      );
                    }}
                  />
                  <ThemedText fontSize={14}>
                    {flag.key}
                  </ThemedText>
                </View>
              })
            }
          </View>
          <ThemedText weight="SemiBold" fontSize={18} style={{marginTop: 32, alignSelf: "center"}}>
            Processed Image
          </ThemedText>
          {imageUri && <ResponsiveImage 
                source={{uri: imageUri}} 
                maxHeight={350}
                style={{marginTop: 16}}>
          </ResponsiveImage>}
          <TextButton onPress={()=>{}} style={{marginTop: 48, alignSelf: "center"}}>
            <ThemedText color="#FFF">
              Save to Gallery
            </ThemedText>
          </TextButton>
          <TextButton onPress={()=>{router.push("./imageUpload")}} style={{marginTop: 16, alignSelf: "center"}}>
            <ThemedText color="#FFF">
              Scan another photo
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
  },
  flagWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 16
  },
  flagContainer: {
    borderColor: Colors.colorText,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginBottom: 8
  }
});
