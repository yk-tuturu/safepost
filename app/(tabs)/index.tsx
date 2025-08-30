import { StyleSheet, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/ui/ThemedText';
import { Image } from 'expo-image';

import ButtonLight from '@/components/buttons/ButtonLight';


export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.safeArea}>
      <LinearGradient colors={['#0172B2', '#001645']} style={styles.gradient}>
        <Image
          source={require("../../assets/icons/icon.png")}
          style={{width: 150, height: 150, alignSelf: "center", marginTop: "15%"}}
        />
        <ThemedText color='white' font='Lobster' fontSize={50} weight='Regular' style={styles.appHeader}>Safe Post</ThemedText>
        <ThemedText color='white' font='Roboto' fontSize={20} weight='Bold' style={styles.appSlogan}>Share Freely. Post Safely.</ThemedText>
        <ThemedText color='white' font='Roboto' fontSize={14} weight='Light' style={styles.appDescription}>Protect your privacy before you post.</ThemedText>
        <ThemedText color='white' font='Roboto' fontSize={14} weight='Light' style={styles.appDescription}>Scan your images and captions with AI to detect privacy risks before you share.</ThemedText>
        <ButtonLight onPress={() => router.push('./imageUpload')} style={styles.buttonStyle}>
          <ThemedText color='#011848' font='Montserrat' fontSize={20} weight='Bold'>START SCANNING</ThemedText>
        </ButtonLight>
        <Image
          source={require("../../assets/icons/coverPage.png")}
          style={{width: 340, height: 350, alignSelf: "center", marginTop: 50, marginRight: 70}}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
  },
  appHeader: {
    textAlign: 'center',
    marginBottom: 5,
  },
  appSlogan: {
    textAlign: 'center',
  },
  appDescription: {
    textAlign: 'center',
    marginTop: 3,
  },
  scanDetail: {
    textAlign: 'center',
  },
  buttonStyle: {
    marginTop: 20,
    width: 300,
    alignSelf: 'center',
  },
});
