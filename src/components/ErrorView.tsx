import React from 'react';
import { View, Text, Button } from 'react-native';

export default function ErrorView({ onRetry, message = 'Falha ao conectar.' }: { onRetry: () => void; message?: string }) {
  return (
    <View style={{ padding: 16, alignItems: 'center', gap: 8 }}>
      <Text>{message}</Text>
      <Button title="Tentar novamente" onPress={onRetry} />
    </View>
  );
}