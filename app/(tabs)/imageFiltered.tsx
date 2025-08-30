import { StyleSheet, Alert } from 'react-native';

import ThemedText from '@/components/ui/ThemedText';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ResponsiveImage from '@/components/ResponsiveImage';
import { Colors } from '@/constants/Colors';

import { useImage } from '@/context/ImageContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Checkbox } from 'react-native-paper';

import { useRouter } from 'expo-router';

import TextButton from '@/components/buttons/TextButton';
import { useObjectDetectionContext } from '@/context/ObjectDetectionContext';
import { Rect, Svg } from 'react-native-svg';

import * as MediaLibrary from 'expo-media-library';
import type { LayoutChangeEvent } from 'react-native';
import ViewShot from 'react-native-view-shot';


type Flag = {
  key: string,
  desc: string,
  checked: boolean
}

type Size = {
  width: number,
  height: number
}

export default function ImageFiltered() {
  const {imageUri, width, height} = useImage();

  const [flags, setFlags] = useState<Flag[]>([]);
  const [renderedSize, setRenderedSize] = useState<Size>({
    width: 1,
    height: 1
  })

  const viewRef = useRef<View|null>(null);
  const viewShotRef = useRef<ViewShot>(null);

  const { detected } = useObjectDetectionContext();
  console.log(detected);

  useEffect(()=> {
    console.log(imageUri)
    console.log(width)
    console.log(height)
  }, [imageUri, width, height])

  
  const saveImage = useCallback(async () => {
    if (!imageUri || !viewShotRef.current || !viewShotRef.current.capture) return;

    try {
      var uri = "";
      
      viewShotRef.current.capture().then((my_uri:string) => {
        console.log("do something with ", my_uri);
        uri = my_uri;
      });

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        console.log("1")
        console.log(uri)
        await MediaLibrary.saveToLibraryAsync(uri);
        console.log("saved to gallery")
        Alert.alert("Saved to gallery!")
      } else {
        console.log("permission denied")
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

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
          {imageUri && 
          <ResponsiveImage 
                source={{uri: imageUri}} 
                maxHeight={350}
                style={{marginTop: 16}}>
          </ResponsiveImage>
          }
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
          {imageUri && 
          <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
              <View style={{alignSelf: "center", marginTop: 16}}>
              <ResponsiveImage 
                  source={{uri: imageUri}} 
                  maxHeight={350}
                  onLayout={(e: LayoutChangeEvent)=>{
                    setRenderedSize({
                      width: e.nativeEvent.layout.width, 
                      height: e.nativeEvent.layout.height})
                  }}>
            </ResponsiveImage>
            <Svg style={StyleSheet.absoluteFill}>
              {
                detected && detected.map((flag, index) => {
                  return <Rect
                    key={index}
                    x={flag.bbox.x1 / width * renderedSize.width}
                    y={flag.bbox.y1 / height * renderedSize.height}
                    width={(flag.bbox.x2 - flag.bbox.x1) / width * renderedSize.width}
                    height={(flag.bbox.y2 - flag.bbox.y1) / height * renderedSize.height}
                    fill="black"
                  />
                })
              }
              
            </Svg>
          </View>
          </ViewShot>
          }
          <TextButton onPress={saveImage} style={{marginTop: 48, alignSelf: "center"}}>
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
