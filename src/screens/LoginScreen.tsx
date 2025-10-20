import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../App";
import { saveSession } from "../services/storage";
import { ValidationError, getErrorMessage } from "../services/api";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";

export default function LoginScreen() {
  const { setSession } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const { toasts, showError, showSuccess, hideToast } = useToast();

  const validateEmail = (email: string): boolean => {
    setEmailError("");

    if (!email) {
      setEmailError("E-mail é obrigatório");
      return false;
    }

    if (!email.trim()) {
      setEmailError("E-mail não pode estar vazio");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Formato de e-mail inválido");
      return false;
    }

    if (email.length > 100) {
      setEmailError("E-mail muito longo (máximo 100 caracteres)");
      return false;
    }

    return true;
  };

  async function onLogin() {
    if (!validateEmail(email)) {
      showError("Por favor, corrija os erros no formulário");
      return;
    }

    try {
      setLoading(true);

      // Simular delay de rede para mostrar loading
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validação adicional para domínios específicos (exemplo)
      const allowedDomains = [
        "gmail.com",
        "hotmail.com",
        "outlook.com",
        "yahoo.com",
        "xp.com.br",
      ];
      const domain = email.split("@")[1];

      if (!allowedDomains.includes(domain)) {
        throw new ValidationError(
          "email",
          "Domínio de e-mail não permitido para esta demonstração"
        );
      }

      const session = { email: email.trim().toLowerCase() };
      await saveSession(session);

      showSuccess("Login realizado com sucesso!");

      // Pequeno delay para mostrar o toast de sucesso
      setTimeout(() => {
        setSession(session);
      }, 500);
    } catch (e) {
      console.error("Erro no login:", e);
      const errorMessage = getErrorMessage(e);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const onEmailChange = (text: string) => {
    setEmail(text);
    // Limpar erro quando o usuário começar a digitar
    if (emailError) {
      setEmailError("");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="trending-up" size={48} color="#007AFF" />
          </View>
          <Text style={styles.title}>Assessor XP</Text>
          <Text style={styles.subtitle}>Seu assistente de investimentos</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-mail</Text>
            <View
              style={[
                styles.inputWrapper,
                emailError ? styles.inputError : null,
              ]}
            >
              <Ionicons
                name="mail-outline"
                size={20}
                color={emailError ? "#FF3B30" : "#666"}
                style={styles.inputIcon}
              />
              <TextInput
                value={email}
                onChangeText={onEmailChange}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="seu@email.com"
                style={styles.textInput}
                editable={!loading}
                autoComplete="email"
                textContentType="emailAddress"
              />
            </View>
            {emailError ? (
              <View style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={16} color="#FF3B30" />
                <Text style={styles.errorText}>{emailError}</Text>
              </View>
            ) : null}
          </View>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={onLogin}
            disabled={loading || !!emailError}
          >
            <View style={styles.loginButtonContent}>
              {loading ? (
                <Ionicons name="hourglass" size={20} color="white" />
              ) : (
                <Ionicons name="log-in" size={20} color="white" />
              )}
              <Text style={styles.loginButtonText}>
                {loading ? "Entrando..." : "Entrar"}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.infoContainer}>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color="#666"
            />
            <Text style={styles.infoText}>
              Os dados de sessão ficam armazenados localmente no dispositivo
            </Text>
          </View>
        </View>
      </View>

      {/* Renderizar toasts */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          visible={toast.visible}
          duration={toast.duration}
          onHide={() => hideToast(toast.id)}
        />
      ))}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E8F4FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  form: {
    gap: 24,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  inputError: {
    borderColor: "#FF3B30",
    backgroundColor: "#FFF5F5",
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: "#1a1a1a",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  errorText: {
    fontSize: 14,
    color: "#FF3B30",
    marginLeft: 6,
  },
  loginButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonDisabled: {
    backgroundColor: "#999",
  },
  loginButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F0F8FF",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#007AFF",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
});
