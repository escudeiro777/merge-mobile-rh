import * as React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
    Modal,
    AnimatableBlurView,
    FlatList,
    SectionList,
    SafeAreaView,
    ScrollView,
    Pressable,
    Animated,
} from 'react-native';

import { TabView, SceneMap} from 'react-native-tab-view';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/apiGp1';
import base64 from 'react-native-base64';
import { EvilIcons, AntDesign, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";


export default class TabViewExample extends React.Component {

    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Obrigatórios' },
            { key: 'second', title: 'Extras' },
        ],
        listaAtividades: [],
        listaAtividadesExtras: [],
        AtividadeBuscada: {},
        AtividadeBuscadaExtras: {},
        modalVisibleAtividade: false,
        modalVisibleExtras: false,
    };

    buscarAtividade = async () => {
        const resposta = await api.get('/Atividades/ListarObrigatorias');
        const dadosDaApi = resposta.data;
        this.setState({ listaAtividades: dadosDaApi });
    };

    buscarExtras = async () => {
        const resposta = await api.get('/Atividades/ListarExtras');
        const dadosDaApi = resposta.data;
        this.setState({ listaAtividadesExtras: dadosDaApi });
    };

    ProcurarAtividades = async (id) => {
        //console.warn(id)
        try {

            const resposta = await api('/Atividades/' + id);
            if (resposta.status == 200) {
                const dadosAtividades = await resposta.data.atividade;
                await this.setState({ AtividadeBuscada: dadosAtividades })
            }
        }
        catch (erro) {
            console.warn(erro);
        }
    }

    ProcurarExtras = async (id) => {
        //console.warn(id)
        try {

            const resposta = await api('/Atividades/' + id);
            if (resposta.status == 200) {
                const dadosAtividades = await resposta.data.atividade;
                await this.setState({ AtividadeBuscadaExtras: dadosAtividades })
            }
        }
        catch (erro) {
            console.warn(erro);
        }
    }


    setModalVisibleAtividade = async (visible, id) => {
        if (visible == true) {
            // console.warn(id)
            await this.ProcurarAtividades(id)
            this.setState({ modalVisibleAtividade: true });
            // console.warn(this.state.AtividadeBuscada)
        }
        else if (visible == false) {
            this.setState({ AtividadeBuscada: {} })
            this.setState({ modalVisibleAtividade: false })
        }

    }

    setModalVisibleExtras = async (visible, id) => {
        if (visible == true) {
            //console.warn(id)
            await this.ProcurarExtras(id)
            this.setState({ modalVisibleExtras: true });
            //console.warn(this.state.AtividadeBuscada)
        }
        else if (visible == false) {
            this.setState({ AtividadeBuscadaExtras: {} })
            this.setState({ modalVisibleExtras: false })
        }

    }

    associarAtividade = async (item) => {
        var Buffer = require('buffer/').Buffer
        try {
            console.warn(item)
            const token = (await AsyncStorage.getItem('userToken'));
            let base64Url = token.split('.')[1]; // token you get
            let base64 = base64Url.replace('-', '+').replace('_', '/');
            let decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
            //const xambers = JSON.parse(atob(token.split('.')[1]))
            console.warn(decodedData);

            const resposta = await api.post(
                '/Atividades/Associar/' + decodedData.jti + '/' + item,
                {

                },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                },

                // console.warn(resposta)


            );
            if (resposta.status == 200) {
                console.warn('Voce se associou a uma atividade');
            } else {
                console.warn('Falha ao se associar.');
            }
        } catch (error) {
            console.warn(error);
        }
    }

    associarExtras = async (item) => {
        var Buffer = require('buffer/').Buffer
        try {
            console.warn(item)
            const token = (await AsyncStorage.getItem('userToken'));
            let base64Url = token.split('.')[1]; // token you get
            let base64 = base64Url.replace('-', '+').replace('_', '/');
            let decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
            //const xambers = JSON.parse(atob(token.split('.')[1]))
            console.warn(decodedData);

            const resposta = await api.post(
                '/Atividades/Associar/' + decodedData.jti + '/' + item,
                {

                },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                },

            ); if (resposta.status == 200) {
                console.warn(resposta)
                console.warn('Voce se associou a uma atividade');
            } else {
                console.warn('Falha ao se associar.');
            }
        } catch (error) {
            console.warn(error);
        }
    }

    componentDidMount() {
        this.buscarAtividade();
        this.buscarExtras();
    }

    componentWillUnmount = () => {
        this.buscarAtividade();
        this.buscarExtras();
    }

    _handleIndexChange = (index) => this.setState({ index });

    _renderTabBar = (props) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={styles.main}>

                <View>
                    <View style={styles.mainHeader}>
                        <Image source={require('../../../assets/img-geral/logo_2S.png')}
                            style={styles.imgLogo}
                        />
                    </View>

                    <View style={styles.titulo}>

                        <Text style={styles.tituloEfects}>{'atividades'.toUpperCase()} </Text>
                    </View>
                </View>
                <View style={styles.tabBar}>
                    {props.navigationState.routes.map((route, i) => {
                        const opacity = props.position.interpolate({
                            inputRange,
                            outputRange: inputRange.map((inputIndex) =>
                                inputIndex === i ? 1 : 0.5
                            ),
                        });

                        return (
                            <TouchableOpacity
                                style={styles.tabItem}
                                onPress={() => this.setState({ index: i })}>
                                <Animated.Text style={{ opacity, fontFamily: 'Montserrat-SemiBold', }}>{route.title}</Animated.Text>
                                <Animated.View style={{ opacity,width: '100%', borderBottomWidth: 1, }} />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    };

    FirstRoute = () => (
        <View style={styles.container}>
            <FlatList
                style={styles.FlatList}
                data={this.state.listaAtividades}
                keyExtractor={item => item.idAtividade}
                renderItem={this.renderItem}
            />
        </View>
    );

    renderItem = ({ item }) => (

        <View style={styles.boxAtividade}>
            <View style={styles.box}>
                <View style={styles.quadrado}></View>
                <View style={styles.espacoPontos}>
                    <Text style={styles.pontos}> {item.recompensaMoeda} Cashs </Text>
                    <FontAwesome5 name="coins" size={24} color="black" />
                </View>
                <View style={styles.conteudoBox}>
                    <Text style={styles.nomeBox}> {item.nomeAtividade} </Text>

                    <Text style={styles.criador}> Responsável: {item.idGestorCadastroNavigation.nome} </Text>
                    <Text style={styles.data}> Item Postado: {item.dataCriacao}
                    {/* {new Intl.DateTimeFormat("pt-BR", {year: 'numeric', month: 'short', day: 'numeric'}).format((item.dataCriacao))} */}
                    </Text>
                </View>

                <View style={styles.ModaleBotao}>
                    <Pressable style={styles.botao}
                        onPress={() => this.associarAtividade(item.idAtividade)}
                    >
                        <View style={styles.corBotão}>
                            <Text style={styles.texto}>+ Minha Lista </Text>
                        </View>
                    </Pressable>

                    <Pressable style={styles.Modalbotao} onPress={() => this.setModalVisibleAtividade(true, item.idAtividade)}  >

                        <AntDesign name="downcircleo" size={24} color="#636466" />


                    </Pressable>
                </View>

            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisibleAtividade}
                key={item.idAtividade == this.state.AtividadeBuscada.idAtividade}
                onRequestClose={() => {
                    console.warn(item)
                    this.setModalVisibleAtividade(!this.state.modalVisibleAtividade)
                }}
            >


                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.quadradoModal}></View>
                        <View style={styles.conteudoBoxModal}>
                            <Text style={styles.nomeBoxModal}>{this.state.AtividadeBuscada.nomeAtividade} </Text>
                            <Text style={styles.descricaoModal}> {this.state.AtividadeBuscada.descricaoAtividade}</Text>
                            <Text style={styles.itemPostadoModal}> Item Postado: {this.state.AtividadeBuscada.dataCriacao} </Text>
                            <Text style={styles.entregaModal}> Data de Entrega: {this.state.AtividadeBuscada.dataConclusao} </Text>
                            <Text style={styles.criadorModal}> Responsável: {this.state.AtividadeBuscada.criador} </Text>

                        </View>
                        <View style={styles.botoesModal}  >
                            <Pressable onPress={() => this.associarAtividade(this.state.AtividadeBuscada.idAtividade)} >
                                <View style={styles.associarModal}>
                                    <Text style={styles.texto}>+ Minha Lista </Text>
                                </View>
                            </Pressable>
                            <Pressable

                                onPress={() => this.setModalVisibleAtividade(!this.state.modalVisibleAtividade)}
                            >
                                <View style={styles.fecharModal}>
                                    <Text style={styles.textoFechar}>Fechar X</Text>
                                </View>

                            </Pressable>
                        </View>
                    </View>

                </View>

            </Modal>
        </View>

    );

    SecondRoute = () => (
        <View style={styles.container}>
            <FlatList
                style={styles.FlatList}
                data={this.state.listaAtividadesExtras}
                keyExtractor={item => item.idAtividade}
                renderItem={this.renderItem2}
            />
        </View>
    );

    renderItem2 = ({ item }) => (

        <View style={styles.boxAtividade}>
            <View style={styles.box}>
                <View style={styles.quadrado}></View>
                <View style={styles.espacoPontos}>
                    <Text style={styles.pontos}> {item.recompensaMoeda} Cashs </Text>
                    <FontAwesome5 name="coins" size={24} color="black" />
                </View>
                <View style={styles.conteudoBox}>
                    <Text style={styles.nomeBox}> {item.nomeAtividade} </Text>

                    <Text style={styles.criador}> Responsável: {item.idGestorCadastroNavigation.nome} </Text>
                    <Text style={styles.data}> Item Postado:  {item.dataCriacao}
                    {/* {Intl.DateTimeFormat("pt-BR", {
                        year: 'numeric', month: 'short', day: 'numeric',
                    }).format(new Date(item.dataCriacao))}  */}
                    </Text>
                </View>

                <View style={styles.ModaleBotao}>
                    <Pressable style={styles.botao}
                        onPress={() => this.associarExtras(item.idAtividade)}
                    >
                        <View style={styles.corBotão}>

                            <Text style={styles.texto}> Me Associar </Text>
                        </View>
                    </Pressable>

                    <Pressable style={styles.Modalbotao} onPress={() => this.setModalVisibleExtras(true, item.idAtividade)}  >

                        <AntDesign name="downcircleo" size={24} color="#636466" />


                    </Pressable>
                </View>

            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisibleExtras}
                key={item.idAtividade == this.state.AtividadeBuscadaExtras.idAtividade}
                onRequestClose={() => {
                    console.warn(item)
                    this.setModalVisibleExtras(!this.state.modalVisibleExtras)
                }}
            >


                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.quadradoModal}></View>
                        <View style={styles.conteudoBoxModal}>
                            <Text style={styles.nomeBoxModal}>{this.state.AtividadeBuscadaExtras.nomeAtividade} </Text>
                            <Text style={styles.descricaoModal}> {this.state.AtividadeBuscadaExtras.descricaoAtividade}</Text>
                            <Text style={styles.itemPostadoModal}> Item Postado: {this.state.AtividadeBuscadaExtras.dataCriacao} </Text>
                            <Text style={styles.entregaModal}> Data de Entrega: {this.state.AtividadeBuscadaExtras.dataConclusao} </Text>
                            <Text style={styles.pessoasModal}> Em {this.state.AtividadeBuscadaExtras.equipe} </Text>
                            <Text style={styles.criadorModal}> Responsável: {this.state.AtividadeBuscadaExtras.criador} </Text>
                        </View>
                        <View style={styles.botoesModal}  >
                            <Pressable onPress={() => this.associarExtras(this.state.AtividadeBuscadaExtras.idAtividade)} >
                                <View style={styles.associarModal}>
                                    <Text style={styles.texto}> Me Associar </Text>
                                </View>
                            </Pressable>
                            <Pressable

                                onPress={() => this.setModalVisibleExtras(!this.state.modalVisibleExtras)}
                            >
                                <View style={styles.fecharModal}>
                                    <Text style={styles.textoFechar}>Fechar X</Text>
                                </View>

                            </Pressable>
                        </View>
                    </View>

                </View>

            </Modal>
        </View>

    );

    _renderScene = SceneMap({
        first: this.FirstRoute,
        second: this.SecondRoute,
    });

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={this._renderScene}
                renderTabBar={this._renderTabBar}
                onIndexChange={this._handleIndexChange}
            />
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    FlatList: {
        width: '100%',
    },

    main: {
        //flex: 1,
        backgroundColor: '#F2F2F2',
    },

    mainHeader: {
        alignItems: 'center',
        paddingTop: 40,
    },

    titulo: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },

    tituloEfects: {
        fontFamily: 'Montserrat-SemiBold',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#2A2E32',
        fontSize: 30,
    },

    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#B3B3B3',
        // marginTop: 50,
    },

    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#F2F2F2',
    },

    escritaEscolha: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 30,
        // paddingBottom:20
    },

    itemEquipe: {

        marginRight: 80,
        alignItems: 'center',
    },

    font: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 20,
        paddingBottom: 5,
    },

    itemIndividual: {
        alignItems: 'center',
    },

    boxAtividade: {
        paddingTop: 40,
        alignItems: 'center',
    },

    quadrado: {
        backgroundColor: '#2A2E32',
        height: 28,
        width: '100%',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,

    },

    box: {
        height: 210,
        borderWidth: 1,
        borderColor: '#B3B3B3',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        marginBottom: 40,
        width: '85%',
    },

    espacoPontos: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 10,
        paddingRight: 18,
    },

    pontos: {
        fontSize: 14,
        paddingRight: 5,
        fontFamily: 'Quicksand-SemiBold',
    },

    imgCoins: {
        width: 18,
        height: 18,
    },

    conteudoBox: {
        paddingLeft: 15,
    },


    nomeBox: {
        fontFamily: 'Quicksand-SemiBold',
        color: '#000000',
        fontSize: 18,
    },

    criador: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,

        paddingTop: 8,
    },


    data: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
        paddingTop: 8,
    },
    Modalbotao: {
        paddingRight: 18,
        paddingTop: 15
    },

    botao: {
        // flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 20,
        paddingLeft: 16
    },

    corBotão: {
        borderRadius: 15,
        height: 30,
        width: 100,
        backgroundColor: '#C20004',
        alignItems: 'center',
        justifyContent: 'center',
    },

    texto: {
        fontFamily: 'Montserrat-Medium',
        color: '#E2E2E2',
        fontSize: 11,
        //alignItems: 'center',
    },

    botaoIndisp: {
        //alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 19,
    },

    corIndisp: {
        borderRadius: 5,
        height: 40,
        width: 90,
        backgroundColor: '#B1B3B6',
        //alignItems: 'center',
        justifyContent: 'center',
    },

    ModaleBotao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //alignItems: 'center',


    },

    textoIndisp: {
        // fontFamily: 'Montserrat-SemiBold',
        color: '#000000',
        fontSize: 11,
        alignItems: 'center',
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        // marginTop: 22
    },

    modalView: {
        height: 350,
        borderWidth: 1,
        borderColor: '#B3B3B3',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        // marginBottom: 20,
        width: '78%',

    },

    quadradoModal: {
        backgroundColor: '#2A2E32',
        height: 35,
        width: '100%',
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8

    },
    nomeBoxModal: {
        fontFamily: 'Quicksand-SemiBold',
        textAlign: "center",
        paddingTop: 24,
        fontSize: 20

    },

    descricaoModal: {
        fontFamily: 'Quicksand-Regular',
        paddingTop: 24,
        fontSize: 15,
        paddingBottom: 16,
        marginLeft: 16
    },

    itemPostadoModal: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
        paddingBottom: 16,
        marginLeft: 16
    },

    entregaModal: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
        paddingBottom: 16,
        marginLeft: 16
    },

    criadorModal: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
        paddingBottom: 30,
        marginLeft: 16
    },

    botoesModal: {
        fontFamily: 'Montserrat-Medium',
        flexDirection: 'row',
        justifyContent: 'center',
        justifyContent: 'space-evenly'
    },

    associarModal: {
        borderRadius: 15,
        height: 30,
        width: 108,
        backgroundColor: '#C20004',
        alignItems: 'center',
        justifyContent: 'center',
    },

    fecharModal: {
        borderRadius: 15,
        height: 30,
        width: 108,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#C20004',
        color: '#C20004'
    },

    textoFechar: {
        fontFamily: 'Montserrat-Medium',
        color: '#C20004'
    }, 
});