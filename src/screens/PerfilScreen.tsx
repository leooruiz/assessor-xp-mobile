import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  api,
  Profile,
  getErrorMessage,
  NetworkError,
  APIError,
} from "../services/api";
import { clearSession } from "../services/storage";
import { useAuth } from "../../App";
import ErrorView from "../components/ErrorView";
import Toast from "../components/Toast";
import ConfirmModal from "../components/ConfirmModal";
import { useToast } from "../hooks/useToast";

export default function PerfilScreen() {
  const { session, setSession } = useAuth();
  const [suitability, setSuitability] = useState<
    "conservador" | "moderado" | "arrojado"
  >("moderado");
  const [objetivo, setObjetivo] = useState<"curto" | "medio" | "longo">(
    "longo"
  );
  const [liquidez, setLiquidez] = useState<"baixa" | "media" | "alta">("media");
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [error, setError] = useState<{
    message: string;
    type: "network" | "server" | "general";
  } | null>(null);
  const { toasts, showError, showSuccess, showWarning, hideToast } = useToast();

  const loadProfiles = async () => {
    try {
      setError(null);
      const profilesList = await api.listProfiles();
      setProfiles(profilesList);
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
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setError(null);
    loadProfiles();
  };

  const validateProfile = (): boolean => {
    if (!suitability || !objetivo || !liquidez) {
      showError("Por favor, preencha todos os campos do perfil");
      return false;
    }
    return true;
  };

  async function onSalvar() {
    if (!validateProfile()) {
      return;
    }

    try {
      setSaving(true);
      const p = await api.createProfile({ suitability, objetivo, liquidez });
      setProfile(p);
      showSuccess(`Perfil criado com sucesso! ID: ${p.id}`);
      loadProfiles();
    } catch (e: any) {
      console.error("Erro ao salvar perfil:", e);
      const errorMessage = getErrorMessage(e);
      showError(errorMessage);
    } finally {
      setSaving(false);
    }
  }

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const performLogout = async () => {
    try {
      setLoggingOut(true);

      // Simular delay para mostrar loading
      await new Promise((resolve) => setTimeout(resolve, 500));

      await clearSession();
      setShowLogoutModal(false);
      showSuccess("Logout realizado com sucesso!");

      // Pequeno delay para mostrar o toast
      setTimeout(() => {
        setSession(null);
      }, 800);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      setShowLogoutModal(false);
      showError("Erro ao fazer logout. Tente novamente.");
    } finally {
      setLoggingOut(false);
    }
  };
  const getSuitabilityInfo = (type: string) => {
    const info = {
      conservador: {
        icon: "shield-checkmark" as keyof typeof Ionicons.glyphMap,
        color: "#34C759",
        description:
          "Prefere investimentos seguros com menor risco e retorno estável",
      },
      moderado: {
        icon: "trending-up" as keyof typeof Ionicons.glyphMap,
        color: "#007AFF",
        description: "Aceita algum risco em busca de retornos maiores",
      },
      arrojado: {
        icon: "rocket" as keyof typeof Ionicons.glyphMap,
        color: "#FF3B30",
        description: "Disposto a assumir maiores riscos por retornos elevados",
      },
    };
    return info[type as keyof typeof info];
  };

  const getObjetivoInfo = (type: string) => {
    const info = {
      curto: {
        icon: "time" as keyof typeof Ionicons.glyphMap,
        description: "Até 2 anos",
      },
      medio: {
        icon: "calendar" as keyof typeof Ionicons.glyphMap,
        description: "2 a 5 anos",
      },
      longo: {
        icon: "hourglass" as keyof typeof Ionicons.glyphMap,
        description: "Mais de 5 anos",
      },
    };
    return info[type as keyof typeof info];
  };

  const getLiquidezInfo = (type: string) => {
    const info = {
      baixa: {
        icon: "lock-closed" as keyof typeof Ionicons.glyphMap,
        description: "Pode aguardar para resgatar",
      },
      media: {
        icon: "time-outline" as keyof typeof Ionicons.glyphMap,
        description: "Resgates eventuais",
      },
      alta: {
        icon: "flash" as keyof typeof Ionicons.glyphMap,
        description: "Precisa de acesso rápido",
      },
    };
    return info[type as keyof typeof info];
  };

  const CustomPicker = ({
    title,
    selectedValue,
    onValueChange,
    options,
    getInfo,
  }: {
    title: string;
    selectedValue: string;
    onValueChange: (value: any) => void;
    options: { label: string; value: string }[];
    getInfo: (type: string) => any;
  }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const currentInfo = getInfo(selectedValue);
    const selectedOption = options.find((opt) => opt.value === selectedValue);

    return (
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerTitle}>{title}</Text>
        <TouchableOpacity
          style={styles.pickerCard}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.pickerDisplay}>
            <View style={styles.selectedValueContainer}>
              <Ionicons
                name={currentInfo.icon}
                size={24}
                color={currentInfo.color || "#007AFF"}
              />
              <View style={styles.selectedTextContainer}>
                <Text style={styles.selectedValueText}>
                  {selectedOption?.label}
                </Text>
                <Text style={styles.selectedDescriptionText}>
                  {currentInfo.description}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </View>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{title}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.optionsList}>
                {options.map((option) => {
                  const optionInfo = getInfo(option.value);
                  const isSelected = option.value === selectedValue;
                  return (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.optionItem,
                        isSelected && styles.selectedOptionItem,
                      ]}
                      onPress={() => {
                        onValueChange(option.value);
                        setModalVisible(false);
                      }}
                    >
                      <View style={styles.optionContent}>
                        <Ionicons
                          name={optionInfo.icon}
                          size={24}
                          color={optionInfo.color || "#007AFF"}
                        />
                        <View style={styles.optionTextContainer}>
                          <Text
                            style={[
                              styles.optionLabel,
                              isSelected && styles.selectedOptionLabel,
                            ]}
                          >
                            {option.label}
                          </Text>
                          <Text style={styles.optionDescription}>
                            {optionInfo.description}
                          </Text>
                        </View>
                        {isSelected && (
                          <Ionicons
                            name="checkmark"
                            size={20}
                            color="#007AFF"
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="hourglass" size={24} color="#007AFF" />
        <Text style={styles.loadingText}>Carregando perfis...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <ErrorView
        onRetry={loadProfiles}
        message={error.message}
        type={error.type}
        title="Erro ao Carregar Perfis"
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
            <Ionicons name="person" size={32} color="white" />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Perfil do Investidor</Text>
            <Text style={styles.headerSubtitle}>
              Configure suas preferências de investimento
            </Text>
            {session && (
              <Text style={styles.userEmail}>Logado como: {session.email}</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? (
              <Ionicons name="hourglass" size={20} color="white" />
            ) : (
              <Ionicons name="log-out-outline" size={20} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Perfis Existentes */}
      {profiles.length > 0 && (
        <View style={styles.existingProfilesContainer}>
          <Text style={styles.sectionTitle}>
            Perfis Cadastrados ({profiles.length})
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.profilesList}
          >
            {profiles.map((p, index) => (
              <View key={p.id} style={styles.existingProfileCard}>
                <View style={styles.profileHeader}>
                  <Ionicons
                    name={getSuitabilityInfo(p.suitability).icon}
                    size={20}
                    color={getSuitabilityInfo(p.suitability).color}
                  />
                  <Text style={styles.profileId}>#{index + 1}</Text>
                </View>
                <Text style={styles.profileSuitability}>{p.suitability}</Text>
                <Text style={styles.profileDetails}>
                  {p.objetivo} • {p.liquidez}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Formulário */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Criar Novo Perfil</Text>

        <CustomPicker
          title="Perfil de Risco (Suitability)"
          selectedValue={suitability}
          onValueChange={setSuitability}
          options={[
            { label: "Conservador", value: "conservador" },
            { label: "Moderado", value: "moderado" },
            { label: "Arrojado", value: "arrojado" },
          ]}
          getInfo={getSuitabilityInfo}
        />

        <CustomPicker
          title="Prazo do Investimento"
          selectedValue={objetivo}
          onValueChange={setObjetivo}
          options={[
            { label: "Curto Prazo", value: "curto" },
            { label: "Médio Prazo", value: "medio" },
            { label: "Longo Prazo", value: "longo" },
          ]}
          getInfo={getObjetivoInfo}
        />

        <CustomPicker
          title="Necessidade de Liquidez"
          selectedValue={liquidez}
          onValueChange={setLiquidez}
          options={[
            { label: "Baixa", value: "baixa" },
            { label: "Média", value: "media" },
            { label: "Alta", value: "alta" },
          ]}
          getInfo={getLiquidezInfo}
        />

        {/* Resumo da Configuração */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Resumo do Perfil</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <Ionicons
                name={getSuitabilityInfo(suitability).icon}
                size={20}
                color={getSuitabilityInfo(suitability).color}
              />
              <Text style={styles.summaryLabel}>Risco:</Text>
              <Text style={styles.summaryValue}>{suitability}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Ionicons
                name={getObjetivoInfo(objetivo).icon}
                size={20}
                color="#666"
              />
              <Text style={styles.summaryLabel}>Prazo:</Text>
              <Text style={styles.summaryValue}>{objetivo}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Ionicons
                name={getLiquidezInfo(liquidez).icon}
                size={20}
                color="#666"
              />
              <Text style={styles.summaryLabel}>Liquidez:</Text>
              <Text style={styles.summaryValue}>{liquidez}</Text>
            </View>
          </View>
        </View>

        {/* Botão de Salvar */}
        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={onSalvar}
          disabled={saving}
        >
          <View style={styles.saveButtonContent}>
            {saving ? (
              <Ionicons name="hourglass" size={20} color="white" />
            ) : (
              <Ionicons name="checkmark-circle" size={20} color="white" />
            )}
            <Text style={styles.saveButtonText}>
              {saving ? "Salvando..." : "Salvar Perfil"}
            </Text>
          </View>
        </TouchableOpacity>

        {profile && (
          <View style={styles.successContainer}>
            <View style={styles.successCard}>
              <Ionicons name="checkmark-circle" size={24} color="#34C759" />
              <Text style={styles.successText}>
                Último perfil salvo: {profile.id}
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.bottomSpacer} />

      {/* Modal de confirmação de logout */}
      <ConfirmModal
        visible={showLogoutModal}
        title="Confirmar Logout"
        message={`Tem certeza que deseja sair da conta ${session?.email}?\n\nTodos os dados locais serão mantidos.`}
        confirmText="Sair"
        cancelText="Cancelar"
        confirmColor="#FF3B30"
        icon="log-out-outline"
        iconColor="#FF3B30"
        onConfirm={performLogout}
        onCancel={() => setShowLogoutModal(false)}
        loading={loggingOut}
      />

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
    position: "relative",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  headerContainer: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  headerTextContainer: {
    flex: 1,
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
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    fontStyle: "italic",
  },
  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  existingProfilesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  profilesList: {
    marginBottom: 8,
  },
  existingProfileCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  profileId: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  profileSuitability: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
    textTransform: "capitalize",
  },
  profileDetails: {
    fontSize: 12,
    color: "#666",
    textTransform: "capitalize",
  },
  formContainer: {
    padding: 20,
    overflow: "visible",
  },
  pickerContainer: {
    marginBottom: 24,
    position: "relative",
  },
  pickerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  pickerCard: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
    position: "relative",
  },
  pickerDisplay: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
  },
  selectedValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  selectedTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  selectedValueText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  selectedDescriptionText: {
    fontSize: 14,
    color: "#666",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  optionsList: {
    maxHeight: 400,
  },
  optionItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  selectedOptionItem: {
    backgroundColor: "#f8f9ff",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  optionTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  selectedOptionLabel: {
    color: "#007AFF",
    fontWeight: "600",
  },
  optionDescription: {
    fontSize: 14,
    color: "#666",
  },
  summaryContainer: {
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  summaryCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#666",
    marginLeft: 12,
    minWidth: 60,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginLeft: 8,
    textTransform: "capitalize",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  saveButtonDisabled: {
    backgroundColor: "#999",
  },
  saveButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  successContainer: {
    marginBottom: 20,
  },
  successCard: {
    backgroundColor: "#E8F5E8",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#34C759",
  },
  successText: {
    fontSize: 14,
    color: "#34C759",
    marginLeft: 12,
    fontWeight: "500",
  },
  bottomSpacer: {
    height: 20,
  },
});
