import React, { useState, useEffect } from "react";
import { Image, Dimensions, StyleProp, ImageStyle } from "react-native";

type ResponsiveImageProps = {
  source: { uri: string } | number; // supports remote URI or local require()
  style?: StyleProp<ImageStyle>;
  maxWidth?: number; // optional, defaults to screen width
  maxHeight?: number;
};

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ source, style, maxWidth, maxHeight = 500 }) => {
  const [aspectRatio, setAspectRatio] = useState<number>(1);

  const screenWidth = Dimensions.get("window").width - 48;
  const targetWidth = maxWidth ?? screenWidth;

  useEffect(() => {
    if (typeof source === "number") {
      // Local image: React Native knows the dimensions
      const { width, height } = Image.resolveAssetSource(source);
      setAspectRatio(width / height);
    } else if (source?.uri) {
      // Remote image: fetch dimensions
      Image.getSize(source.uri, (width, height) => {
        setAspectRatio(width / height);
      });
    }
  }, [source]);

  return (
    <Image
      source={source}
      style={[
        {
          width: targetWidth,
          aspectRatio,
          maxHeight: maxHeight,
          resizeMode: "contain",
          alignSelf: "center"
        },
        style,
      ]}
    />
  );
};

export default ResponsiveImage;