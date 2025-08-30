import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import {useState} from "react";

import { HelloWave } from '@/components/template/HelloWave';
import ParallaxScrollView from '@/components/template/ParallaxScrollView';
import ThemedText from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/template/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';

import {Divider} from "react-native-paper"
import ButtonLight from '@/components/buttons/ButtonLight';
import TextButton from '@/components/buttons/TextButton';

import LoadingScreen from '@/components/LoadingScreen';

import { useRouter } from 'expo-router';

export default function ImageUploadScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <>
    {loading ? 
    <View style={{zIndex: 5, backgroundColor: "#f2f2f2", ...StyleSheet.absoluteFillObject}}>
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
          <View style={styles.uploadContainer}>
            <Image source={require("../../assets/images/pictureIcon.png")} style={{width: 30, height: 30}}></Image>
            <ThemedText weight="Light" style={{marginTop: 8}}>Select file</ThemedText>
          </View>
          <View style={styles.divider}>
            <ThemedText style={styles.dividerText}>or</ThemedText>
          </View>
          <ButtonLight onPress={()=>{}} style={{marginTop: 32, width: "100%"}}>
            <ThemedText fontSize={16} weight="SemiBold" color="#001847">
              Open Camera and Take Photo</ThemedText>
          </ButtonLight>

          <TextButton onPress={()=>{setLoading(true)}} style={{marginTop: 100, alignSelf: "center", paddingVertical: 12, paddingHorizontal: 24}}>
            <ThemedText color="#FFF" fontSize={18}>
              Proceed to Scan
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
    transform: [{translateX: "-50%"}, {translateY: "50%"}],
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 16
  }
});
