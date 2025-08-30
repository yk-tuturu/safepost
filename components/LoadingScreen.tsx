import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

export default function LoadingScreen() {
  return (
    <SafeAreaView>
        <Text>Loading</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});
