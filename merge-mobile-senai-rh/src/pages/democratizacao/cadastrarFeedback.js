// React Imports
import React, { useState, useEffect, useRef } from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  Keyboard,
  BackHandler
} from 'react-native';

// Expo
import AppLoading from 'expo-app-loading';

// Pacotes
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { useNavigation } from "@react-navigation/native";


// Services
import api from "../../services/apiGp3";

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

// Services
import jwtDecode from 'jwt-decode';

export default function CadastroFeedback({ route }) {

  const navigation = useNavigation();

  // Parâmetros
  const { idDecisao } = route.params;

  // States
  const [idUsuario, setIdUsuario] = useState(0);
  const [Decisao, setDecisao] = useState([]);
  const [comentarioFeedback, setComentarioFeedback] = useState('');
  const [valorMoedas, setValorMoedas] = useState(20);
  const [notaDecisao, setNotaDecisao] = useState('');
  const [dataPublicacao] = useState(moment().format('YYYY-MM-DD'));


  // Animação Size Changing
  const sizeChanging = useRef(new Animated.Value(100)).current;

  // Action Size Changings
  const ChangeSizeUp = () => {
    Animated.timing(sizeChanging, {
      toValue: 150,
      useNativeDriver: false,
      duration: 150
    }).start()
  }
  const ChangeSizeDown = () => {
    Animated.timing(sizeChanging, {
      toValue: 110,
      useNativeDriver: false,
      duration: 250,
    }).start()
  }


  // Float Label Animação Nota
  const moveTextNota = useRef(new Animated.Value(0)).current;

  const onChangeNota = (text) => {
    setNotaDecisao(text)
  };

  // Actions Animação Nota
  const moveTextTopNota = () => {
    Animated.timing(moveTextNota, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const moveTextBottomNota = () => {
    Animated.timing(moveTextNota, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  // Listeners Animação Nota
  const onFocusHandlerNota = () => {
    if (notaDecisao === '') {
      moveTextTopNota();
    }
  };
  const onBlurHandlerNota = () => {
    if (notaDecisao === '') {
      moveTextBottomNota();
    }
  };


  // Styles Animação Nota
  const yValNota = moveTextNota.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -20],
  });
  const animStyleNota = {
    transform: [
      {
        translateY: yValNota,
      },
    ],
  };

  // FLoat Label Animação Fb
  const moveTextFb = useRef(new Animated.Value(0)).current;

  const onChangeFeedback = (text) => {
    setComentarioFeedback(text);
  };

  // Actions Animação Fb
  const moveTextTopFb = () => {
    Animated.timing(moveTextFb, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };
  const moveTextBottomFb = () => {
    Animated.timing(moveTextFb, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const onFocusHandlerFb = () => {
    if (comentarioFeedback === "") {
      moveTextTopFb();
    }
  };
  const onBlurHandlerFb = () => {
    if (comentarioFeedback === "") {
      moveTextBottomFb();
    }
  };
  // Styles Animação Fb
  const yValFb = moveTextFb.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -20],
  });
  const animStyleFb = {
    transform: [
      {
        translateY: yValFb,
      },
    ],
  };



  // Fontes utilizada
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_600SemiBold,

    // Quicksand
    Quicksand_300Light,
    Quicksand_600SemiBold,
  })


  async function CadastarFeedback() {
    try {
      const token = await AsyncStorage.getItem('userToken');

      const feedback = {
        idUsuario: 0,
        idDecisao: idDecisao,
        comentarioFeedBack: comentarioFeedback,
        notaDecisao: notaDecisao,
        dataPublicacao: dataPublicacao,
        valorMoedas: valorMoedas
      };

      console.warn(jwtDecode(token))
      const resposta = await api.post('Feedbacks/Cadastrar', feedback, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      if (resposta.status == 201) {
        console.warn('Cadastro de Feedback realizado!');
      } else {
        console.warn('Falha ao realizar o cadastro.');
      }

    } catch (error) {
      console.warn(error);
    }
  };

  async function BuscarDecisao() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const resposta = await api.get('Decisoes/Listar/' + idDecisao, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      if (resposta.status === 200) {
        setDecisao([resposta.data]);
      }
    } catch (error) {
      console.warn(error);
    }
  };


  useEffect(() => { ChangeSizeUp(); }, []);
  useEffect(() => { BuscarDecisao(); }, []);

  // UseEffect Animação Feedback
  useEffect(() => {
    if (comentarioFeedback !== "") {
      moveTextTopFb();
    } else if (comentarioFeedback === "") {
      moveTextBottomFb();
    }
  }, [comentarioFeedback])

  // UseEffect Animação Nota
  useEffect(() => {
    if (notaDecisao !== '') {
      moveTextTopNota();
    } else if (notaDecisao === '') {
      moveTextBottomNota();
    }
  }, [notaDecisao])

  // UseEffect Captura Evento KeyBoard
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      ChangeSizeUp();
      setKeyboardStatus(!keyboardStatus);
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);

  // Box Style Democratização
  const boxStyleDemocratizacao = {
    height: sizeChanging
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>

        <View style={styles.mainHeader}>
          <Image style={styles.logoSenai} source={require("../../../assets/img-geral/logo_2S.png")} resizeMode="contain" />
        </View>

        <Text style={styles.tituloDemocratizacao}>Democratização</Text>

        <Animated.View style={[styles.sectionDemocratizacao, boxStyleDemocratizacao]} >

          <Text style={styles.sectionDemocratizacaoTxt}>
            Seu gerente tomou a seguinte decisão:
          </Text>
          <Text style={styles.sectionDemocratizacaoDecisao}>
            {Decisao.map((decisao) => {
              return decisao.descricaoDecisao
            })}
          </Text>
        </Animated.View>

        <KeyboardAvoidingView style={styles.sectionDemocratizacaoBox}>
          <TextInput
            keyboardType="default"
            onChangeText={campo => onChangeFeedback(campo)}
            placeholder="Insira seu feedback"
            value={comentarioFeedback}
            style={styles.sectionDemocratizacaoInput}
            editable={true}
            onFocus={() => onFocusHandlerFb()}
            onBlur={() => onBlurHandlerFb()}
            onPressIn={() => ChangeSizeDown()}
            blurOnSubmit
          />

          <TextInput
            keyboardType="decimal-pad"
            onChangeText={campo => onChangeNota(campo)}
            placeholder="Insira uma nota para o feedback"
            value={notaDecisao}
            style={styles.sectionDemocratizacaoInput}
            editable={true}
            onFocus={() => onFocusHandlerNota()}
            onBlur={() => onBlurHandlerNota()}
            onPressIn={() => ChangeSizeDown()}
            blurOnSubmit
          />

        </KeyboardAvoidingView>

        <TouchableOpacity style={styles.btnCadastro} onPress={() => CadastarFeedback()}>
          <Text style={styles.btnCadastroText}>Enviar Feedback</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F2F2F2'
  },

  mainHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#F2F2F2',
    borderRadius: 5,
    width: '100%',
  },

  logoSenai: {
    width: "100%",
    height: 40,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  h1nonBold: {
    fontSize: 20,
    fontWeight: '500',
    textTransform: 'uppercase',
    color: '#000000',
    marginTop: 60,
  },

  tituloDemocratizacao: {
    fontSize: 30,
    color: '#2A2E32',
    fontFamily: 'Montserrat_600SemiBold',
    marginTop: 32,
    marginBottom: 32,
    textTransform: 'uppercase',
    width: '86%',
    textAlign:"center"
  },

  sectionDemocratizacao:
  {
    borderColor: '#B3B3B3',
    width: '86%',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'flex-start',
    paddingLeft: 10,
    marginBottom: 18
  },

  sectionDemocratizacaoTxt: {
    fontFamily: 'Quicksand_600SemiBold',
    fontSize: 20,
    color: '#000000',
    paddingTop: 16,
    paddingBottom: 8,
    paddingLeft: 3
  },


  sectionDemocratizacaoDecisao: {
    fontFamily: 'Quicksand_300Light',
    color: '#000000',
    fontSize: 18,
    paddingLeft: 4,
    paddingRight: 12,
    marginBottom: 10
  },

  sectionDemocratizacaoBox: {
    width: '86%',
    height: 100
  },

  sectionDemocratizacaoInput: {
    width: '100%',
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#B3B3B3',
    paddingLeft: 16,
    marginBottom: 18
  },

  tituloDecisao: {
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#000000',
  },

  paragrafoDecisao: {
    fontSize: 15,
    fontWeight: '500',
    textTransform: 'uppercase',
    color: '#000000',
    marginTop: 60,
  },

  section: {
    backgroundColor: '#f2f2f2',
    marginTop: 20,
    marginBottom: 20,
  },

  btnCadastro: {
    width: '86%',
    height: 43,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    backgroundColor: '#C20004',
  },

  btnCadastroText: {
    fontFamily: 'Montserrat_500Medium',
    color: '#F2F2F2'
  },

  imgCadastro: {
    marginTop: 80,
    marginLeft: 180
  },

  boxFeedback: {
    backgroundColor: '#ffffff',
    height: 33,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },

  labelComentarioFeedback: {
    color: '#636466',
    fontSize: 13,
    fontFamily: 'Quicksand_300Light',
    justifyContent : 'center',
    alignItems : 'center'
  },

  labelComentarioNota: {
    color: '#636466',
    fontSize: 13,
    fontFamily: 'Quicksand_300Light',
    justifyContent : 'center',
    alignItems : 'center'
  },

  animatedStyle1: {
    top: 6,
    left : 20,
    position: 'absolute',
    backgroundColor : '#F2F2F2',
    paddingLeft : 5,
    zIndex: 1000,
    width: 129
  },

  animatedStyle2: {
    top: 69,
    left: 20,
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    width: 210,
  }
})