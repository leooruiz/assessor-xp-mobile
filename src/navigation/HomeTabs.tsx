import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PerfilScreen from '../screens/PerfilScreen';
import RecomendacaoScreen from '../screens/RecomendacaoScreen';
import ExplicacaoScreen from '../screens/ExplicacaoScreen';
import AjudaScreen from '../screens/AjudaScreen';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

function Placeholder() {
  return <Text style={{ margin: 24 }}>Bem-vindo ao Assessor XP</Text>;
}

export default function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Início" component={Placeholder} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Recomendar" component={RecomendacaoScreen} />
      <Tab.Screen name="Explicações" component={ExplicacaoScreen} />
      <Tab.Screen name="Ajuda" component={AjudaScreen} />
    </Tab.Navigator>
  );
}