import React from 'react';
import { View, Text, FlatList } from 'react-native';

const mockItens = [
  { id: 'tesouro_2029', nome: 'Tesouro Prefixado 2029', peso: 0.4, xai: 'Protege em juros altos' },
  { id: 'fundo_rf', nome: 'Fundo Renda Fixa', peso: 0.3, xai: 'Liquidez e baixo risco' },
  { id: 'bova11', nome: 'ETF BOVA11', peso: 0.3, xai: 'Exposição à bolsa diversificada' },
];

export default function RecomendacaoScreen() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Recomendação</Text>
      <FlatList
        data={mockItens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
            <Text style={{ fontWeight: '600' }}>{item.nome} — {(item.peso * 100).toFixed(0)}%</Text>
            <Text style={{ color: '#555' }}>{item.xai}</Text>
          </View>
        )}
      />
      <Text style={{ marginTop: 12, color: '#666' }}>
        * Na próxima etapa, estes dados virão da **API local** (CRUD completo).
      </Text>
    </View>
  );
}