import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  visible: boolean;
  duration?: number;
  onHide: () => void;
}

export default function Toast({
  message,
  type = "info",
  visible,
  duration = 3000,
  onHide,
}: ToastProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      // Animar entrada
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto-hide após duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  };

  const getToastConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: "checkmark-circle" as const,
          color: "#34C759",
          backgroundColor: "#E8F5E8",
        };
      case "error":
        return {
          icon: "close-circle" as const,
          color: "#FF3B30",
          backgroundColor: "#FFE8E8",
        };
      case "warning":
        return {
          icon: "warning" as const,
          color: "#FF9500",
          backgroundColor: "#FFF3E0",
        };
      default:
        return {
          icon: "information-circle" as const,
          color: "#007AFF",
          backgroundColor: "#E8F4FF",
        };
    }
  };

  if (!visible) return null;

  const config = getToastConfig();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          backgroundColor: config.backgroundColor,
          borderLeftColor: config.color,
        },
      ]}
    >
      <Ionicons name={config.icon} size={24} color={config.color} />
      <Text style={[styles.message, { color: config.color }]}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  message: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 12,
    flex: 1,
  },
});
