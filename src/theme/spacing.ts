import { Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const Spacing = {
  // Base spacing units
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  "6xl": 64,

  // Common padding/margin values
  page: 20,
  section: 16,
  card: 16,
  button: 12,
  input: 16,

  // Screen dimensions
  screen: {
    width: screenWidth,
    height: screenHeight,
  },
} as const;

export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 20,
  "3xl": 24,
  full: 9999,

  // Component specific
  button: 8,
  card: 12,
  modal: 16,
  input: 8,
  avatar: 9999,
} as const;

export const Layout = {
  // Common dimensions
  header: {
    height: 60,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  tabBar: {
    height: 60,
  },
  button: {
    height: 44,
    minHeight: 44,
  },
  input: {
    height: 48,
    minHeight: 48,
  },
  avatar: {
    small: 32,
    medium: 48,
    large: 64,
  },
  icon: {
    small: 16,
    medium: 20,
    large: 24,
    xl: 32,
  },
} as const;
