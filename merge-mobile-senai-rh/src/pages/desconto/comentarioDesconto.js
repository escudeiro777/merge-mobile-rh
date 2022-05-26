import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    Pressable,
    Image,
    FlatList,
    TextInput,
    ScrollView
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Component } from 'react/cjs/react.production.min';
import { AppRegistry } from 'react-native-web';
import ExplodingHeart from 'react-native-exploding-heart';
import { Rating, AirbnbRating } from 'react-native-ratings';
import AwesomeAlert from 'react-native-awesome-alerts';
import ReadMore from 'react-native-read-more-text';
import api from "../../services/apiGp2"
import apiGp1 from '../../services/apiGp1';
import apiMaps from '../../services/apiMaps.js';
import * as Location from 'expo-location';
const delay = require('delay');
// import { Location, Permissions } from 'expo';

export default class ListagemDesconto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            showAlert: false,
            notaDesconto: 0,
            comentario: '',
            listaDesconto: [],
            listaComentario: [],
            descontoBuscado: [],
            listaComentarioBuscado: [],
        };
    }

    ListaComentarios = async () => {
        try {
            let id = await AsyncStorage.getItem('descontoId')
            const resposta = await api('/ComentarioDescontos/Comentario/' + id);

            if (resposta.status == 200) {
                const dadosComentarios = await resposta.data;
                var stringComentarioBuscado = JSON.stringify(dadosComentarios);
                let objComentarioBuscado = JSON.parse(stringComentarioBuscado);
                this.setState({ listaComentarioBuscado: objComentarioBuscado });
                console.warn(this.state.listaComentarioBuscado)
            }
        } catch (erro) {
            console.warn(erro);
        }
    }

    CadastrarComentario = async () => {
        try {
            let id = await AsyncStorage.getItem('descontoId')
            let idUser = await AsyncStorage.getItem('idUsuario');
            const resposta = await api.post('/ComentarioDescontos', {
                idDesconto: id,
                idUsuario: idUser,
                avaliacaoDesconto: this.state.notaDesconto,
                comentarioDesconto1: this.state.comentario,
            });
            
            if (resposta.status == 201) {
                this.ListaComentarios();
                this.setState({ notaDesconto: 0 })
            }
        } catch (erro) {
            console.warn(erro);
        }
    }

    test() {
        console.warn("CHEGOU")
    }

    avaliacaoDesconto = (rating) => {
        console.warn("Nota é: " + rating)
        this.setState({ notaDesconto: rating })
    }

    componentDidMount = () => {
        // setTimeout(function(){this.setState({ timeGeolocation: true})}, 1000);
        this.ListaComentarios();
    }

    render() {
        return (
            <View style={styles.comentarios}>
                <View style={styles.boxComentarioSair}>
                    <Pressable onPress={() => this.props.navigation.navigate('MainVantagem')}>
                        <Text>Voltar</Text>
                    </Pressable>

                    <Text>Comentarios:</Text>
                </View>

                <View style={styles.boxComentar}>
                    <TextInput
                        placeholder="Comente"
                        keyboardType="default"
                        placeholderTextColor="#B3B3B3"
                        onChangeText={comentario => this.setState({ comentario })}
                    />
                    <AirbnbRating
                        count={5}
                        showRating={false}
                        selectedColor={'#C20004'}
                        defaultRating={0}
                        isDisabled={false}
                        onFinishRating={this.avaliacaoDesconto}
                        size={20}
                    />
                    <View>
                        <Pressable onPress={() => this.CadastrarComentario()} style={styles.btnComentar}>
                            <Text>Enviar</Text>
                        </Pressable>
                    </View>
                </View>

                <FlatList
                    style={styles.flatlist}
                    data={this.state.listaComentarioBuscado}
                    keyExtractor={item => item.idComentarioDesconto}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
    renderItem = ({ item }) => (
        <View View style={styles.containerComentarios}>
            <View style={styles.boxComentarioEstrela}>
                {/* {this.test()} */}
                <View style={styles.boxComentario}>
                    <Text style={styles.textComentario}>{item.idUsuarioNavigation.nome}: {item.comentarioDesconto1}</Text>
                    <AirbnbRating
                        count={5}
                        showRating={false}
                        selectedColor={'#C20004'}
                        defaultRating={item.avaliacaoDesconto}
                        isDisabled={true}
                        size={20}
                    />
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    containerListagem: {
        flex: 1,
        alignItems: 'center'
    },
    textComentario: {
        fontSize: 4,
    },
    boxLogoHeader: {
        marginTop: 50
    },
    comentarios: {
        width: '100%',
        height: 70,
    },
    boxTituloPrincipal: {
        marginTop: 24,
        marginBottom: 24
    },
    textTituloPrincipal: {
        textTransform: 'uppercase',
        fontFamily: 'Montserrat-Bold',
        fontSize: 30
    },
    boxComentarioSair: {
        display: 'flex',
        flexDirection: 'row',
    },
    comentarios: {
        flex: 1,
    },
    flatlist: {
        flex: 1,
        height: '100%',
    },
    boxComentarioEstrela: {
        flex: 1,
        height: '100%',
        marginBottom: 10,
    },
    textComentario: {
        fontSize: 14,
        fontWeight: '400',
        marginRight: 2,
        color: 'black',
        marginLeft: 110
    },
    boxComentar: {
        width: 500,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 100,
        marginBottom: 50
    },
    btnComentar: {
        marginLeft: 50
    }
})