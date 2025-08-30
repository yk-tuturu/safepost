import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/template/HelloWave';
import ParallaxScrollView from '@/components/template/ParallaxScrollView';
import { ThemedText } from '@/components/template/ThemedText';
import { ThemedView } from '@/components/template/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';

export default function ImageScanResult() {
  return (
    <SafeAreaView>
        <Text>ImageScanResult</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
});
