import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import OutlineButton from '@/components/buttons/OutlineButton';
import ThemedText from '@/components/ui/ThemedText';
import TextButton from '@/components/buttons/TextButton';
import { Colors } from '@/constants/Colors';

import { useObjectDetectionContext } from '@/context/ObjectDetectionContext';

export default function TextResultScreen() {
  const router = useRouter();
  const { textResponse, ocrDetected } = useObjectDetectionContext();

  // const renderHighlightedText = () => {
  //   const { originalText, flaggedPhrases } = scanResult;
    
  //   const flaggedTexts = flaggedPhrases.map(phrase => phrase.text);
    
  //   const words = originalText.split(' ');
    
  //   return words.map((word, index) => {
  //     const isWordFlagged = flaggedTexts.some(flagged => 
  //       word.toLowerCase() === flagged.toLowerCase() ||
  //       flagged.toLowerCase().includes(word.toLowerCase())
  //     );
      
  //     const color = isWordFlagged ? "red" : "black";
      
  //     return (
  //       <ThemedText key={index} fontSize={16} font="Roboto" weight="Regular" color={color}>
  //         {word}{index < words.length - 1 ? ' ' : ''}
  //       </ThemedText>
  //     );
  //   });
  // };

  const handleAIRefine = () => {
    // Refine text using AI logic here
    router.push('./textFiltered');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <OutlineButton onPress={()=>{router.back()}} style={{paddingVertical: 4}}>
          <ThemedText color="#001847">
            Back
          </ThemedText>
        </OutlineButton>
        <ScrollView style={styles.container}>
          <ThemedText fontSize={25} font="Montserrat" weight="Bold" color={Colors.colorPrimary} style={{ textAlign: "center" }}>
            Text Privacy Scan Result
          </ThemedText>
          <ThemedText fontSize={18} weight="Regular" color="red" style={styles.subtitle}>
              Potential privacy risks detected.
            </ThemedText>

          <View style={styles.originalTextDisplay}>
            <View style={styles.textContent}>
              <ThemedText>
                {textResponse}
              </ThemedText>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TextButton onPress={()=>{router.push("./imageScanResult")}} style={styles.refineButton}>
              <ThemedText fontSize={16} weight="Bold" color="white">
                View Image Result
              </ThemedText>
            </TextButton>

            <TextButton onPress={() => router.push("./imageUpload")} style={styles.scanButton}>
              <ThemedText fontSize={16} weight="Bold" color="white">
                Scan Again
              </ThemedText>
            </TextButton>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  subtitle: {
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  originalTextDisplay: {
    borderRadius: 15,
    borderColor: Colors.colorPrimary,
    borderStyle: "solid",
    borderWidth: 2,
    minHeight: 150,
    marginBottom: 30,
    padding: 16,
  },
  textContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    lineHeight: 24,
  },
  risksContainer: {
    marginBottom: 10,
  },
  risksTitle: {
    marginBottom: 16,
  },
  riskItem: {
    marginBottom: 16,
    paddingLeft: 8,
  },
  riskDetail: {
    marginTop: 4,
    lineHeight: 20,
    textAlign: 'justify',
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 16,
    paddingBottom: 30,
  },
  refineButton: {
    alignSelf: 'center',
    width: '90%',
    paddingVertical: 16,
  },
  scanButton: {
    alignSelf: 'center',
    width: '90%',
    paddingVertical: 16,
    backgroundColor: "#669bbc",
  },
});