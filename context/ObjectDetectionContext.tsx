import React, { createContext, ReactNode, useContext, useState } from "react";
import { Detection } from "react-native-executorch";

type ObjectDetectionContextType = {
  detected: Detection[] | null;
  setDetected: (detected: Detection[] | null) => void;
  ocrDetected: String | null;
  setOcrDetected: (detected: String | null) => void;
  textResponse: String | null;
  setTextResponse: (detected: String | null) => void;
};

const ObjectDetectionContext = createContext<ObjectDetectionContextType | undefined>(undefined);

export const ObjectDetectionProvider = ({ children }: { children: ReactNode }) => {
  const [detected, setDetected] = useState<Detection[] | null>(null);
  const [ocrDetected, setOcrDetected] = useState<String | null>(null);
  const [textResponse, setTextResponse] = useState<String | null>(null);

  return (
    <ObjectDetectionContext.Provider value={{ detected, setDetected, ocrDetected, setOcrDetected, textResponse, setTextResponse }}>
      {children}
    </ObjectDetectionContext.Provider>
  );
};

export const useObjectDetectionContext = () => {
  const context = useContext(ObjectDetectionContext);
  if (!context) {
    throw new Error("useObjectdetection must be used inside ObjectDetectionProvider");
  }
  return context;
};
