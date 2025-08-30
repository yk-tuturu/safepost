import { Alert, StyleSheet } from 'react-native';

import ThemedText from '@/components/ui/ThemedText';
import { TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LoadingScreen from '@/components/LoadingScreen';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import OutlineButton from '@/components/buttons/OutlineButton';
import TextButton from '@/components/buttons/TextButton';
import { Colors } from '@/constants/Colors';
import TextFlagging from '@/executorch/TextFlagging';

import { useObjectDetectionContext } from '@/context/ObjectDetectionContext';

export default function TextUploadScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [textInput, setTextInput] = useState('');

  const {detected} = useObjectDetectionContext();
  const [skipped, setSkipped] = useState(false);
  const [textDetected, setTextDetected] = useState(false);

  const handlePasteFromClipboard = async () => {
    try {
      const clipboardContent = await Clipboard.getStringAsync();
      if (clipboardContent) {
        setTextInput(clipboardContent);
      } else {
        Alert.alert('No content found on clipboard');
      }
    } catch (error) {
      Alert.alert('Failed to paste from clipboard');
    }
  };

  // If not text input, do not allow to proceed
  const handleProceedToScan = async () => {
    if (textInput.trim() === '') {
      Alert.alert('Please enter text to scan');
      return;
    }

    if (!isLoading) {
      setIsLoading(true);
      console.log("Proceeding to scan text: ", textInput);
      const res = await TextFlagging(textInput);
      console.log("Text Flagging Result: ", res);
      setTextDetected(true);
    }
  };

  // flawless
  // absolutely not spaghetti at all
  function handleSkip() {
    if (detected) {
      router.push("./imageScanResult");
    } else {
      setSkipped(true);
      setIsLoading(true);
    }
  }

  useEffect(()=> {
    if (skipped && detected) {
      router.push("./imageScanResult");
    }

    if (!skipped && detected && textDetected) {
      router.push("./imageScanResult")
    }
  }, [skipped, detected])



  return (
    <>
      {isLoading ?
        <View style={{ zIndex: 5, backgroundColor: "#f2f2f2", ...StyleSheet.absoluteFillObject }}>
          <LoadingScreen></LoadingScreen>
        </View> : <></>}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <OutlineButton onPress={()=>{router.back()}} style={{paddingVertical: 4}}>
            <ThemedText color="#001847">
              Back
            </ThemedText>
          </OutlineButton>
          <ThemedText fontSize={32} font="Montserrat" weight="Bold" color={Colors.colorPrimary}>
            Scan Your Text
          </ThemedText>
          <ThemedText fontSize={18} weight="Light" style={styles.subtitle}>
            Check your captions and text for any sensitive or private information.
          </ThemedText>

          <TextButton style={styles.pasteButton} onPress={handlePasteFromClipboard}>
            <ThemedText fontSize={16} weight="Bold" color="white">
              Paste from Clipboard
            </ThemedText>
          </TextButton>

          {/* Text Input Container */}
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              multiline={true}
              textAlignVertical="top"
              placeholder="Input your text or caption here..."
              placeholderTextColor="#999"
              value={textInput}
              onChangeText={setTextInput}
            />
          </View>

          {/* Proceed to Scan Button */}
          <TextButton style={styles.scanButton} onPress={handleProceedToScan}>
            <ThemedText fontSize={18} weight="Bold" color="white">
              Proceed to Scan
            </ThemedText>
          </TextButton>
          <OutlineButton onPress={handleSkip} style={{alignSelf: "center", marginTop: 16}}>
            <ThemedText color="#001847">
              Skip
            </ThemedText>
          </OutlineButton>
        </View>
      </SafeAreaView>
    </>
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
    marginTop: 8,
    marginBottom: 24,
  },
  pasteButton: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  textInputContainer: {
    borderRadius: 20,
    borderColor: Colors.colorPrimary,
    borderStyle: "solid",
    borderWidth: 3,
    height: '50%',
    marginBottom: 30,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#333',
    textAlignVertical: 'top',
  },
  scanButton: {
    alignSelf: 'center'
  },
});
