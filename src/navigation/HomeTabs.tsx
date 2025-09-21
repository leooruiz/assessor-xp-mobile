import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PerfilScreen from "../screens/PerfilScreen";
import RecomendacaoScreen from "../screens/RecomendacaoScreen";
import ExplicacaoScreen from "../screens/ExplicacaoScreen";
import AjudaScreen from "../screens/AjudaScreen";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function Placeholder() {
  return <Text style={{ margin: 24 }}>Bem-vindo ao Assessor XP</Text>;
}

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Início") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Recomendar") {
            iconName = focused ? "trending-up" : "trending-up-outline";
          } else if (route.name === "Explicações") {
            iconName = focused ? "bulb" : "bulb-outline";
          } else if (route.name === "Ajuda") {
            iconName = focused ? "help-circle" : "help-circle-outline";
          } else {
            iconName = "ellipse";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Início" component={Placeholder} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Recomendar" component={RecomendacaoScreen} />
      <Tab.Screen name="Explicações" component={ExplicacaoScreen} />
      <Tab.Screen name="Ajuda" component={AjudaScreen} />
    </Tab.Navigator>
  );
}
