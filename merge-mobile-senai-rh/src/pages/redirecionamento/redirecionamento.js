import React from "react";
import * as Animatable from "react-native-animatable";
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { MaterialIcons, MaterialCommunityIcons, EvilIcons, Entypo, Feather, AntDesign } from "@expo/vector-icons";


import {
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand'

import {
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light_Italic,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black_Italic,
} from '@expo-google-fonts/montserrat';



export default function Redirecionar() {
  const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
      Regular: Quicksand_400Regular,
      Light: Quicksand_300Light,
      SemiBold: Quicksand_600SemiBold,
      Bold: Quicksand_700Bold,
      Medium: Quicksand_500Medium,
      Montserrat_100Thin,
      Montserrat_200ExtraLight,
      Montserrat_300Light,
      Montserrat_400Regular,
      MediumM: Montserrat_500Medium,
      SemiBoldM: Montserrat_600SemiBold,
      Montserrat_700Bold,
      Montserrat_800ExtraBold,
      Montserrat_900Black,
      Montserrat_100Thin_Italic,
      Montserrat_200ExtraLight_Italic,
      Montserrat_300Light_Italic,
      Montserrat_400Regular_Italic,
      Montserrat_500Medium_Italic,
      Montserrat_600SemiBold_Italic,
      Montserrat_700Bold_Italic,
      Montserrat_800ExtraBold_Italic,
      Montserrat_900Black_Italic,
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }

  return (
    <View style={styles.container}>

      <Image style={styles.logoSenai} source={require('../../../assets/img-geral/logo_2S.png')}resizeMode="contain" />

      <View style={styles.containerLinks}>
        <Text style={styles.titulo}>REDIRECIONAR PARA:</Text>

        <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate("mainAcompanhar")}>
          <MaterialIcons name="computer" size={50} color="black" />
          <Text style={styles.texto}>Acompanhamento</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("mainMotivar")} >
          <MaterialCommunityIcons style={styles.porco} name="piggy-bank" size={50} color="black"  />
          <Text style={styles.textoM}>Motivações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate("mainVantagem")}>
          <MaterialCommunityIcons name="label-percent" size={50} color="black" />
          <Text style={styles.texto}>Minhas Vantagens</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
  },
  
  logoSenai: {
    // width: "100%",
    // height: 40,
    alignSelf: "center",
    marginTop: 40,
    //marginBottom: 20,
  },

  containerLinks: {
    flex: 1,
    // backgroundColor: 'cyan',
    alignItems: "center",
    width: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop:32,
  },

  titulo: {
    fontSize: 30,
    width: '80%',
    textAlign: 'center',
    marginBottom: 15,
    fontFamily:'SemiBoldM',
    paddingTop: 32,
    paddingBottom: 32,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "#C20004",
    borderWidth: 2,
    borderColor: 'gray',
    width: "100%",
    height: 85,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15,
  },
  texto: {
    // backgroundColor: 'blue',
    color: "black",
    textAlign: "center",
    fontSize: 25,
    // fontWeight: "bold",
    marginLeft: 40,
    fontFamily:'Regular'
  },

  porco: {
    paddingRight: 70,
  },

  textoM: {
    color: "black",
    fontSize: 25,
    marginRight: 50,
    fontFamily:'Regular',
    
  },
});