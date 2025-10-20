import { Colors } from "./colors";
import { Typography } from "./typography";
import { Spacing, BorderRadius, Layout } from "./spacing";
import { Shadows } from "./shadows";

export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  layout: Layout,
  shadows: Shadows,
} as const;

export { Colors, Typography, Spacing, BorderRadius, Layout, Shadows };

export type Theme = typeof Theme;
