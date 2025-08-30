import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Button title="go to image upload" onPress={() => router.push("./imageUpload")} />
        <Button title="go to text upload" onPress={() => router.push("./textUpload")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});
