import { StyleSheet, ScrollView } from 'react-native';

import ThemedText from '@/components/ui/ThemedText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

import { Colors } from '@/constants/Colors';
import TextButton from '@/components/buttons/TextButton';

import { useRouter } from 'expo-router';
import { useImage } from '@/context/ImageContext';
import ResponsiveImage from '@/components/ResponsiveImage';
import { useObjectDetectionContext } from '@/context/ObjectDetectionContext';


export default function ImageScanResult() {
  const router = useRouter();

  const { imageUri } = useImage();

  const { detected } = useObjectDetectionContext();

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText style={{ textAlign: "center" }} color={Colors.colorPrimary} font="Montserrat" fontSize={32} weight="Bold">
          Privacy Scan Results
        </ThemedText>
        <ThemedText style={{ textAlign: "center" }}>
          Potential privacy risks detected
        </ThemedText>
        {imageUri && <ResponsiveImage source={{ uri: imageUri }} style={{ marginTop: 32 }} />}


        <View style={{ marginTop: 16 }}>
          {
            detected.map((detected, index) => {
              return <View key={index} style={{ marginBottom: 16 }}>
                <ThemedText>
                  <ThemedText color="#FF0000">{detected.label}: </ThemedText><ThemedText>{detected.score}</ThemedText>
                </ThemedText>
              </View>
            })
          }
        </View>


        <TextButton onPress={() => { }} style={{ alignSelf: "center", marginTop: 64, width: "80%" }}>
          <ThemedText color="#FFF" fontSize={18}>
            Let AI censor your image!
          </ThemedText>
        </TextButton>
        <TextButton onPress={() => { router.push("./imageUpload") }} style={{ alignSelf: "center", marginTop: 16, width: "80%" }}>
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
