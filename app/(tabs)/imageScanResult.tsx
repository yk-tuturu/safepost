import { ScrollView, StyleSheet } from 'react-native';

import ThemedText from '@/components/ui/ThemedText';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import OutlineButton from '@/components/buttons/OutlineButton';
import TextButton from '@/components/buttons/TextButton';
import { Colors } from '@/constants/Colors';

import ResponsiveImage from '@/components/ResponsiveImage';
import { useImage } from '@/context/ImageContext';
import { useObjectDetectionContext } from '@/context/ObjectDetectionContext';
import { useRouter } from 'expo-router';


export default function ImageScanResult() {
  const router = useRouter();

  const { imageUri } = useImage();

  const { detected, textResponse } = useObjectDetectionContext();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <OutlineButton onPress={()=>{router.back()}} style={{paddingVertical: 4}}>
          <ThemedText color="#001847">
            Back
          </ThemedText>
        </OutlineButton>
        <ScrollView contentContainerStyle={styles.container}>
          <ThemedText style={{ textAlign: "center" }} color={Colors.colorPrimary} font="Montserrat" fontSize={20} weight="Bold">
            Image Privacy Scan Results
          </ThemedText>
          <ThemedText style={{ textAlign: "center", marginTop: 15 }}>
            {detected && detected.length > 0 ? (
              <ThemedText color="#FF0000">Potential privacy risks detected</ThemedText>
            ) : (
              <ThemedText color="#00AA00">No privacy risks detected</ThemedText>
            )}
          </ThemedText>
          {imageUri && <ResponsiveImage source={{ uri: imageUri }} style={{ marginTop: 28 }} />}


          <View style={{ marginTop: 16 }}>
            {
              detected && detected.map((detected, index) => {
                return <View key={index} style={{ marginBottom: 16 }}>
                  <ThemedText>
                    <ThemedText color="#FF0000">{detected.label}: </ThemedText><ThemedText>{detected.score}</ThemedText>
                  </ThemedText>
                </View>
              })
            }
          </View>
          {textResponse ? 
            <TextButton onPress={() => { router.push("./textScanResult") }} style={{ alignSelf: "center", marginTop: 16, width: "80%" }}>
            <ThemedText color="#FFF" fontSize={18}>
              View text scan result
            </ThemedText>
          </TextButton> : 
          <>
          <TextButton onPress={() => { router.push("./imageFiltered") }} style={{ alignSelf: "center", marginTop: 16, width: "80%" }}>
            <ThemedText color="#FFF" fontSize={18}>
              Let AI refine your image!
            </ThemedText>
          </TextButton>
          <TextButton onPress={() => { router.push("./imageUpload") }} style={{ alignSelf: "center", marginTop: 16, width: "80%" }}>
            <ThemedText color="#FFF" fontSize={18}>
              Scan Another Image
            </ThemedText>
          </TextButton>
          </>
          
          }
          
        </ScrollView>
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
