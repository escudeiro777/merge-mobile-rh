import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
    Animated,
    Alert,
} from 'react-native';

import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import api from '../../services/apiGp1';
import { render } from 'react-dom';
import AwesomeAlert from 'react-native-awesome-alerts';

let customFonts = {
    'Montserrat-Regular': require("../../../assets/fonts/Montserrat-Regular.ttf"),
    // 'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
    'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf')
}

export default function Ranking() {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         email: '',
    //         codigo: '',
    //         error: "Código Incorreto!",
    //         isActiveCodigo: false,
    //         fontsLoaded: false,
    //         setLoading: false,
    //         showAlert: false,
    //         isRec:true
    //     };
    // }

    // notify_Logar_Failed = () => toast.error("Código Incorreto!")
    // showAlert = () => {
    //     this.setState({ showAlert: true })
    // }

    // hideAlert = () => {
    //     this.setState({
    //         showAlert: false
    //     });
    // };


    // EnviarEmail = async () => {
    //     try {
    //         const resposta = await api.post('/Usuarios/RecuperarSenhaEnviar/' + email, {
    //         });
    //     } catch (error) {
    //         console.warn(error)
    //         this.showAlert();
    //     }

    // }

    // AlteraSenha = async () => {
    //     api.post("/Usuarios/RecuperarSenhaVerifica/" + codigo, {}, {

    //     });
    //     console.warn(error)
    //     this.showAlert();
    // }
   
    


    // async _loadFontsAsync() {
    //     await Font.loadAsync(customFonts);
    //     this.setState({ fontsLoaded: true });
    // }

    // componentDidMount() {
    //     this._loadFontsAsync();
    // }
    const [email, setEmail] = useState('');
    const [codigo, setCodigo] = useState('');
    const [isActiveCodigo, setIsActiveCodigo] = useState(false);
    const isRec = true;
    const notify_Logar_Failed = () => toast.error("Código Incorreto!")
    // const history = useHistory();




    const EnviarEmail = (event) => {
        event.preventDefault();

        api.post("/Usuarios/RecuperarSenhaEnviar/" + email, {
        }, {
            headers: {
                'Content-Type': 'application/json',

            }
        })
            .then(response => {
                if (response.status === 200) {
                    setIsActiveCodigo(true)
                    console.warn(isActiveCodigo)
                }
            })
            .catch(response => {
                console.warn(response)
                notify_Logar_Failed()
            })

    }

    const AlteraSenha = (event) => {
        event.preventDefault();

        api.post("/Usuarios/RecuperarSenhaVerifica/" + codigo, {}, {
            headers: {
                'Content-Type': 'application/json',

            }
        })
            .then(response => {
                if (response.status === 200) {
                    history.push({
                        pathname: '/AlterarSenhaRec/'
                    })
                }
            })
            .catch(response => {
                console.warn(response)
                notify_Logar_Failed()
            })
    }


    // render() {
    //     // if (!this.state.fontsLoaded) {
    //     //     return <AppLoading />;
    //     //   }

        return (
            <View style={styles.body}>

                {/* <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title="Oops !"
                    titleStyle={
                        styles.tituloModalLogin
                    }
                    message="O Email inserído é inválido!"
                    messageStyle={styles.textoModalLogin}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    confirmButtonStyle={styles.confirmButton}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="Voltar"
                    confirmButtonColor="#C20004"
                    onConfirmPressed={() => {
                        this.hideAlert();
                    }}
                />
                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title="Oops !"
                    titleStyle={
                        styles.tituloModalLogin
                    }
                    message="O Código inserído é inválido!"
                    messageStyle={styles.textoModalLogin}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    confirmButtonStyle={styles.confirmButton}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="Voltar"
                    confirmButtonColor="#C20004"
                    onConfirmPressed={() => {
                        this.hideAlert();
                    }}
                />
                <AwesomeAlert
                    style={styles.bao}
                    show={this.state.showAlert}
                    showProgress={false}
                    title="Sucesso"
                    message=""
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    cancelText="Okay"
                    cancelButtonColor="#C20004"
                    cancelButtonStyle={this.alertView = StyleSheet.create({
                        width: 150,
                        paddingLeft: 62
                    })}
                    onCancelPressed={() => {
                        this.hideAlert();
                    }}
                /> */}

                <View style={styles.mainHeader}>
                    <Image source={require('../../../assets/img-geral/logo_2S.png')}
                        style={styles.imgLogo}
                    />
                </View>

                <View style={styles.container}>

                    <View style={styles.escrita}>
                        <Text style={styles.tituloPagina}>{'Recuperar senha'.toUpperCase()}</Text>
                        <Text style={styles.textoPagina}>Insira o Email da conta que será recuperada,
                            e depois, insira o Codigo que foi enviado por Email!</Text>
                    </View>

                    <View style={styles.text1}>

                        <TextInput style={styles.inputs}
                            placeholder="Email"
                            keyboardType="default"
                            placeholderTextColor="#B3B3B3"
                            onChangeText={email => setEmail({ email })}
                            // value={evt}
                        />
                        <TouchableOpacity
                            style={styles.btnEmail}
                            //onPress={this.realizarLogin}
                            onPress={(event) => EnviarEmail(event)}
                        >
                            <Text style={styles.btnText} > Enviar Email</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.text2}>
                        <TextInput style={styles.inputs}
                            placeholder="Código"
                            keyboardType="numeric"
                            secureTextEntry={true}
                            placeholderTextColor="#B3B3B3"
                            onChangeText={codigo => setCodigo({ codigo })}
                            // value={evt}
                        />

                        <TouchableOpacity
                            style={styles.btnCodigo}
                            //onPress={this.realizarLogin}
                            onPress={(event) => AlteraSenha(event)}
                        >
                            <Text style={styles.btnText} > Enviar Código</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }



