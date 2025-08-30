import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import ThemedText from './ui/ThemedText';

import { Colors } from '@/constants/Colors';

import { ActivityIndicator } from 'react-native-paper';
import OutlineButton from './buttons/OutlineButton';
import { useRouter } from 'expo-router';

export default function LoadingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
        <ThemedText style={{textAlign: "center"}} fontSize={24} font="Montserrat" color={Colors.colorPrimary} weight="Bold">
          Analyzing your content for privacy risks
        </ThemedText>
        <ActivityIndicator style={{marginTop: 96}} animating={true} color={Colors.colorPrimary} size={200} />
        <ThemedText weight="Light" style={{marginTop:90}} fontSize={20}>
          Your security is our top priority
        </ThemedText>
        <OutlineButton onPress={()=>{router.push("./imageUpload")}} style={{alignSelf: "center", marginTop: 64}}>
          <ThemedText color="#001847">
            Cancel
          </ThemedText>
        </OutlineButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  }
});
