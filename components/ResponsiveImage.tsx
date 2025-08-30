import React, { useEffect, useState } from "react";
import { Dimensions, Image, ImageStyle, LayoutChangeEvent, StyleProp } from "react-native";

type ResponsiveImageProps = {
  source: { uri: string } | number; // supports remote URI or local require()
  style?: StyleProp<ImageStyle>;
  maxWidth?: number; // optional, defaults to screen width
  maxHeight?: number;
  onLayout?: (e: LayoutChangeEvent)=>void
};

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ source, style, maxWidth, maxHeight = 500, onLayout }) => {
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
      onLayout={onLayout}
    />
  );
};

export default ResponsiveImage;