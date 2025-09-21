import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { api, Profile, Recommendation } from "../services/api";

interface HomeScreenProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const [profilesData] = await Promise.all([api.listProfiles()]);
      setProfiles(profilesData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "perfil":
        navigation.navigate("Perfil");
        break;
      case "recomendar":
        navigation.navigate("Recomendar");
        break;
      case "explicacoes":
        navigation.navigate("Explicações");
        break;
      case "ajuda":
        navigation.navigate("Ajuda");
        break;
    }
  };

  const QuickActionCard = ({
    title,
    subtitle,
    icon,
    action,
    color,
  }: {
    title: string;
    subtitle: string;
    icon: keyof typeof Ionicons.glyphMap;
    action: string;
    color: string;
  }) => (
    <TouchableOpacity
      style={[styles.quickActionCard, { borderLeftColor: color }]}
      onPress={() => handleQuickAction(action)}
    >
      <View style={styles.quickActionContent}>
        <View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <View style={styles.quickActionText}>
          <Text style={styles.quickActionTitle}>{title}</Text>
          <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header de Boas-vindas */}
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Bem-vindo ao</Text>
        <Text style={styles.appTitle}>Assessor XP</Text>
        <Text style={styles.subtitle}>
          Sua plataforma de investimentos inteligentes
        </Text>
      </View>

      {/* Resumo do Portfólio */}
      <View style={styles.portfolioContainer}>
        <Text style={styles.sectionTitle}>Resumo do Portfólio</Text>
        <View style={styles.portfolioCard}>
          {profiles.length > 0 ? (
            <>
              <View style={styles.portfolioItem}>
                <Text style={styles.portfolioLabel}>Perfis Cadastrados</Text>
                <Text style={styles.portfolioValue}>{profiles.length}</Text>
              </View>
              <View style={styles.portfolioItem}>
                <Text style={styles.portfolioLabel}>Último Perfil</Text>
                <Text style={styles.portfolioValue}>
                  {profiles[profiles.length - 1]?.suitability || "N/A"}
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="pie-chart-outline" size={48} color="#ccc" />
              <Text style={styles.emptyStateText}>
                Nenhum perfil cadastrado ainda
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Crie seu primeiro perfil para começar
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Ações Rápidas */}
      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>

        <QuickActionCard
          title="Criar Perfil"
          subtitle="Configure seu perfil de investidor"
          icon="person-add"
          action="perfil"
          color="#007AFF"
        />

        <QuickActionCard
          title="Obter Recomendações"
          subtitle="Receba sugestões personalizadas"
          icon="trending-up"
          action="recomendar"
          color="#34C759"
        />

        <QuickActionCard
          title="Explicações"
          subtitle="Entenda como funcionam os investimentos"
          icon="bulb"
          action="explicacoes"
          color="#FF9500"
        />

        <QuickActionCard
          title="Ajuda"
          subtitle="Tire suas dúvidas e obtenha suporte"
          icon="help-circle"
          action="ajuda"
          color="#FF3B30"
        />
      </View>

      {/* Dicas Rápidas */}
      <View style={styles.tipsContainer}>
        <Text style={styles.sectionTitle}>Dica do Dia</Text>
        <View style={styles.tipCard}>
          <View style={styles.tipIcon}>
            <Ionicons name="bulb" size={24} color="#FF9500" />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Diversificação é fundamental</Text>
            <Text style={styles.tipText}>
              Nunca coloque todos os ovos na mesma cesta. Diversifique seus
              investimentos entre diferentes classes de ativos para reduzir
              riscos.
            </Text>
          </View>
        </View>
      </View>

      {/* Informações do Mercado */}
      <View style={styles.marketContainer}>
        <Text style={styles.sectionTitle}>Status do Sistema</Text>
        <View style={styles.marketCard}>
          <View style={styles.statusItem}>
            <View
              style={[styles.statusIndicator, { backgroundColor: "#34C759" }]}
            />
            <Text style={styles.statusText}>API Conectada</Text>
          </View>
          <View style={styles.statusItem}>
            <View
              style={[styles.statusIndicator, { backgroundColor: "#34C759" }]}
            />
            <Text style={styles.statusText}>Recomendações Ativas</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  headerContainer: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 4,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  portfolioContainer: {
    padding: 20,
  },
  portfolioCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  portfolioItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  portfolioLabel: {
    fontSize: 16,
    color: "#666",
  },
  portfolioValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 30,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    marginTop: 16,
    textAlign: "center",
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  quickActionCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  quickActionText: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  tipsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tipCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tipIcon: {
    marginRight: 16,
    marginTop: 4,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  marketContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  marketCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  statusText: {
    fontSize: 16,
    color: "#666",
  },
  bottomSpacer: {
    height: 20,
  },
});
