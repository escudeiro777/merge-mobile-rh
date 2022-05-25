import React from "react";
import * as Animatable from "react-native-animatable";
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import AppLoading from "expo-app-loading";

import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

import {
  Quicksand_300Light,
  Quicksand_600SemiBold,
} from "@expo-google-fonts/quicksand";

import { useNavigation } from "@react-navigation/native";


export default function Welcome() {
  let [fontsLoaded] = useFonts({
    //Montserrat
    Montserrat_500Medium,
    Montserrat_600SemiBold,

    // Quicksand
    Quicksand_300Light,
    Quicksand_600SemiBold,
  });

  const navigation = useNavigation();

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Animatable.Image
            style={styles.tituLogo}
            animation="fadeInDown"
            source={require("../../../assets/img-geral/logo_2S.png")}
            resizeMode="contain"
          />
          <Animatable.Text animation="flipInY" style={styles.tituloRH}>
            RECURSOS HUMANOS
          </Animatable.Text>
          <Animatable.Image
            animation="flipInY"
            source={require("../../../assets/img-geral/welcome2.png")}
            style={styles.imagem}
            resizeMode="contain"
          />
        </View>

        <Animatable.View
          delay={600}
          animation="fadeInUp"
          style={styles.containerForm}
        >
          <Text style={styles.title}>
            Pensando sempre no conforto de nossos funcionários!
          </Text>
          <Text style={styles.text}>Faça seu login para começar</Text>
            <TouchableOpacity
              style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerLogo: {
    flex: 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    
  },
  tituLogo: {
    marginBottom: "10%",
    height: 35,
    alignSelf: "center",
  },
  tituloRH: {
    fontSize: 32,
    width: "80%",
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
    textTransform: "uppercase",
    color: "#2A2E32",
    marginBottom: 40,
    fontWeight: "500",
  },
  containerForm: {
    flex: 1,
    backgroundColor: "#636466",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 12,
    color: "white",
    alignSelf: "center",
    fontFamily: "Quicksand_300Light",
    textAlign: "center",
  },
  text: {
    fontFamily: "Quicksand_300Light",
    color: "white",
    alignSelf: "center",
    fontSize: 20,
  },
  button: {
    position: "absolute",
    backgroundColor: "#C20004",
    borderRadius: 10,
    paddingVertical: 8,
    width: "70%",
    alignSelf: "center",
    bottom: "15%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    height: 40,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Quicksand_300Light",
  },

  imagem: {
    height: 200,
  },
});