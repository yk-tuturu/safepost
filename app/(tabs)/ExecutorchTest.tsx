import {
  ObjectDetectionModule,
  SSDLITE_320_MOBILENET_V3_LARGE,
} from 'react-native-executorch';

async function runObjectDetection(uri: string) {

  console.log("Running object detection on image: ", uri);
  // Creating an instance
  const objectDetectionModule = new ObjectDetectionModule();

  console.log("Loading model...");
  // Loading the model
  await objectDetectionModule.load(SSDLITE_320_MOBILENET_V3_LARGE);

  console.log("Model loaded. Running inference...");
  // Running the model
  const detections = await objectDetectionModule.forward(uri)
  console.log("Detections: ", detections);

  return detections;
}

export default runObjectDetection;
