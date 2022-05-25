// React Imports
import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";

// Expo
import AppLoading from 'expo-app-loading';

// Pacotes
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fonts
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from '@expo-google-fonts/montserrat';

import {
  Quicksand_300Light,
  Quicksand_600SemiBold,
} from '@expo-google-fonts/quicksand';

//Services
import api from "../../services/api";

export default function ListarDecisao() {

  const navigation = useNavigation();

  //States
  const [listaDecisao, setListaDecisao] = useState([]);

  // Fontes utilizada
  let [fontsLoaded] = useFonts({

    //Montserrat
    Montserrat_500Medium,
    Montserrat_600SemiBold,

    // Quicksand
    Quicksand_300Light,
    Quicksand_600SemiBold,
  })

  const BuscarDecisao = async () => {
    const token = await AsyncStorage.getItem("userToken");

    if (token != null) {
      const resposta = await api.get("Decisoes/Listar", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const dadosDaApi = await resposta.data;
      setListaDecisao(dadosDaApi);
    }
  };


  useEffect(() => {
    BuscarDecisao();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.containerRenderItem}>

      <View style={styles.imgPerfilCardWrapper}>

        <Image
          source={{
            uri:
              "https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/" +
              item.idUsuarioNavigation.caminhoFotoPerfil,
          }}
          resizeMode="cover"
          style={styles.img_perfil}
        />

      </View>

      <View style={styles.cardClicavel}>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("CadastrarFeedback", {
              idDecisao: item.idDecisao,
            })
          }
        >
          <View style={styles.containerCard}>

            <View style={styles.tituloCardWrapper}>

              <Text style={styles.tituloCard}>
                {item.idUsuarioNavigation.nome} deu essa ideia: "
                {item.descricaoDecisao}"
              </Text>

              <Text style={styles.mensagem}>Clique e de seu feedback!</Text>

            </View>

          </View>

        </TouchableOpacity>

      </View>

    </View>
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>

        <View style={styles.header}>

          <Image
            source={require("../../../assets/imgMobile/logo_2S.png")}
            style={styles.imgLogo}
          />

        </View>

        <Text style={styles.h1Bold}>Decisão</Text>

        <FlatList
          contentContainerStyle={styles.mainBodyContent}
          data={listaDecisao}
          keyExtractor={(item) => item.idDecisao}
          renderItem={renderItem}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerRenderItem: {
    width: 370,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  imgPerfilCardWrapper: {
    width: 70,
    height: 70,
    borderColor: '#B3B3B3',
    borderWidth: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  img_perfil: {
    width: '100%',
    height: '100%'
  },
  cardClicavel: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    marginTop: 16,
    width: 230,
    height: 130,
    marginRight:40
  },

  containerCard: {
    width: 207,
    height: 105
  },

  tituloCardWrapper: {
    width: 200,
    height: 38,
  },

  tituloCard: {
    textAlign: "auto",
    marginBottom: 8,
    height: 60,
    fontFamily: 'Quicksand_600SemiBold',
    color: 'black',
    marginLeft: 14
  },

  mensagem: {
    textAlign: "center",
    color: 'black',
    fontFamily: 'Quicksand_300Light'
  },

  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: '5%',
  },

  header: {
    width: 290,
    height: 40,
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 32,
  },

  imgLogo: {
    alignSelf: "center",
    // marginTop: 40,
    marginBottom: 24,
  },
  h1Bold: {
    fontSize: 32,
    width: "80%",
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
    textTransform: "uppercase",
    color: "#2A2E32",
  },

  mainBodyContent: {
    paddingBottom: 20
  }
});