import { Image } from 'expo-image';
import { useEffect, useState } from "react";
import { Pressable, StyleSheet } from 'react-native';

import ThemedText from '@/components/ui/ThemedText';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert } from 'react-native';

import { Colors } from '@/constants/Colors';

import ButtonLight from '@/components/buttons/ButtonLight';
import TextButton from '@/components/buttons/TextButton';
import OutlineButton from '@/components/buttons/OutlineButton';
import LoadingScreen from '@/components/LoadingScreen';

import ResponsiveImage from '@/components/ResponsiveImage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

import { useObjectDetectionContext } from '@/context/ObjectDetectionContext';
import { useImage } from "../../context/ImageContext";
import runObjectDetection from './ExecutorchTest';

export default function ImageUploadScreen() {
  // const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  // const [error, setError] = useState<string>("");

  const { setImageUri, imageUri } = useImage();
  const { detected, setDetected } = useObjectDetectionContext();

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
    }
  };

  const proceed = async () => {
    if (imageUri) {
      // setLoading(true);
      const detected = await runObjectDetection(imageUri);
      setDetected(detected);
      // setLoading(false);
      router.push("./textUpload");
    } else {
      Alert.alert('Please select an image to scan');
    }
  }

  // clear off images from prev sessions
  useEffect(() => {
    setImageUri("");
  }, [])


  return (
    <>
      {/* {loading ?
        <View style={{ zIndex: 5, backgroundColor: "#f2f2f2", ...StyleSheet.absoluteFillObject }}>
          <LoadingScreen></LoadingScreen>
        </View> : <></>} */}

      <SafeAreaView>
        <View style={styles.container}>
          {/* <TouchableOpacity onPress={()=>{router.push("./")}}>
            <Image source={require("../../assets/images/close.png")} style={{width: 20, height: 20, marginBottom: 32}}/>
          </TouchableOpacity> */}
          <OutlineButton onPress={()=>{router.back()}} style={{paddingVertical: 4, marginBottom: 10}}>
            <ThemedText color="#001847">
              Back
            </ThemedText>
          </OutlineButton>
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
              Proceed to Scan Text
            </ThemedText>
          </TextButton>


        </View>
      </SafeAreaView>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
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
    alignSelf: "center",
    width: "80%",
    borderBottomWidth: 1,
    borderColor: "grey",
    opacity: 0.5,
    marginTop: 40

  },
  dividerText: {
    position: "absolute",
    alignSelf: "center",
    bottom: 10,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 16
  }
});
