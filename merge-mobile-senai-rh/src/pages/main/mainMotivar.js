import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, StyleSheet, Text, Modal } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import { MaterialCommunityIcons, EvilIcons, Entypo, Feather, AntDesign, MaterialIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import {
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand'


const Tab = createBottomTabNavigator();

import Atividades from "../atividades/atividades.js";
import MinhasAtividades from "../minhasAtividades/minhasAtividades.js";
// import MinhasTabBar from "../minhasAtividades/minhasTabBar.js";
import RankingGp1 from "../ranking/ranking.js"
import Perfil from "../perfil/perfil.js";
import Redirecionar from "../redirecionamento/redirecionamento.js";


function ButtonNew({ size, color }) {
  return (
    <View style={styles.container}>
      <Entypo name="plus" color={color} size={size} />
    </View>
  );
}


export default function MainMotivar() {
  
  let [fontsLoaded] = useFonts({
    Regular: Quicksand_400Regular,
    Light: Quicksand_300Light,
    SemiBold: Quicksand_600SemiBold,
    Bold: Quicksand_700Bold,
    Medium: Quicksand_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#C20004",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: true,
        tabBarStyle: {
          //   height: 60,
          // backgroundColor: '#121212',
          backgroundColor: "#f1f1f1",
          borderTopColor: "gray",
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerShown: false,
      }}
      initialRouteName="Atividades"
    >
      <Tab.Screen
        name="Obrigatórios"
        component={Atividades}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="news" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Extras"
        component={MinhasAtividades}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="text-box-plus-outline" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />


      <Tab.Screen
        name="Redirecionar"
        component={Redirecionar}
        options={{
          tabBarIcon: ({ size, color }) => (
            <ButtonNew size={size} color={color} />
          ),
          tabBarLabel: "",
          //headerShown: false,
        }}
      />



      <Tab.Screen
        name="Ranking"
        component={RankingGp1}
        options={{
          tabBarIcon: ({ size, color }) => (
            <EvilIcons name="trophy" size={35} color={color} />
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
    marginLeft: 9,
    flexDirection: 'row',
    fontFamily: 'Regular',
  },

});