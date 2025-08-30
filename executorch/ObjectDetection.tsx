import {
  ObjectDetectionModule,
  SSDLITE_320_MOBILENET_V3_LARGE,
} from 'react-native-executorch';

async function runObjectDetection(uri: string) {

  // Creating an instance
  const objectDetectionModule = new ObjectDetectionModule();

  // Loading the model
  await objectDetectionModule.load(SSDLITE_320_MOBILENET_V3_LARGE);

  // Running the model
  const detections = await objectDetectionModule.forward(uri)
  console.log("Detections: ", detections);

  return detections;
}

export default runObjectDetection;
