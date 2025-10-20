export const Colors = {
  // Primary Colors
  primary: "#007AFF",
  primaryLight: "#E8F4FF",
  primaryDark: "#0056CC",

  // Secondary Colors
  secondary: "#FF3B30",
  secondaryLight: "#FFE8E8",
  secondaryDark: "#CC2E26",

  // Status Colors
  success: "#34C759",
  successLight: "#E8F5E8",
  warning: "#FF9500",
  warningLight: "#FFF3E0",
  error: "#FF3B30",
  errorLight: "#FFE8E8",
  info: "#007AFF",
  infoLight: "#E8F4FF",

  // Profile/Investment Colors
  conservative: "#34C759",
  moderate: "#007AFF",
  aggressive: "#FF3B30",

  // Neutral Colors
  background: "#f8f9fa",
  surface: "#ffffff",
  surfaceSecondary: "#f0f0f0",

  // Text Colors
  text: "#1a1a1a",
  textSecondary: "#666666",
  textTertiary: "#999999",
  textLight: "rgba(255, 255, 255, 0.9)",
  textMuted: "rgba(255, 255, 255, 0.7)",

  // Border Colors
  border: "#e0e0e0",
  borderLight: "#f0f0f0",

  // Overlay Colors
  overlay: "rgba(0, 0, 0, 0.5)",
  overlayLight: "rgba(0, 0, 0, 0.3)",

  // Component specific
  tabBarActive: "#007AFF",
  tabBarInactive: "gray",

  // Transparent variations
  transparent: "transparent",
  whiteTransparent: "rgba(255, 255, 255, 0.2)",
  blackTransparent: "rgba(0, 0, 0, 0.1)",
} as const;

export type ColorKeys = keyof typeof Colors;
