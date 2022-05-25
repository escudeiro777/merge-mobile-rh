import React, { Component } from 'react';
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

import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import api from '../../services/apiGp1';
import { render } from 'react-dom';


export default class AlterarSenha extends Component {
    
    render() {
        return (
            <View style={styles.body}>

                <View style={styles.mainHeader}>
                    <Image source={require('../../../assets/img-geral/logo_2S.png')}
                        style={styles.imgLogo}
                    />
                </View>

                <View style={styles.container}>

                    <Text style={styles.tituloPagina}>{'alterar senha'.toUpperCase()}</Text>
                    <Text style={styles.textoPagina}> Altera aqui sua senha de acesso!</Text>

                    <View style={styles.text1}>
                        <TextInput style={styles.inputs}
                            placeholder="Nova Senha"
                            keyboardType="default"
                        />
                    </View>

                    <View>
                        <TextInput style={styles.inputs}
                            placeholder="Confirme a nova senha"
                            keyboardType="default"
                            secureTextEntry={true}
                        />
                    </View>

                    <View>
                        <TouchableOpacity
                            style={styles.btnAlterar}
                            //onPress={this.realizarLogin}
                        >
                            <Text style={styles.btnText}>
                                Alterar Senha
                            </Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
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
    },

    tituloPagina: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 30,
        color: '#2A2E32',
        width: 175,
        paddingTop: 64,
        paddingBottom: 50,
        alignItems: 'center',
    },

    text1: {

    },

    inputs: {
        width: 350,
        height: 48,
        borderWidth: 1,
        borderColor: '#B3B3B3',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        flexDirection: 'column',
        //paddingTop: 8,
        //paddingBottom:24,
        paddingLeft: 15,
    },

    btnAlterar: {
        width: 350,
        height: 46,
        fontSize: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        elevation: 16,
        backgroundColor: '#C20004',
        borderRadius: 10,
      },

      btnText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
        color: "#F2F2F2",
        alignItems: 'center',
        justifyContent: 'center',
      },
});