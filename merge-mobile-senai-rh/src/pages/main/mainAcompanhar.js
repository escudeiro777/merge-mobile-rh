import React from "react";
import { useNavigation } from "@react-navigation/native";

import { View, StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Entypo,
  Feather,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";

import Redirecionar from "../redirecionamento/redirecionamento.js";
import Dashboard from "../dashboard/dashboard.js";
import Perfil from "../perfil/perfil.js";
import Feedback from "../democratizacao/listarFeedback.js";
import Decisao from "../democratizacao/listarDecisao.js";

const Tab = createBottomTabNavigator();

function ButtonNew({ size, color }) {
  return (
    <View style={styles.container}>
      <Entypo name="plus" color={color} size={size} />
    </View>
  );
}

export default function MainAcompanhar() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#C20004",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: true,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "#f1f1f1",
          borderTopColor: "gray",
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerLeft: () => null,
      }}
      initialRouteName="Dashboard"
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="pie-chart" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Decisões"
        component={Decisao}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="chatbox-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Redirecionar"
        component={Redirecionar}
        options={{
          tabBarIcon: ({ color }) => <ButtonNew size={40} color={color} />,
          tabBarLabel: "",
          headerShown: false,
        }}
        listeners={{
          tabPress: (e) => {
            // Prevent default action
            navigation.goBack();
          },
        }}
      />
      <Tab.Screen
        name="Feedbacks"
        component={Feedback}
        options={{
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="exclamationcircleo" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    borderWidth: 4,
    borderColor: "#C20004",
  },

  modalView: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconFechar: {
    marginTop: 16,
    alignSelf: "flex-start",
  },
  titulo: {
    fontSize: 28,
    width: "80%",
    textAlign: "center",
    marginBottom: 15,
  },
  containerLinks: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: 15,
    backgroundColor: "transparent",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "gray",
    width: "100%",
    height: 85,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15,
  },
  texto: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
  },
});