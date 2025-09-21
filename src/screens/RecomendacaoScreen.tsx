import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import { api, Profile, Recommendation } from "../services/api";

export default function RecomendacaoScreen() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [rec, setRec] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadProfiles() {
    try {
      const list = await api.listProfiles();
      setProfiles(list);
    } catch {
      Alert.alert("Erro", "Falha ao carregar perfis. Tente novamente.");
    }
  }

  async function gerarRecomendacao() {
    if (!profiles.length) {
      Alert.alert("Recomendação", "Crie um perfil primeiro na aba Perfil.");
      return;
    }
    try {
      setLoading(true);
      const r = await api.createRecommendation(
        profiles[profiles.length - 1].id
      );
      setRec(r);
    } catch {
      Alert.alert("Erro", "Falha ao gerar recomendação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfiles();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button
        title={loading ? "Gerando..." : "Gerar recomendação"}
        onPress={gerarRecomendacao}
        disabled={loading}
      />
      {rec ? (
        <>
          <Text style={{ marginTop: 12, fontWeight: "600" }}>Resumo</Text>
          {rec.resumo && <Text>{rec.resumo}</Text>}
          <Text style={{ marginTop: 12, fontWeight: "600" }}>Itens</Text>
          <FlatList
            data={rec.items}
            keyExtractor={(i) => i.assetId}
            renderItem={({ item }) => (
              <View
                style={{
                  paddingVertical: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#eee",
                }}
              >
                <Text style={{ fontWeight: "600" }}>
                  {item.nome} — {(item.peso * 100).toFixed(0)}%
                </Text>
                <Text style={{ color: "#555" }}>{item.xai}</Text>
              </View>
            )}
          />
        </>
      ) : (
        <Text style={{ marginTop: 12, color: "#666" }}>
          Nenhuma recomendação ainda. Toque em “Gerar recomendação”.
        </Text>
      )}
    </View>
  );
}
