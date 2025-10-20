import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

export default function AjudaScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<Set<string>>(new Set());

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };
  const toggleFAQ = (id: string) => {
    const newExpanded = new Set(expandedFAQ);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedFAQ(newExpanded);
  };

  const faqData: FAQItem[] = [
    {
      id: "profile",
      question: "Como criar meu perfil de investidor?",
      answer:
        'Vá até a aba "Perfil" e preencha as informações sobre seu perfil de risco (conservador, moderado ou arrojado), objetivo de investimento e necessidade de liquidez. Essas informações são essenciais para gerar recomendações personalizadas.',
      icon: "person",
      color: "#34C759",
    },
    {
      id: "recommendations",
      question: "Como funcionam as recomendações?",
      answer:
        'Após criar seu perfil, vá para a aba "Recomendar" e clique em "Gerar Nova Recomendação". Nosso algoritmo analisará seu perfil e criará uma sugestão personalizada de portfólio com explicações detalhadas.',
      icon: "trending-up",
      color: "#FF9500",
    },
    {
      id: "understand",
      question: "Não entendi uma recomendação, o que fazer?",
      answer:
        'Cada recomendação vem com explicações XAI (Inteligência Artificial Explicável). Leia as justificativas de cada ativo. Você também pode consultar a aba "Explicações" para entender melhor os conceitos de investimento.',
      icon: "help-circle",
      color: "#8E44AD",
    },
    {
      id: "offline",
      question: "Posso usar o app sem internet?",
      answer:
        "Algumas funcionalidades básicas funcionam offline, mas para gerar novas recomendações e sincronizar dados, você precisa de conexão com a internet. Os dados já carregados ficam disponíveis offline.",
      icon: "wifi",
      color: "#6C757D",
    },
  ];

  const FAQCard = ({ item }: { item: FAQItem }) => {
    const isExpanded = expandedFAQ.has(item.id);

    return (
      <View style={styles.faqCard}>
        <TouchableOpacity
          style={styles.faqHeader}
          onPress={() => toggleFAQ(item.id)}
        >
          <View
            style={[styles.faqIcon, { backgroundColor: item.color + "20" }]}
          >
            <Ionicons name={item.icon} size={20} color={item.color} />
          </View>
          <Text style={styles.faqQuestion}>{item.question}</Text>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="#666"
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.faqAnswer}>
            <Text style={styles.faqAnswerText}>{item.answer}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <Ionicons name="help-circle" size={32} color="white" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Ajuda & Suporte</Text>
            <Text style={styles.headerSubtitle}>
              Estamos aqui para ajudar você
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Precisa de Ajuda Rápida?</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => toggleFAQ("profile")}
          >
            <Ionicons name="person" size={24} color="#34C759" />
            <Text style={styles.quickActionText}>Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => toggleFAQ("recommendations")}
          >
            <Ionicons name="trending-up" size={24} color="#FF9500" />
            <Text style={styles.quickActionText}>Recomendações</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* FAQ Section */}
      <View style={styles.faqContainer}>
        <Text style={styles.sectionTitle}>Perguntas Frequentes</Text>
        <Text style={styles.sectionSubtitle}>
          Toque em uma pergunta para ver a resposta detalhada.
        </Text>

        {faqData.map((item) => (
          <FAQCard key={item.id} item={item} />
        ))}
      </View>

      {/* App Info */}
      <View style={styles.appInfoContainer}>
        <View style={styles.appInfoCard}>
          <View style={styles.appInfoHeader}>
            <Ionicons name="information-circle" size={24} color="#007AFF" />
            <Text style={styles.appInfoTitle}>Informações do App</Text>
          </View>
          <View style={styles.appInfoDetails}>
            <Text style={styles.appInfoItem}>📱 Versão: 1.0.0</Text>
            <Text style={styles.appInfoItem}>🔄 Última atualização: Hoje</Text>
            <Text style={styles.appInfoItem}>🏢 XP Investimentos</Text>
            <Text style={styles.appInfoItem}>📧 Sprint 4 - Mobile</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerContainer: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  quickActionsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickAction: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  faqContainer: {
    padding: 20,
  },
  faqCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  faqHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  faqIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  faqAnswerText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },

  appInfoContainer: {
    padding: 20,
  },
  appInfoCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  appInfoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  appInfoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginLeft: 12,
  },
  appInfoDetails: {
    gap: 8,
  },
  appInfoItem: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 20,
  },
});
