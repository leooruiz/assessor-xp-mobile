import React from 'react';
import { View, Text } from 'react-native';

export default function ExplicacaoScreen() {
  return (
    <View style={{ flex: 1, padding: 16, gap: 8 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Como recomendamos</Text>
      <Text>
        Nesta Sprint 3, usamos regras simples com base no perfil/objetivo/liquidez para justificar cada ativo.
        Na próxima etapa conectaremos com a API para gerar as recomendações dinamicamente.
      </Text>
    </View>
  );
}