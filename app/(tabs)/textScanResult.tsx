import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import ThemedText from '@/components/ui/ThemedText';
import TextButton from '@/components/buttons/TextButton';
import { Colors } from '@/constants/Colors';

// Replace with actual detection later
const scanResultData = {
  hasRisks: true,
  originalText: "Hey everyone! I'll be traveling to Bali from October 15 to 22, staying at Ayodya Resort. My flight is SQ123 departing from Singapore. Can't wait to share photos!",
  flaggedPhrases: [
    { text: "October 15 to 22" },
    { text: "Bali" },
    { text: "Ayodya Resort" },
    { text: "SQ123" },
    { text: "Singapore" }
  ],
  risks: [
    {
      phrase: "October 15 to 22",
      detail: "You've announced you will be away from home on a specific date range. This tells potential burglars that your home will be empty, making it an easy target."
    },
    {
      phrase: "Bali, Ayodya Resort",
      detail: "You've shared your destination and the hotel in your trip, which helps anyone tracking you to narrow down your location."
    },
    {
      phrase: "Flight number SQ123",
      detail: "You've provided your flight number, which could be used to track your exact travel schedule."
    },
    {
      phrase: "Singapore",
      detail: "You've mentioned you are leaving Singapore, which confirms your starting location and indicates your absence from home."
    }
  ]
};

export default function TextResultScreen() {
  const router = useRouter();
  const [scanResult] = useState(scanResultData);

  const renderHighlightedText = () => {
    const { originalText, flaggedPhrases } = scanResult;
    
    const flaggedTexts = flaggedPhrases.map(phrase => phrase.text);
    
    const words = originalText.split(' ');
    
    return words.map((word, index) => {
      const isWordFlagged = flaggedTexts.some(flagged => 
        word.toLowerCase() === flagged.toLowerCase() ||
        flagged.toLowerCase().includes(word.toLowerCase())
      );
      
      const color = isWordFlagged ? "red" : "black";
      
      return (
        <ThemedText key={index} fontSize={16} font="Roboto" weight="Regular" color={color}>
          {word}{index < words.length - 1 ? ' ' : ''}
        </ThemedText>
      );
    });
  };

  const handleAIRefine = () => {
    // Refine text using AI logic here
    router.push('./textFiltered');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <ThemedText fontSize={32} font="Montserrat" weight="Bold" color={Colors.colorPrimary}>
          Privacy Scan Result
        </ThemedText>
        
        {scanResult.hasRisks ? (
          <ThemedText fontSize={18} weight="Regular" color="red" style={styles.subtitle}>
            Potential privacy risks detected.
          </ThemedText>
        ) : (
          <ThemedText fontSize={18} weight="Regular" color="green" style={styles.subtitle}>
            No privacy risks detected. Your text appears safe to share.
          </ThemedText>
        )}

        <View style={styles.originalTextDisplay}>
          <View style={styles.textContent}>
            {renderHighlightedText()}
          </View>
        </View>

        {scanResult.hasRisks && (
          <View style={styles.risksContainer}>
            <ThemedText fontSize={20} weight="Bold" color={Colors.colorPrimary} style={styles.risksTitle}>
              Risks Detected:
            </ThemedText>
            
            {scanResult.risks.map((risk, index) => (
              <View key={index} style={styles.riskItem}>
                <ThemedText fontSize={16} weight="Bold" color="red">
                  {risk.phrase}:
                </ThemedText>
                <ThemedText fontSize={14} weight="Regular" color="black" style={styles.riskDetail}>
                  {risk.detail}
                </ThemedText>
              </View>
            ))}
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TextButton onPress={handleAIRefine} style={styles.refineButton}>
            <ThemedText fontSize={16} weight="Bold" color="white">
              Let AI Refine Your Text
            </ThemedText>
          </TextButton>

          <TextButton onPress={() => router.back()} style={styles.scanButton}>
            <ThemedText fontSize={16} weight="Bold" color="white">
              Scan Another Text
            </ThemedText>
          </TextButton>
        </View>
      </ScrollView>
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
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 16,
    paddingBottom: 30,
  },
  refineButton: {
    alignSelf: 'center',
    width: '60%',
    paddingVertical: 16,
  },
  scanButton: {
    alignSelf: 'center',
    width: '60%',
    paddingVertical: 16,
    backgroundColor: "#669bbc",
  },
});