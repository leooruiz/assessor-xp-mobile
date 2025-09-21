import React from 'react';
import { View, Text, TextInput } from 'react-native';

export default function FormField({ label, value, onChangeText, placeholder }: any) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ marginBottom: 6 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8 }}
      />
    </View>
  );
}