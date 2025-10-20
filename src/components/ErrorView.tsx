import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface ErrorViewProps {
  onRetry: () => void;
  message?: string;
  title?: string;
  type?: "network" | "server" | "validation" | "general";
  showRetry?: boolean;
  details?: string;
}

export default function ErrorView({
  onRetry,
  message = "Algo deu errado",
  title,
  type = "general",
  showRetry = true,
  details,
}: ErrorViewProps) {
  const getIconAndColor = () => {
    switch (type) {
      case "network":
        return { icon: "wifi-outline" as const, color: "#FF6B6B" };
      case "server":
        return { icon: "server-outline" as const, color: "#FF8E53" };
      case "validation":
        return { icon: "alert-circle-outline" as const, color: "#FFD93D" };
      default:
        return { icon: "warning-outline" as const, color: "#666" };
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case "network":
        return "Problema de Conexão";
      case "server":
        return "Erro do Servidor";
      case "validation":
        return "Dados Inválidos";
      default:
        return "Erro";
    }
  };

  const { icon, color } = getIconAndColor();
  const errorTitle = title || getDefaultTitle();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
          <Ionicons name={icon} size={48} color={color} />
        </View>

        <Text style={styles.title}>{errorTitle}</Text>
        <Text style={styles.message}>{message}</Text>

        {details && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsLabel}>Detalhes técnicos:</Text>
            <Text style={styles.details}>{details}</Text>
          </View>
        )}

        {showRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Ionicons name="refresh" size={20} color="white" />
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f8f9fa",
  },
  content: {
    alignItems: "center",
    maxWidth: 300,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 16,
  },
  detailsContainer: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
  },
  detailsLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    marginBottom: 4,
  },
  details: {
    fontSize: 12,
    color: "#888",
    fontFamily: "monospace",
  },
  retryButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
