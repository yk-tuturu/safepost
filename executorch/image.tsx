import {
  useImageSegmentation,
  DEEPLAB_V3_RESNET50,
} from 'react-native-executorch';

export function App() {
  const model = useImageSegmentation({ model: DEEPLAB_V3_RESNET50 });

  // ...
  const imageUri = 'file::///Users/.../cute_cat.png';

  try {
    const outputDict = await model.forward(imageUri, [DeeplabLabel.CAT], true);
  } catch (error) {
    console.error(error);
  }
  // ...
}
