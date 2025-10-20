import { StyleSheet } from "react-native";
import { Colors, Spacing, BorderRadius, Shadows, Typography } from "../theme";

export const ComponentStyles = StyleSheet.create({
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.page,
  },

  modalContainer: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.modal,
    padding: Spacing["2xl"],
    alignItems: "center",
    maxWidth: 350,
    width: "100%",
    ...Shadows.modal,
  },

  modalIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },

  modalTitle: {
    ...Typography.heading3,
    color: Colors.text,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },

  modalMessage: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: Typography.lineHeight.relaxed,
    marginBottom: Spacing["2xl"],
  },

  modalButtonContainer: {
    flexDirection: "row",
    gap: Spacing.md,
    width: "100%",
  },

  // Toast styles
  toastContainer: {
    position: "absolute",
    top: 60,
    left: Spacing.lg,
    right: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderLeftWidth: 4,
    ...Shadows.toast,
    zIndex: 1000,
  },

  toastMessage: {
    ...Typography.bodySmall,
    fontWeight: Typography.fontWeight.medium,
    marginLeft: Spacing.md,
    flex: 1,
  },

  // Error View styles
  errorViewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing["2xl"],
    backgroundColor: Colors.background,
  },

  errorViewContent: {
    alignItems: "center",
    maxWidth: 300,
  },

  errorViewIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },

  errorViewTitle: {
    ...Typography.heading3,
    color: Colors.text,
    marginBottom: Spacing.sm,
    textAlign: "center",
  },

  errorViewMessage: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: Typography.lineHeight.relaxed,
    marginBottom: Spacing.lg,
  },

  errorViewDetailsContainer: {
    backgroundColor: Colors.surfaceSecondary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.page,
    width: "100%",
  },

  errorViewDetailsLabel: {
    ...Typography.caption,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textSecondary,
    marginBottom: 4,
  },

  errorViewDetails: {
    ...Typography.caption,
    color: Colors.textTertiary,
    fontFamily: "monospace",
  },

  // Profile/Investment specific
  pickerContainer: {
    marginBottom: Spacing["3xl"],
    position: "relative",
  },

  pickerTitle: {
    ...Typography.label,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },

  pickerCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.card,
    ...Shadows.card,
    overflow: "hidden",
    position: "relative",
  },

  pickerButton: {
    padding: Spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  pickerSelectedContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  pickerSelectedTextContainer: {
    marginLeft: Spacing.md,
    flex: 1,
  },

  pickerSelectedValue: {
    ...Typography.body,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
    marginBottom: 2,
  },

  pickerSelectedDescription: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },

  // Summary/Info styles
  summaryContainer: {
    marginBottom: Spacing["2xl"],
  },

  summaryTitle: {
    ...Typography.heading4,
    color: Colors.text,
    marginBottom: Spacing.md,
  },

  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.card,
    padding: Spacing.page,
    ...Shadows.card,
  },

  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.sm,
  },

  summaryLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginLeft: Spacing.md,
    minWidth: 60,
  },

  summaryValue: {
    ...Typography.body,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
    marginLeft: Spacing.sm,
    textTransform: "capitalize",
  },
});
