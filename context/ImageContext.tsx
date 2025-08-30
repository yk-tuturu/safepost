import * as ImagePicker from 'expo-image-picker';
import React, { createContext, ReactNode, useContext, useState } from "react";

type ImageContextType = {
  imageUri: string | null;
  width: number;
  height: number;
  addImage: (asset: ImagePicker.ImagePickerAsset) => void;
  clearData: ()=> void
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(1);
  const [height, setHeight] = useState<number>(1);

  const addImage = (asset: ImagePicker.ImagePickerAsset) => {
    setImageUri(asset.uri);
    setWidth(asset.width);
    setHeight(asset.height);
  }

  const clearData = () => {
    setImageUri(null);
    setWidth(1);
    setHeight(1);
  }

  return (
    <ImageContext.Provider value={{ imageUri, width, height, addImage, clearData }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImage = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImage must be used inside ImageProvider");
  }
  return context;
};