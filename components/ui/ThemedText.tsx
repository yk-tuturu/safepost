import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import { Colors } from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
  color?: string
  font?: "Montserrat" | "Roboto"
  weight?: "Bold" | "SemiBold" | "Regular" | "Light"
  fontSize?: number
};

function ThemedText({
  style,
  color = Colors.colorText,
  font = "Roboto",
  weight = "Regular",
  fontSize = 16,
  ...rest
}: ThemedTextProps) {

  return (
    <Text
      style={[{
        fontSize: fontSize,
        color: color,
        fontFamily: font + weight
      }, style]}
      {...rest}
    />
  );
}

export default ThemedText;
