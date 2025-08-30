import { Image } from 'expo-image';
import { Pressable, StyleSheet } from 'react-native';
import { useState, useEffect } from "react";

import ThemedText from '@/components/ui/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

import { Colors } from '@/constants/Colors';

import ButtonLight from '@/components/buttons/ButtonLight';
import TextButton from '@/components/buttons/TextButton';

import LoadingScreen from '@/components/LoadingScreen';

import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import ResponsiveImage from '@/components/ResponsiveImage';

import { useImage } from "../../context/ImageContext"
import runObjectDetection from './ExecutorchTest';
import { Detection } from 'react-native-executorch';

export default function ImageUploadScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<Detection[]>([]);

  const { setImageUri, imageUri } = useImage();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageUri(result.assets[0].uri);
      await runObjectDetection((result.assets[0].uri) as string).then(detections => setResult(detections));
    }
  };

  const proceed = async () => {
    if (imageUri && !loading) {
      setLoading(true);
      await runObjectDetection(imageUri);
      router.push("./imageScanResult");
    }
  }

  // clear off images from prev sessions
  useEffect(() => {
    setImageUri("");
  }, [])


  return (
    <>
      {loading ?
        <View style={{ zIndex: 5, backgroundColor: "#f2f2f2", ...StyleSheet.absoluteFillObject }}>
          <LoadingScreen></LoadingScreen>
        </View> : <></>}

      <SafeAreaView>
        <View style={styles.container}>
          <ThemedText fontSize={32} font="Montserrat" weight="Bold" color={Colors.colorPrimary}>
            Scan Your Image
          </ThemedText>
          <ThemedText fontSize={18} weight="Light">
            Detect faces, documents and private details in your photos
          </ThemedText>

          {image ?
            <ResponsiveImage source={{ uri: image }} maxHeight={300} style={{ alignSelf: "center", marginTop: 32 }} /> :
            <View style={styles.uploadContainer}>
              <Pressable onPress={pickImage} style={{
                alignItems: "center"
              }}>
                <Image source={require("../../assets/images/pictureIcon.png")} style={{ width: 30, height: 30 }}></Image>
                <ThemedText weight="Light" style={{ marginTop: 8 }}>Select file</ThemedText>
              </Pressable>
            </View>
          }

          {!image && <View style={styles.divider}>
            <ThemedText style={styles.dividerText}>or</ThemedText>
          </View>}

          {image && <ButtonLight onPress={pickImage} style={{ marginTop: 32, width: "100%" }}>
            <ThemedText fontSize={16} weight="SemiBold" color="#001847">
              Choose another photo</ThemedText>
          </ButtonLight>}

          <ButtonLight onPress={() => { }} style={{ marginTop: 32, width: "100%" }}>
            <ThemedText fontSize={16} weight="SemiBold" color="#001847">
              Open Camera and Take Photo</ThemedText>
          </ButtonLight>

          <TextButton onPress={proceed} style={{ marginTop: 100, alignSelf: "center", paddingVertical: 12, paddingHorizontal: 24 }}>
            <ThemedText color="#FFF" fontSize={18}>
              Proceed to Scan
            </ThemedText>
            <ThemedText>
              {result.map(item => `${item.label} (${(item.score * 100).toFixed(1)}%)`).join(", ")}
            </ThemedText>
          </TextButton>


        </View>
      </SafeAreaView>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingHorizontal: 24
  },
  uploadContainer: {
    borderRadius: 32,
    borderColor: Colors.colorPrimary,
    borderStyle: "solid",
    borderWidth: 3,
    height: 250,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  divider: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: Colors.colorText,
    marginTop: 32

  },
  dividerText: {
    position: "absolute",
    left: "50%",
    bottom: 0,
    transform: [{ translateX: "-50%" }, { translateY: "50%" }],
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 16
  }
});
