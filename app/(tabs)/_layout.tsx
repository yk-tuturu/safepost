import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';

import {Stack} from 'expo-router';
import { ImageProvider } from '@/context/ImageContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ImageProvider>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="imageUpload" options={{headerShown: false}} />
        <Stack.Screen name="imageScanResult" options={{headerShown: false}} />
        <Stack.Screen name="imageFiltered" options={{headerShown: false}} />
        <Stack.Screen name="textUpload" options={{headerShown: false}} />
        <Stack.Screen name="textScanResult" options={{headerShown: false}} />
        <Stack.Screen name="textFiltered" options={{headerShown: false}} />
    </Stack>
    </ImageProvider>
    
  );
}
