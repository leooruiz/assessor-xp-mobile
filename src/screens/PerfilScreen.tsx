import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
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

  async function onSalvar() {
    try {
      setSaving(true);
      const p = await api.createProfile({ suitability, objetivo, liquidez });
      setProfile(p);
      Alert.alert("Perfil", `Salvo: ${p.id}`);
    } catch (e: any) {
      Alert.alert("Erro", "Falha ao salvar perfil. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>
        Perfil do Investidor
      </Text>

      <Text>Suitability</Text>
      <Picker selectedValue={suitability} onValueChange={setSuitability}>
        <Picker.Item label="Conservador" value="conservador" />
        <Picker.Item label="Moderado" value="moderado" />
        <Picker.Item label="Arrojado" value="arrojado" />
      </Picker>

      <Text>Objetivo</Text>
      <Picker selectedValue={objetivo} onValueChange={setObjetivo}>
        <Picker.Item label="Curto" value="curto" />
        <Picker.Item label="Médio" value="medio" />
        <Picker.Item label="Longo" value="longo" />
      </Picker>

      <Text>Liquidez</Text>
      <Picker selectedValue={liquidez} onValueChange={setLiquidez}>
        <Picker.Item label="Baixa" value="baixa" />
        <Picker.Item label="Média" value="media" />
        <Picker.Item label="Alta" value="alta" />
      </Picker>

      <Button
        title={saving ? "Salvando..." : "Salvar"}
        onPress={onSalvar}
        disabled={saving}
      />
      {profile && (
        <Text style={{ color: "#666" }}>Último perfil salvo: {profile.id}</Text>
      )}
    </View>
  );
}
