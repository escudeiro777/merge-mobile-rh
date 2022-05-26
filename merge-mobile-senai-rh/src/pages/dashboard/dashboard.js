// React Imports
import { useState, useEffect } from "react";
import React from "react";
import { Text as SvgText } from "react-native-svg";
import * as scale from "d3-scale";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";

// Expo
import AppLoading from "expo-app-loading";

// Pacotes
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import jwtDecode from "jwt-decode";

import { BarChart, XAxis, ProgressCircle, Grid } from "react-native-svg-charts";

import GrafHistSatisfacao from './grafHistStisfacao.js'

//Services
import api from "../../services/apiGp3";
import apiGp1 from "../../services/apiGp1";

// Fonts
import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

import {
  Quicksand_300Light,
  Quicksand_600SemiBold,
} from "@expo-google-fonts/quicksand";

export default function Dashboard() {
  //States
  const [idUsuario, setIdUsuario] = useState(1);
  const [nivelSatisfacao, setNivelSatisfacao] = useState(0);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [notaProdutividade, setNotaProdutividade] = useState(0);
  const [usuario, setUsuario] = useState([]);
  const [minhasAtividades, setMinhasAtividades] = useState([]);

  // Fontes utilizada
  let [fontsLoaded] = useFonts({
    //Montserrat
    Montserrat_500Medium,
    Montserrat_600SemiBold,

    // Quicksand
    Quicksand_300Light,
    Quicksand_600SemiBold,
  });

  async function BuscarUsuario() {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const resposta = await api.get(
        "Usuarios/Listar/" + jwtDecode(token).jti,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resposta.status === 200) {
        setUsuario([resposta.data]);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  async function BuscarMinhasAtividades() {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const resposta = await apiGp1.get(
        "Atividades/MinhasAtividade/" + jwtDecode(token).jti,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (resposta.status === 200) {
        setMinhasAtividades(resposta.data);
      }
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => BuscarUsuario(), []);
  useEffect(() => BuscarMinhasAtividades(), []);

  const GraficoSatisfacao = () => {
    const u = usuario[0];
    return (
      <ProgressCircle
        style={styles.grafico}
        progress={u.medSatisfacaoGeral}
        progressColor={"#C20004"}
        backgroundColor={"rgba(194, 0, 4, 0.15)"}
        startAngle={0}
        cornerRadius={5}
        strokeWidth={15}
        endAngle={360}
      >
        <SvgText
          x={-7.5}
          y={1.5}
          fill={"black"}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={16}
          fontWeight={"normal"}
          //stroke={'white'}
          opacity={"1"}
          strokeWidth={0.4}
        >
          {(u.medSatisfacaoGeral * 100).toPrecision(2)}%
        </SvgText>
      </ProgressCircle>
    );
  };

  const GraficoAvaliacao = () => {
    const u = usuario[0];
    return (
      <ProgressCircle
        style={styles.grafico}
        progress={u.mediaAvaliacao}
        progressColor={"#C20004"}
        backgroundColor={"rgba(194, 0, 4, 0.15)"}
        startAngle={0}
        cornerRadius={5}
        strokeWidth={15}
        endAngle={360}
      >
        <SvgText
          x={-7.5}
          y={1.5}
          fill={"black"}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={16}
          fontWeight={"normal"}
          //stroke={'white'}
          opacity={"1"}
          strokeWidth={0.4}
        >
          {u.mediaAvaliacao * 100}%
        </SvgText>
      </ProgressCircle>
    );
  };

  const GraficoProdutividade = () => {
    const u = usuario[0];
    return (
      <ProgressCircle
        style={styles.grafico}
        progress={u.notaProdutividade}
        progressColor={"#C20004"}
        backgroundColor={"rgba(194, 0, 4, 0.15)"}
        startAngle={0}
        cornerRadius={5}
        strokeWidth={15}
        endAngle={360}
      >
        <SvgText
          x={-7.5}
          y={1.5}
          fill={"black"}
          textAnchor={"middle"}
          alignmentBaseline={"middle"}
          fontSize={16}
          fontWeight={"normal"}
          //stroke={'white'}
          opacity={"1"}
          strokeWidth={0.4}
        >
          {u.notaProdutividade}%
        </SvgText>
      </ProgressCircle>
    );
  };

  // function LineChartExample() {

  //     const atividadesFinalizadas = minhasAtividades
  //         .filter(a => a.idSituacaoAtividade === 3)
  //         .map((p) => {

  //            return parseInt(p.dataConclusao.split('-')[1]);

  //         });

  //     console.warn(atividadesFinalizadas);

  //     return (

  //         <LineChart
  //             style={{ height: 200 }}
  //             data={atividadesFinalizadas}
  //             svg={{ stroke: 'rgb(134, 65, 244)' }}
  //             contentInset={{ top: 20, bottom: 20 }}
  //         >
  //             <Grid />
  //         </LineChart>

  //     )
  // }

  function GraficoBarras() {
    const dataFinalizacao = minhasAtividades
      .filter((a) => a.idSituacaoAtividade === 1)
      .map((p) => {
        return parseInt(p.dataConclusao.split("-")[2]);
      });

    const d1_5 = dataFinalizacao.filter((d) => d <= 5).length;
    const d6_10 = dataFinalizacao.filter((d) => d > 5 && d <= 10).length;
    const d11_15 = dataFinalizacao.filter((d) => d > 10 && d <= 15).length;
    const d16_20 = dataFinalizacao.filter((d) => d > 15 && d <= 20).length;
    const d21_25 = dataFinalizacao.filter((d) => d > 20 && d <= 25).length;
    const d26_31 = dataFinalizacao.filter((d) => d > 25 && d <= 31).length;

    //console.warn(d6_10);

    //const data = [d1_5, d6_10, d11_15, d16_20, d21_25, d26_31]
    const data = [4, 2, 4, 5, 3];

    const CUT_OFF = 20;
    const Labels = ({ x, y, bandwidth, data }) =>
      data.map((value, index) => (
        <SvgText
          key={index}
          x={x(index) + bandwidth / 2}
          y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
          fontSize={14}
          fill={value >= CUT_OFF ? "white" : "black"}
          alignmentBaseline={"middle"}
          textAnchor={"middle"}
        >
          {value}
        </SvgText>
      ));

    return (
      <View style={styles.graficoBarrasContainer}>
        <BarChart
          //style={{ flex: 1 }}
          style={styles.graficoBarras}
          data={data}
          svg={{ fill: "rgba(194, 0, 4, 0.8)" }}
          contentInset={{ top: 20, bottom: 10 }}
          spacing={0.2}
          gridMin={0}
        >
          <Grid direction={Grid.Direction.HORIZONTAL} />
          <Labels />
        </BarChart>
      </View>
    );
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require("../../../assets/img-geral/logo_2S.png")}
              style={styles.imgLogo}
            />
          </View>
          <Text style={styles.tituloPage}>DASHBOARD</Text>

          {usuario.map((usuario) => {
            return (
              <View style={styles.containerAreaDados}>
                <View style={styles.containerDados}>
                  <View style={styles.containerLine}>
                    <Image
                      source={
                        usuario.caminhoFotoPerfil == undefined
                          ? {
                              uri:
                                "https://armazenamentogrupo3.blob.core.windows.net/armazenamento-simples/" +
                                usuario.caminhoFotoPerfil,
                            }
                          : require("../../../assets/img-gp3/Perfil.png")
                      }
                      resizeMod="cover"
                    />

                    <View style={styles.containerTextos}>
                      <Text style={styles.lineTextPerfil}>{usuario.nome}</Text>
                      <Text style={styles.lineTextPerfiLCargo}>
                        {usuario.idCargoNavigation.nomeCargo}
                      </Text>
                    </View>
                  </View>

                  {/* <View style={styles.containerPieChart}>
                    <View style={styles.containerLegendas}>
                      <Text style={styles.tituloGrafico}>
                        Nivel de Satisfação:
                      </Text>
                    </View>
                    <GraficoSatisfacao />
                  </View> */}
                  <View style={styles.containerPieChart}>
                    <View style={styles.containerLegendas}>
                      <Text style={styles.tituloGrafico}>
                        Média de Avaliação:
                      </Text>
                    </View>
                    <GraficoAvaliacao />
                  </View>

                  <View style={styles.containerProdutividade}>
                    <View style={styles.containerProdutividadeSup}>
                      <Text style={styles.tituloGrafico}>Produtividade:</Text>
                      <GraficoProdutividade />
                    </View>
                    <GraficoBarras />
                    <Text style={styles.subtituloProdutividade}>
                      Entregas de atividade por semana:{" "}
                    </Text>
                  </View>

                  <View style={styles.containerProdutividade}>
                    <View style={styles.containerProdutividadeSup}>
                      <Text style={styles.tituloGrafico}>Satisfação:</Text>
                      <GraficoSatisfacao />
                    </View>
                    <GrafHistSatisfacao />
                    {/* <Text style={styles.subtituloProdutividade}>
                      Entregas de atividade por semana:{" "}
                    </Text> */}
                  </View>

                  {/* <LineChartExample /> */}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    width: "100%",
    //backgroundColor: 'orange'
  },
  imgLogo: {
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 24,
  },
  tituloPage: {
    fontSize: 32,
    width: "80%",
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
    textTransform: "uppercase",
    color: "#2A2E32",
  },
  containerAreaDados: {
    //backgroundColor: 'yellow',
    flex: 1,
    width: "100%",
    paddingHorizontal: "5%",
  },
  containerDados: {
    //backgroundColor: 'cyan',
    //height: 200,
    flex: 1,
    marginTop: 20,
    //alignItems: 'flex-start'
  },
  containerLine: {
    width: "100%",
    //height: 110,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "gray",
    flexDirection: "row",
    //backgroundColor: 'green',
    padding: 10,
  },
  containerTextos: {
    marginLeft: 24,
    marginTop: 0,
    fontFamily: "Quicksand_300Light",
    //backgroundColor: 'blue'
  },
  lineTextPerfil: {
    fontFamily: "Quicksand_300Light",
    fontSize: 25,
    color: "#000",
  },
  lineTextPerfiLCargo: {
    fontFamily: "Quicksand_300Light",
    fontSize: 18,
    color: "#000",
  },
  containerPieChart: {
    //flex: 1,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "gray",
    flexDirection: "row",
    //backgroundColor: 'purple',
    justifyContent: "space-between",
    marginTop: 20,
    //paddingRight: '5%',
    alignItems: "center",
    padding: 10,
    height: 100,
  },
  containerProdutividade: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "gray",
    //flexDirection: 'row',
    //backgroundColor: 'purple',
    //justifyContent: 'space-between',
    marginTop: 20,
    //paddingRight: '5%',
    //alignItems: 'center',
    padding: 10,
    //flexWrap: 'wrap',
    //height: 500,
  },
  subtituloProdutividade: {
    fontSize: 16,
    marginTop: -20,
  },
  containerLegendas: {
    flex: 1,
    //backgroundColor: 'orange'
  },
  containerProdutividadeSup: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    //backgroundColor: 'green'
  },
  grafico: {
    //flex: 1,
    width: 75,
    height: 75,
    //backgroundColor: 'blue',
  },
  tituloGrafico: {
    fontSize: 20,
    //marginLeft: 15,
    //backgroundColor: 'green'
  },
  graficoBarrasContainer: {
    flexDirection: "row",
    height: 200,
    paddingVertical: 16,
  },
  graficoBarras: {
    flex: 1,
    //backgroundColor: 'yellow'
  },
  
});