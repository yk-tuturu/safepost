import React, { createContext, ReactNode, useContext, useState } from "react";
import { Detection } from "react-native-executorch";

type ObjectDetectionContextType = {
  detected: Detection[] | null;
  setDetected: (detected: Detection[] | null) => void;
  textResponse: Detection[] | null;
  setTextResponse: (detected: Detection[] | null) => void;
};

const ObjectDetectionContext = createContext<ObjectDetectionContextType | undefined>(undefined);

export const ObjectDetectionProvider = ({ children }: { children: ReactNode }) => {
  const [detected, setDetected] = useState<Detection[] | null>(null);
  const [textResponse, setTextResponse] = useState<Detection[] | null>(null);

  return (
    <ObjectDetectionContext.Provider value={{ detected: detected, setDetected: setDetected, textResponse: textResponse, setTextResponse: setTextResponse }}>
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
