import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

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
    <SafeAreaView>
      <Button title="go to image upload" onPress={() => router.push("./imageUpload")} />
      <Button title="go to text upload" onPress={() => router.push("./textUpload")} />
       <TextButton onPress={()=>{}}>
        <ThemedText fontSize={20} font='Roboto' weight="Bold" color="white">Test test test</ThemedText>
       </TextButton>
       <ButtonLight onPress={()=>{}}>
        <ThemedText fontSize={20} font="Roboto" weight="Bold" color="#001847">
          hello testing wow
        </ThemedText>
       </ButtonLight>
       <OutlineButton onPress={()=>{}}>
        <ThemedText fontSize={20} font="Roboto" weight="Bold" color="#001847">
          hello testing wow
        </ThemedText>
       </OutlineButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});
