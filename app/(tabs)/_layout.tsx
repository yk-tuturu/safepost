import React from 'react';

import { Stack } from 'expo-router';
import { ImageProvider } from '@/context/ImageContext';
import { ObjectDetectionProvider } from '@/context/ObjectDetectionContext';

export default function TabLayout() {

  return (
    <ObjectDetectionProvider>
      <ImageProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="imageUpload" options={{ headerShown: false }} />
          <Stack.Screen name="imageScanResult" options={{ headerShown: false }} />
          <Stack.Screen name="imageFiltered" options={{ headerShown: false }} />
          <Stack.Screen name="textUpload" options={{ headerShown: false }} />
          <Stack.Screen name="textScanResult" options={{ headerShown: false }} />
          <Stack.Screen name="textFiltered" options={{ headerShown: false }} />
        </Stack>
      </ImageProvider>
    </ObjectDetectionProvider>
  );
}
