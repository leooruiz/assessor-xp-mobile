import React from 'react';
import { View, Text } from 'react-native';

export default function AjudaScreen() {
  return (
    <View style={{ flex: 1, padding: 16, gap: 8 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Ajuda</Text>
      <Text>
        • Use o e-mail para entrar.\n• A sessão fica salva no dispositivo.\n• Se algo falhar, feche e reabra o app.
      </Text>
    </View>
  );
}