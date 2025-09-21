import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useAuth } from '../../App';
import { saveSession } from '../services/storage';

export default function LoginScreen() {
  const { setSession } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function onLogin() {
    if (!email || !email.includes('@')) {
      Alert.alert('Login', 'Informe um e-mail válido.');
      return;
    }
    try {
      setLoading(true);
      // Nesta Sprint: login local
      const session = { email };
      await saveSession(session);
      setSession(session);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível realizar o login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 12, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 12 }}>Assessor XP</Text>
      <Text>E-mail</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="voce@email.com"
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8 }}
      />
      <Button title={loading ? 'Entrando...' : 'Entrar'} onPress={onLogin} disabled={loading} />
      <Text style={{ marginTop: 8, color: '#666' }}>Os dados de sessão ficam no dispositivo (AsyncStorage).</Text>
    </View>
  );
}