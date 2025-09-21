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

interface ExplanationItem {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  details: string[];
}

export default function ExplicacaoScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const onRefresh = () => {
    setRefreshing(true);
    // Simular carregamento
    setTimeout(() => setRefreshing(false), 1000);
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const explanationData: ExplanationItem[] = [
    {
      id: "recommendation-process",
      title: "Como Funciona Nossa Recomendação",
      description:
        "Entenda o processo por trás das sugestões personalizadas de investimento",
      icon: "bulb",
      color: "#FF9500",
      details: [
        "Análise completa do seu perfil de investidor (suitability)",
        "Consideração do prazo dos seus objetivos (curto, médio ou longo)",
        "Avaliação da sua necessidade de liquidez",
        "Aplicação de algoritmos de otimização de portfólio",
        "Balanceamento entre risco e retorno esperado",
        "Diversificação entre diferentes classes de ativos",
      ],
    },
    {
      id: "risk-profiles",
      title: "Perfis de Risco",
      description: "Conheça os diferentes perfis e suas características",
      icon: "shield-checkmark",
      color: "#34C759",
      details: [
        "Conservador: Prioriza segurança, aceita menor rentabilidade",
        "Moderado: Equilibra risco e retorno, diversificação balanceada",
        "Arrojado: Busca alta rentabilidade, aceita maior volatilidade",
        "Cada perfil tem alocações específicas entre renda fixa e variável",
        "Rebalanceamento periódico conforme mudanças no mercado",
      ],
    },
    {
      id: "asset-classes",
      title: "Classes de Ativos",
      description: "Entenda os tipos de investimentos disponíveis",
      icon: "trending-up",
      color: "#007AFF",
      details: [
        "Renda Fixa: Tesouro Direto, CDBs, LCIs, LCAs",
        "Renda Variável: Ações, ETFs, Fundos Imobiliários",
        "Cada classe tem características específicas de risco e liquidez",
        "Diversificação reduz riscos do portfólio",
        "Rebalanceamento mantém alocação estratégica",
      ],
    },
    {
      id: "xai-technology",
      title: "Inteligência Artificial Explicável (XAI)",
      description: "Transparência total nas recomendações geradas por IA",
      icon: "hardware-chip",
      color: "#FF3B30",
      details: [
        "Cada recomendação vem com justificativa clara",
        "Explicamos porque cada ativo foi selecionado",
        "Mostramos como seu perfil influencia as escolhas",
        "Transparência total no processo de decisão",
        'Você sempre entende o "porquê" de cada sugestão',
      ],
    },
    {
      id: "investment-objectives",
      title: "Objetivos de Investimento",
      description: "Como o prazo influencia suas recomendações",
      icon: "time",
      color: "#8E44AD",
      details: [
        "Curto Prazo (até 2 anos): Foco em liquidez e segurança",
        "Médio Prazo (2-5 anos): Equilibrio entre crescimento e estabilidade",
        "Longo Prazo (5+ anos): Maior exposição a ativos de crescimento",
        "Horizonte temporal define estratégia de alocação",
        "Objetivos específicos orientam seleção de produtos",
      ],
    },
    {
      id: "portfolio-rebalancing",
      title: "Rebalanceamento de Portfólio",
      description: "Mantendo sua estratégia alinhada ao longo do tempo",
      icon: "refresh-circle",
      color: "#17A2B8",
      details: [
        "Revisão periódica das alocações do portfólio",
        "Ajustes baseados em mudanças no mercado",
        "Realinhamento com objetivos pessoais",
        "Manutenção do perfil de risco desejado",
        "Otimização contínua da relação risco-retorno",
      ],
    },
  ];

  const ExplanationCard = ({ item }: { item: ExplanationItem }) => {
    const isExpanded = expandedItems.has(item.id);

    return (
      <View style={styles.explanationCard}>
        <TouchableOpacity
          style={styles.explanationHeader}
          onPress={() => toggleExpanded(item.id)}
        >
          <View
            style={[
              styles.explanationIcon,
              { backgroundColor: item.color + "20" },
            ]}
          >
            <Ionicons name={item.icon} size={24} color={item.color} />
          </View>
          <View style={styles.explanationContent}>
            <Text style={styles.explanationTitle}>{item.title}</Text>
            <Text style={styles.explanationDescription}>
              {item.description}
            </Text>
          </View>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="#666"
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.explanationDetails}>
            {item.details.map((detail, index) => (
              <View key={index} style={styles.detailItem}>
                <View
                  style={[styles.detailBullet, { backgroundColor: item.color }]}
                />
                <Text style={styles.detailText}>{detail}</Text>
              </View>
            ))}
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
            <Ionicons name="bulb" size={32} color="white" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Explicações</Text>
            <Text style={styles.headerSubtitle}>
              Entenda como funcionam os investimentos
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="people" size={24} color="#007AFF" />
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Perfis de Risco</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="layers" size={24} color="#34C759" />
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Classes de Ativos</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="analytics" size={24} color="#FF9500" />
            <Text style={styles.statNumber}>XAI</Text>
            <Text style={styles.statLabel}>Transparente</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Como Funciona</Text>
        <Text style={styles.sectionSubtitle}>
          Toque em cada item para expandir e ver mais detalhes sobre nosso
          processo de recomendação.
        </Text>

        {explanationData.map((item) => (
          <ExplanationCard key={item.id} item={item} />
        ))}
      </View>

      {/* Technology Section */}
      <View style={styles.technologyContainer}>
        <Text style={styles.sectionTitle}>Nossa Tecnologia</Text>
        <View style={styles.technologyCard}>
          <View style={styles.technologyHeader}>
            <Ionicons name="rocket" size={28} color="#FF3B30" />
            <Text style={styles.technologyTitle}>Assessor XP Inteligente</Text>
          </View>
          <Text style={styles.technologyDescription}>
            Utilizamos algoritmos avançados de machine learning combinados com
            expertise financeira para criar recomendações personalizadas que se
            adaptam ao seu perfil e objetivos únicos.
          </Text>
          <View style={styles.technologyFeatures}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={16} color="#34C759" />
              <Text style={styles.featureText}>Análise em tempo real</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={16} color="#34C759" />
              <Text style={styles.featureText}>Explicações transparentes</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={16} color="#34C759" />
              <Text style={styles.featureText}>
                Recomendações personalizadas
              </Text>
            </View>
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
    backgroundColor: "#FF9500",
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
  statsContainer: {
    padding: 20,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
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
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  contentContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
    marginBottom: 24,
  },
  explanationCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  explanationHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  explanationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  explanationContent: {
    flex: 1,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  explanationDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 18,
  },
  explanationDetails: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  detailBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    marginRight: 12,
  },
  detailText: {
    flex: 1,
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  technologyContainer: {
    padding: 20,
  },
  technologyCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  technologyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  technologyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginLeft: 12,
  },
  technologyDescription: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
    marginBottom: 16,
  },
  technologyFeatures: {
    gap: 8,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 8,
  },
  bottomSpacer: {
    height: 20,
  },
});
