import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { api, Profile } from "../services/api";

export default function PerfilScreen() {
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

  const loadProfiles = async () => {
    try {
      const profilesList = await api.listProfiles();
      setProfiles(profilesList);
    } catch (error) {
      console.error("Erro ao carregar perfis:", error);
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
    loadProfiles();
  };

  async function onSalvar() {
    try {
      setSaving(true);
      const p = await api.createProfile({ suitability, objetivo, liquidez });
      setProfile(p);
      Alert.alert("Sucesso!", `Perfil criado com sucesso!\nID: ${p.id}`, [
        { text: "OK", onPress: () => loadProfiles() },
      ]);
    } catch (e: any) {
      Alert.alert(
        "Erro",
        "Falha ao salvar perfil. Verifique sua conexão e tente novamente."
      );
    } finally {
      setSaving(false);
    }
  }

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
    const currentInfo = getInfo(selectedValue);

    return (
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerTitle}>{title}</Text>
        <View style={styles.pickerCard}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={onValueChange}
              style={styles.picker}
            >
              {options.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.infoContainer}>
            <Ionicons
              name={currentInfo.icon}
              size={24}
              color={currentInfo.color || "#007AFF"}
            />
            <Text style={styles.infoText}>{currentInfo.description}</Text>
          </View>
        </View>
      </View>
    );
  };

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
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <Ionicons name="person" size={32} color="white" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Perfil do Investidor</Text>
            <Text style={styles.headerSubtitle}>
              Configure suas preferências de investimento
            </Text>
          </View>
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
  },
  pickerContainer: {
    marginBottom: 24,
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
  },
  pickerWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  picker: {
    height: 50,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 12,
    flex: 1,
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