const styles = StyleSheet.create({

    body: {
        backgroundColor: '#F2F2F2',
    },

    mainHeader: {
        paddingTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    imgLogo: {
        width: 224,
        height: 31,
    },

    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    escrita: {
        width: '83%',
    },

    tituloPagina: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 30,
        color: '#2A2E32',
        paddingTop: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textoPagina: {
        //alignItems: 'center',
        //justifyContent:'center',
        paddingBottom: 56,
        fontSize: 14,
        fontFamily: 'Quicksand_300Light',

    },

    tituloModalLogin:
    {
        color: '#C20004',
        fontFamily: 'Montserrat-Medium',
        fontSize: 23,
        fontWeight: 'bold'
    },

    textoModalLogin:
    {
        width: 200,
        textAlign: 'center'
    },

    confirmButton: {
        width: 100,

        paddingLeft: 32
    },

    text2: {
        paddingTop: 56,
    },

    inputs: {
        fontFamily: 'Montserrat-Regular',
        width: 350,
        height: 48,
        borderWidth: 1,
        borderColor: '#B3B3B3',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        flexDirection: 'column',
        paddingLeft: 15,
    },

    btnEmail: {
        width: 350,
        height: 46,
        fontSize: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        elevation: 16,
        backgroundColor: '#C20004',
        borderRadius: 10,
    },

    btnCodigo: {
        width: 350,
        height: 46,
        fontSize: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        elevation: 16,
        backgroundColor: '#2A2E32',
        borderRadius: 10,
    },

    btnText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: "#F2F2F2",
        alignItems: 'center',
        justifyContent: 'center',
    },

    tituloModalLogin:
    {
      color: '#C20004',
      fontFamily: 'Montserrat-Medium',
      fontSize: 23,
      fontWeight: 'bold'
    },
    textoModalLogin:
    {
      width: 200,
      textAlign: 'center'
    },
    confirmButton:{
      width: 100,
     
      paddingLeft: 32
    },

});