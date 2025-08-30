import React, { createContext, useContext, useState, ReactNode } from "react";
import { Detection } from "react-native-executorch";

type ObjectDetectionContextType = {
  detected: Detection[];
  setDetected: (detected: Detection[]) => void;
};

const ObjectDetectionContext = createContext<ObjectDetectionContextType | undefined>(undefined);

export const ObjectDetectionProvider = ({ children }: { children: ReactNode }) => {
  const [detected, setDetected] = useState<Detection[]>([]);

  return (
    <ObjectDetectionContext.Provider value={{ detected: detected, setDetected: setDetected }}>
      {children}
    </ObjectDetectionContext.Provider>
  );
};

export const useObjectDetection = () => {
  const context = useContext(ObjectDetectionContext);
  if (!context) {
    throw new Error("useObjectdetection must be used inside ObjectDetectionProvider");
  }
  return context;
};
