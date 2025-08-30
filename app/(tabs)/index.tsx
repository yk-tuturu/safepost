import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';

import TextButton from '@/components/buttons/TextButton';
import ButtonLight from '@/components/buttons/ButtonLight';
import OutlineButton from '@/components/buttons/OutlineButton';

import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const router = useRouter();
  
  return (
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient colors={['#0172B2', '#001645']} style={styles.gradient}>
          <ThemedText color='white' font='Lobster' fontSize={45} weight='Regular' style={styles.appHeader}>Safe Post</ThemedText>
          <ThemedText color='white' font='Roboto' fontSize={20} weight='Regular' style={styles.appSlogan}>Share Freely. Post Safely.</ThemedText>
          <ButtonLight onPress={() => router.push('./textUpload')} style={styles.buttonStyle}>
            <ThemedText color='#011848' font='Roboto' fontSize={20} weight='Regular'>Scan Text</ThemedText>
            <ThemedText color='#484242' font='Roboto' fontSize={15} weight='Regular' style={styles.scanDetail}>Check your captions and text for any sensitive or private information.</ThemedText>
          </ButtonLight>
          <ButtonLight onPress={() => router.push('./imageUpload')} style={styles.buttonStyle}>
            <ThemedText color='#011848' font='Roboto' fontSize={20} weight='Regular'>Scan Image</ThemedText>
            <ThemedText color='#484242' font='Roboto' fontSize={15} weight='Regular' style={styles.scanDetail}>Detect faces, documents, and private details in your photos.</ThemedText>
          </ButtonLight>
        </LinearGradient>
      </SafeAreaView>
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
    marginTop: '35%',
    textAlign: 'center',
  },
  appSlogan: {
    textAlign: 'center',
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