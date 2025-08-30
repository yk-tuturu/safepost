import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/template/HelloWave';
import ParallaxScrollView from '@/components/template/ParallaxScrollView';
import ThemedText from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/template/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';


export default function ImageUploadScreen() {
  return (
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

          </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20
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
  }
});
