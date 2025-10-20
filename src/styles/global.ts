import { StyleSheet } from "react-native";
import { Colors, Typography, Spacing, Shadows, BorderRadius } from "../theme";

export const GlobalStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  containerPadded: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.page,
  },

  // Flex utilities
  flex1: {
    flex: 1,
  },

  flexRow: {
    flexDirection: "row",
  },

  flexCenter: {
    justifyContent: "center",
    alignItems: "center",
  },

  flexBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Text styles
  textCenter: {
    textAlign: "center",
  },

  textPrimary: {
    color: Colors.text,
  },

  textSecondary: {
    color: Colors.textSecondary,
  },

  textWhite: {
    color: Colors.surface,
  },

  // Loading states
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    gap: Spacing.lg,
  },

  loadingText: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },

  // Card styles
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.card,
    ...Shadows.card,
  },

  cardPadded: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.card,
    padding: Spacing.card,
    ...Shadows.card,
  },

  // Header styles
  headerContainer: {
    paddingHorizontal: Spacing.page,
    paddingTop: Spacing.page,
    paddingBottom: Spacing["3xl"],
  },

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTextContainer: {
    flex: 1,
  },

  headerTitle: {
    ...Typography.heading2,
    color: Colors.surface,
    marginBottom: 4,
  },

  headerSubtitle: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    marginBottom: 4,
  },

  // Section styles
  sectionContainer: {
    padding: Spacing.page,
  },

  sectionTitle: {
    ...Typography.heading3,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },

  sectionSubtitle: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },

  // Button styles base
  buttonBase: {
    borderRadius: BorderRadius.button,
    paddingVertical: Spacing.button,
    paddingHorizontal: Spacing.lg,
    ...Shadows.button,
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    ...Typography.button,
  },

  buttonIcon: {
    marginRight: Spacing.sm,
  },

  // Input styles base
  inputContainer: {
    marginBottom: Spacing.lg,
  },

  inputLabel: {
    ...Typography.label,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.input,
    paddingHorizontal: Spacing.input,
    ...Shadows.small,
  },

  inputWrapperError: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorLight,
  },

  textInput: {
    flex: 1,
    paddingVertical: Spacing.input,
    ...Typography.body,
    color: Colors.text,
  },

  inputIcon: {
    marginRight: Spacing.md,
  },

  // Error styles
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  errorText: {
    ...Typography.bodySmall,
    color: Colors.error,
    marginLeft: 6,
  },

  // Spacer utilities
  bottomSpacer: {
    height: Spacing.page,
  },

  verticalSpacer: {
    height: Spacing.lg,
  },

  horizontalSpacer: {
    width: Spacing.lg,
  },
});
