import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  api,
  Profile,
  Recommendation,
  getErrorMessage,
  NetworkError,
  APIError,
} from "../services/api";
import ErrorView from "../components/ErrorView";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";

const { width } = Dimensions.get("window");

export default function RecomendacaoScreen() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [rec, setRec] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
  const [error, setError] = useState<{
    message: string;
    type: "network" | "server" | "general";
  } | null>(null);
  const { toasts, showError, showSuccess, showWarning, hideToast } = useToast();

  async function loadProfiles() {
    try {
      setError(null);
      const list = await api.listProfiles();
      setProfiles(list);

      if (list.length === 0) {
        showWarning(
          'Nenhum perfil encontrado. Crie um perfil primeiro na aba "Perfil".'
        );
      }
    } catch (error) {
      console.error("Erro ao carregar perfis:", error);
      const errorMessage = getErrorMessage(error);

      if (error instanceof NetworkError) {
        setError({ message: errorMessage, type: "network" });
      } else if (error instanceof APIError) {
        setError({ message: errorMessage, type: "server" });
      } else {
        setError({ message: errorMessage, type: "general" });
      }
    } finally {
      setRefreshing(false);
    }
  }

  const onRefresh = () => {
    setRefreshing(true);
    setError(null);
    loadProfiles();
  };

  async function gerarRecomendacao() {
    if (!profiles.length) {
      showWarning(
        'Você precisa criar um perfil de investidor primeiro. Vá para a aba "Perfil" para criar seu perfil.'
      );
      return;
    }

    try {
      setLoading(true);
      const profileToUse =
        profiles[selectedProfileIndex] || profiles[profiles.length - 1];
      const r = await api.createRecommendation(profileToUse.id);
      setRec(r);
      showSuccess("Recomendação personalizada gerada com base no seu perfil!");
    } catch (error) {
      console.error("Erro ao gerar recomendação:", error);
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfiles();
  }, []);

  const getAssetIcon = (nome: string) => {
    if (
      nome.toLowerCase().includes("tesouro") ||
      nome.toLowerCase().includes("cdb")
    ) {
      return "shield-checkmark";
    }
    return "trending-up";
  };

  const getAssetColor = (nome: string) => {
    if (
      nome.toLowerCase().includes("tesouro") ||
      nome.toLowerCase().includes("cdb")
    ) {
      return "#34C759";
    }
    return "#007AFF";
  };

  const getRiskColor = (suitability: string) => {
    const colors = {
      conservador: "#34C759",
      moderado: "#007AFF",
      arrojado: "#FF3B30",
    };
    return colors[suitability as keyof typeof colors] || "#666";
  };

  const ProfileSelector = () => (
    <View style={styles.profileSelectorContainer}>
      <Text style={styles.sectionTitle}>Selecionar Perfil</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {profiles.map((profile, index) => (
          <TouchableOpacity
            key={profile.id}
            style={[
              styles.profileOption,
              selectedProfileIndex === index && styles.profileOptionSelected,
            ]}
            onPress={() => setSelectedProfileIndex(index)}
          >
            <View
              style={[
                styles.profileOptionIcon,
                { backgroundColor: getRiskColor(profile.suitability) + "20" },
              ]}
            >
              <Ionicons
                name={
                  profile.suitability === "conservador"
                    ? "shield-checkmark"
                    : profile.suitability === "moderado"
                    ? "trending-up"
                    : "rocket"
                }
                size={20}
                color={getRiskColor(profile.suitability)}
              />
            </View>
            <Text
              style={[
                styles.profileOptionText,
                selectedProfileIndex === index &&
                  styles.profileOptionTextSelected,
              ]}
            >
              #{index + 1}
            </Text>
            <Text style={styles.profileOptionDetail}>
              {profile.suitability}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const RecommendationCard = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => (
    <View style={styles.recommendationItem}>
      <View style={styles.recommendationHeader}>
        <View style={styles.recommendationIconContainer}>
          <Ionicons
            name={getAssetIcon(item.nome)}
            size={24}
            color={getAssetColor(item.nome)}
          />
        </View>
        <View style={styles.recommendationInfo}>
          <Text style={styles.recommendationName}>{item.nome}</Text>
          <Text style={styles.recommendationClass}>
            {item.nome.toLowerCase().includes("tesouro") ||
            item.nome.toLowerCase().includes("cdb")
              ? "Renda Fixa"
              : "Renda Variável"}
          </Text>
        </View>
        <View style={styles.recommendationPercentage}>
          <Text style={styles.percentageText}>
            {(item.peso * 100).toFixed(0)}%
          </Text>
        </View>
      </View>

      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${item.peso * 100}%`,
              backgroundColor: getAssetColor(item.nome),
            },
          ]}
        />
      </View>

      <View style={styles.recommendationExplanation}>
        <Ionicons name="bulb-outline" size={16} color="#FF9500" />
        <Text style={styles.explanationText}>{item.xai}</Text>
      </View>
    </View>
  );

  if (error) {
    return (
      <ErrorView
        onRetry={loadProfiles}
        message={error.message}
        type={error.type}
        title="Erro ao Carregar Dados"
      />
    );
  }

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
            <Ionicons name="trending-up" size={32} color="white" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Recomendações</Text>
            <Text style={styles.headerSubtitle}>
              Sugestões personalizadas de investimento
            </Text>
          </View>
        </View>
      </View>

      {/* Profile Selector */}
      {profiles.length > 0 && <ProfileSelector />}

      {/* Generate Button */}
      <View style={styles.generateContainer}>
        <TouchableOpacity
          style={[
            styles.generateButton,
            loading && styles.generateButtonDisabled,
          ]}
          onPress={gerarRecomendacao}
          disabled={loading || profiles.length === 0}
        >
          <View style={styles.generateButtonContent}>
            {loading ? (
              <Ionicons name="hourglass" size={24} color="white" />
            ) : (
              <Ionicons name="sparkles" size={24} color="white" />
            )}
            <Text style={styles.generateButtonText}>
              {loading ? "Gerando Recomendação..." : "Gerar Nova Recomendação"}
            </Text>
          </View>
        </TouchableOpacity>

        {profiles.length === 0 && (
          <View style={styles.noProfileWarning}>
            <Ionicons name="warning-outline" size={24} color="#FF9500" />
            <Text style={styles.warningText}>
              Crie um perfil primeiro na aba "Perfil" para receber recomendações
              personalizadas.
            </Text>
          </View>
        )}
      </View>

      {/* Recommendation Results */}
      {rec ? (
        <View style={styles.recommendationContainer}>
          <Text style={styles.sectionTitle}>
            Sua Recomendação Personalizada
          </Text>

          {/* Summary Card */}
          {rec.resumo && (
            <View style={styles.summaryCard}>
              <View style={styles.summaryHeader}>
                <Ionicons name="document-text" size={24} color="#007AFF" />
                <Text style={styles.summaryTitle}>Resumo da Estratégia</Text>
              </View>
              <Text style={styles.summaryText}>{rec.resumo}</Text>
            </View>
          )}

          {/* Portfolio Allocation */}
          <View style={styles.allocationContainer}>
            <Text style={styles.allocationTitle}>Alocação Recomendada</Text>
            <View style={styles.allocationChart}>
              {rec.items.map((item, index) => (
                <RecommendationCard
                  key={item.assetId}
                  item={item}
                  index={index}
                />
              ))}
            </View>
          </View>

          {/* Portfolio Summary */}
          <View style={styles.portfolioSummary}>
            <Text style={styles.summaryTitle}>Composição do Portfólio</Text>
            <View style={styles.compositionGrid}>
              <View style={styles.compositionItem}>
                <Ionicons name="shield-checkmark" size={20} color="#34C759" />
                <Text style={styles.compositionLabel}>Renda Fixa</Text>
                <Text style={styles.compositionValue}>
                  {(
                    rec.items
                      .filter(
                        (item) =>
                          item.nome.toLowerCase().includes("tesouro") ||
                          item.nome.toLowerCase().includes("cdb")
                      )
                      .reduce((acc, item) => acc + item.peso, 0) * 100
                  ).toFixed(0)}
                  %
                </Text>
              </View>
              <View style={styles.compositionItem}>
                <Ionicons name="trending-up" size={20} color="#007AFF" />
                <Text style={styles.compositionLabel}>Renda Variável</Text>
                <Text style={styles.compositionValue}>
                  {(
                    rec.items
                      .filter(
                        (item) =>
                          !item.nome.toLowerCase().includes("tesouro") &&
                          !item.nome.toLowerCase().includes("cdb")
                      )
                      .reduce((acc, item) => acc + item.peso, 0) * 100
                  ).toFixed(0)}
                  %
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setRec(null)}
            >
              <Ionicons name="refresh" size={20} color="#007AFF" />
              <Text style={styles.secondaryButtonText}>Nova Recomendação</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyState}>
            <Ionicons name="trending-up-outline" size={64} color="#ccc" />
            <Text style={styles.emptyStateTitle}>Nenhuma Recomendação</Text>
            <Text style={styles.emptyStateText}>
              Gere uma recomendação personalizada baseada no seu perfil de
              investidor.
            </Text>
          </View>
        </View>
      )}

      <View style={styles.bottomSpacer} />

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerContainer: {
    backgroundColor: "#34C759",
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
  profileSelectorContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  profileOption: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 80,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileOptionSelected: {
    borderColor: "#007AFF",
    backgroundColor: "#F0F8FF",
  },
  profileOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  profileOptionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 4,
  },
  profileOptionTextSelected: {
    color: "#007AFF",
  },
  profileOptionDetail: {
    fontSize: 12,
    color: "#999",
    textTransform: "capitalize",
  },
  generateContainer: {
    padding: 20,
  },
  generateButton: {
    backgroundColor: "#34C759",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  generateButtonDisabled: {
    backgroundColor: "#999",
  },
  generateButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  generateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  noProfileWarning: {
    backgroundColor: "#FFF8E7",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#FF9500",
  },
  warningText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: "#B8860B",
    lineHeight: 20,
  },
  recommendationContainer: {
    padding: 20,
  },
  summaryCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginLeft: 12,
  },
  summaryText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
  },
  allocationContainer: {
    marginBottom: 20,
  },
  allocationTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  allocationChart: {
    gap: 16,
  },
  recommendationItem: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  recommendationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  recommendationInfo: {
    flex: 1,
  },
  recommendationName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  recommendationClass: {
    fontSize: 14,
    color: "#666",
  },
  recommendationPercentage: {
    alignItems: "flex-end",
  },
  percentageText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    marginBottom: 12,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
  recommendationExplanation: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFF8E7",
    padding: 12,
    borderRadius: 8,
  },
  explanationText: {
    flex: 1,
    fontSize: 14,
    color: "#B8860B",
    marginLeft: 8,
    lineHeight: 18,
  },
  portfolioSummary: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  compositionGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  compositionItem: {
    alignItems: "center",
    flex: 1,
  },
  compositionLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    marginBottom: 4,
  },
  compositionValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  secondaryButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  emptyStateContainer: {
    padding: 20,
    minHeight: 300,
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 280,
  },
  bottomSpacer: {
    height: 20,
  },
});
