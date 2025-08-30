import { OCR_ENGLISH, OCRModule } from 'react-native-executorch';

// Define the detection result type
interface OCRDetection {
  text: string;
  // Add other properties if available from the OCR result
}

async function ocr(uri: string): Promise<string> {
  console.log("Running OCR on image: ", uri);
  // Creating an instance
  const ocrModule = new OCRModule();

  console.log("Loading OCR model...");
  // Loading the model
  await ocrModule.load(OCR_ENGLISH);

  console.log("Running OCR...");

  // Await the OCR result
  const detection: OCRDetection[] = await ocrModule.forward(uri);
  const detectedText = detection.map(d => d.text).join(" ");

  console.log("Detected text: ", detectedText);
  return detectedText;
}

export default ocr;
