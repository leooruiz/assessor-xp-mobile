import { TextStyle } from "react-native";

export const Typography = {
  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 32,
    "4xl": 48,
  },

  // Font Weights
  fontWeight: {
    normal: "400" as TextStyle["fontWeight"],
    medium: "500" as TextStyle["fontWeight"],
    semibold: "600" as TextStyle["fontWeight"],
    bold: "700" as TextStyle["fontWeight"],
  },

  // Line Heights
  lineHeight: {
    tight: 16,
    normal: 20,
    relaxed: 24,
    loose: 28,
  },

  // Text Styles
  heading1: {
    fontSize: 32,
    fontWeight: "700" as TextStyle["fontWeight"],
    lineHeight: 40,
  },
  heading2: {
    fontSize: 24,
    fontWeight: "600" as TextStyle["fontWeight"],
    lineHeight: 32,
  },
  heading3: {
    fontSize: 20,
    fontWeight: "600" as TextStyle["fontWeight"],
    lineHeight: 28,
  },
  heading4: {
    fontSize: 18,
    fontWeight: "600" as TextStyle["fontWeight"],
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as TextStyle["fontWeight"],
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: "400" as TextStyle["fontWeight"],
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400" as TextStyle["fontWeight"],
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: "600" as TextStyle["fontWeight"],
    lineHeight: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600" as TextStyle["fontWeight"],
    lineHeight: 20,
  },
} as const;
