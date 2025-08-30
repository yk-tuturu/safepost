import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';

import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Button title="go to image upload" onPress={() => router.push("./imageUpload")} />
      <Button title="go to text upload" onPress={() => router.push("./textUpload")} />
        <ThemedText font="Montserrat" weight="Bold" fontSize={32} color={Colors.colorPrimary}>test</ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});
