import * as React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Modal,
    AnimatableBlurView,
    FlatList,
    Image,
    Alert,
    Pressable,
    Button,
    Animated,
} from 'react-native';
import { BlurView } from 'expo-blur';

import { TabView, SceneMap, } from 'react-native-tab-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import base64 from 'react-native-base64';
import AppLoading from 'expo-app-loading';
import api from "../../services/apiGp1";
import * as Font from 'expo-font';
import { Feather, EvilIcons, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from 'expo-document-picker';

let customFonts = {
    'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'),
    'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-SemiBold': require('../../../assets/fonts/Quicksand-SemiBold.ttf')
}


export default class TabViewExample extends React.Component {

    state = {
        index: 0,
        routes: [
            { key: 'first', title: 'Obrigatórios' },
            { key: 'second', title: 'Extras' },
        ],
        modalVisible: false,
        modalVisibleExtras: false,
        mensagem: '',
        listaAtividades: [],
        listaAtividadesExtras: [],
        minhaAtividade: {}
    }

    

    ListarMinhas = async () => {

        var Buffer = require('buffer/').Buffer


        const token = (await AsyncStorage.getItem('userToken'));
        let base64Url = token.split('.')[1]; // token you get
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        let decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
        //const xambers = JSON.parse(atob(token.split('.')[1]))
        console.warn(decodedData);



        if (token != null) {
            console.warn('cachorro')
            await api.get("/Atividades/MinhasAtividade/" + decodedData.jti, {
                headers: {
                    "Authorization": "Bearer " + token,
                },

            })
                .then(response => {
                    if (response.status === 200) {
                        // console.warn(response)
                        // console.warn(this.state.modalVisible)
                        const dadosMinhasAtividades = response.data;
                        console.warn(dadosMinhasAtividades);
                        this.setState({ listaAtividades: dadosMinhasAtividades });
                    }
                })
                .catch(response => {
                    console.warn(response)
                })
        }
    };

    ListarMinhasExtras = async () => {

        const token = await AsyncStorage.getItem("userToken");

        const xambers = base64.decode(token.split('.')[1])
        const user = JSON.parse(xambers)

        // console.warn('wertyui')

        // console.warn(user)


        if (token != null) {
            await api.get("/Atividades/MinhasAtividadeExtra/" + user.jti, {
                headers: {
                    "Authorization": "Bearer " + token,
                },

            })
                .then(response => {
                    if (response.status === 200) {
                        // console.warn(response)
                        // console.warn(this.state.modalVisible)
                        this.setState({ listaAtividades: response.data });
                    }
                })
                .catch(response => {
                    console.warn(response)
                })
        }
    };

    openModalMinhas = async (id) => {
        // console.warn(id)
        await api.get("/Atividades/" + id, {})

            .then(response => {
                let dadosApi = response.data.atividade
                //console.warn(dadosApi)
                this.setState(
                    {
                        minhaAtividade: dadosApi,
                        modalVisible: true
                    }
                )

                console.warn(dadosApi)
            })

    }

    closeModalMinhas = () => {
        this.setState({ modalVisible: false })
    }

    openModalExtras = async (id) => {
        // console.warn(id)
        await api.get("/Atividades/" + id, {})

            .then(response => {
                let dadosApi = response.data.atividade
                //console.warn(dadosApi)
                this.setState(
                    {
                        minhaAtividade: dadosApi,
                        modalVisible: true
                    }
                )
            })
    }

    closeModalExtras = () => {
        this.setState({ modalVisible: false })
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    pickDoc = async() =>{
        let result =  DocumentPicker.getDocumentAsync({})
        alert(result.uri)
        console.log(result)
    }


    componentDidMount() {
        this._loadFontsAsync();
        () => {
            this.ListarMinhas();
            this.ListarMinhasExtras();
        }
    }

    componentWillUnmount = () => {
        this.ListarMinhas();
        this.ListarMinhasExtras();
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

                    <View>
                        <Text style={styles.tituloEfects}>{'Minhas atividades'.toUpperCase()} </Text>
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
                                <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
                                <Animated.View style={{ opacity, width: '100%', borderBottomWidth: 1, }} />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        )
    };

    FirstRoute = () => (
        <View style={styles.container}>
            <FlatList
                style={styles.FlatList}
                data={this.state.listaAtividades}
                keyExtractor={item => item.idMinhasAtividades}
                renderItem={this.renderItem}
            />
        </View>
    );

    renderItem = ({ item }) => (

        <View style={styles.MinhaAtividadeCentro}>


            <View style={styles.MinhaAtividade}>
                <View style={styles.quadradoeTexto}>
                    <View style={styles.quadrado}></View>
                    <Text style={styles.TituloAtividade}> {item.nomeAtividade} </Text>

                    <View style={styles.descricaoOlho}>
                        <Text style={styles.descricao}> Data de Entrega: {Intl.DateTimeFormat("pt-BR", {
                            year: 'numeric', month: 'short', day: 'numeric',
                        }).format(new Date(item.dataConclusao))}</Text>

                        <TouchableOpacity style={styles.Modalbotao} onPress={() => this.openModalMinhas(item.idAtividade)}>
                            <AntDesign name="downcircleo" size={24} color="#636466" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.ModaleBotao}>

                        <View style={styles.statusImagem}>

                            {item.idSituacaoAtividade == 1 &&
                                <AntDesign name="check" size={24} color="black" />
                            }
                            {item.idSituacaoAtividade == 2 &&
                                <Feather name="alert-triangle" size={24} color="black" />
                            }
                            <Text style={styles.status}>{item.idSituacaoAtividade == 1 ? this.setState({ mensagem: 'Validado' }) : item.idSituacaoAtividade == 2 ? this.setState({ mensagem: 'Pendente' }) : null} </Text>

                        </View>

                    </View>
                </View>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    key={item.idMinhasAtividades == this.state.minhaAtividade.idMinhasAtividades}
                    onRequestClose={() => {
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.quadradoModal}></View>
                            <View style={styles.conteudoBoxModal}>
                                <Text style={styles.nomeBoxModal}> {this.state.minhaAtividade.nomeAtividade} </Text>
                                <Text style={styles.descricaoModal}> {this.state.minhaAtividade.descricaoAtividade} </Text>
                                <Text style={styles.itemPostadoModal}>Item Postado: {this.state.minhaAtividade.dataInicio} </Text>
                                <Text style={styles.entregaModal}> Data de Entrega: {this.state.minhaAtividade.dataConclusao} </Text>
                                <Text style={styles.entregaModal}> Responsável: {this.state.minhaAtividade.criador} </Text>


                                <TouchableOpacity style={styles.anexo} onPress={() => {pickDoc()}}>
                                    {/* <Text style={styles.mais}>   + </Text> */}
                                    <Text style={styles.txtanexo}> +   Adicionar Anexo</Text>
                                </TouchableOpacity>

                            </View>

                            <View style={styles.botoesModal} >
                                <TouchableOpacity
                                // onPress={() => setModalVisible(!modalVisibleVar)}
                                // onPress={() => Concluir()}
                                >
                                    <View style={styles.associarModal}>
                                        <Text style={styles.texto}> Concluida </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                //onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <View style={styles.fecharModal}>
                                        <Text style={styles.textoFechar} onPress={() => this.closeModalMinhas()} >Fechar X</Text>
                                    </View>

                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                </Modal>
            </View>

        </View>
    );

    SecondRoute = () => (
        <View style={styles.container}>
            <FlatList
                style={styles.FlatList}
                data={this.state.listaAtividades}
                keyExtractor={item => item.idMinhasAtividades}
                renderItem={this.renderItem2}
            />
        </View>
    );

    renderItem2 = ({ item }) => (

        <View style={styles.MinhaAtividadeCentro}>


            <View style={styles.MinhaAtividade}>
                <View style={styles.quadradoeTexto}>
                    <View style={styles.quadrado}></View>
                    <Text style={styles.TituloAtividade}> {item.nomeAtividade} </Text>

                    <View style={styles.descricaoOlho}>
                        <Text style={styles.descricao}> Data de Entrega: {Intl.DateTimeFormat("pt-BR", {
                            year: 'numeric', month: 'short', day: 'numeric',
                        }).format(new Date(item.dataConclusao))} </Text>

                        <TouchableOpacity style={styles.Modalbotao} onPress={() => this.openModalExtras(item.idAtividade)}>
                            <AntDesign name="downcircleo" size={24} color="#636466" />
                        </TouchableOpacity>

                    </View>

                    <View style={styles.ModaleBotao}>
                        <View style={styles.statusImagem}>

                            {item.idSituacaoAtividade == 1 &&
                                <AntDesign name="check" size={24} color="black" />
                            }
                            {item.idSituacaoAtividade == 2 &&
                                <Feather name="alert-triangle" size={24} color="black" />
                            }
                            {item.idSituacaoAtividade == 3 &&
                                <MaterialCommunityIcons name="clipboard-clock-outline" size={24} color="black" />
                            }
                            <Text style={styles.status}>{item.idSituacaoAtividade == 1 ? this.setState({ mensagem: 'Validado' }) : item.idSituacaoAtividade == 2 ? this.setState({ mensagem: 'Pendente' }) : item.idSituacaoAtividade == 3 ? this.setState({ mensagem: 'Avaliando' }) : null} </Text>

                        </View>

                    </View>




                </View>
            </View>


            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                key={this.state.minhaAtividade.idMinhasAtividades}
                onRequestClose={() => {
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.quadradoModal}></View>
                        <View style={styles.conteudoBoxModal}>
                            <Text style={styles.nomeBoxModal}> {this.state.minhaAtividade.nomeAtividade} </Text>
                            <Text style={styles.descricaoModal}> {this.state.minhaAtividade.descricaoAtividade} </Text>
                            <Text style={styles.itemPostadoModal}>Item Postado: {this.state.minhaAtividade.dataInicio} </Text>
                            <Text style={styles.entregaModal}> Data de Entrega: {this.state.minhaAtividade.dataConclusao} </Text>
                            <Text style={styles.entregaModal}> Responsável: {this.state.minhaAtividade.criador} </Text>


                            <TouchableOpacity style={styles.anexo}>
                                <Text style={styles.mais}>   + </Text>
                                <Text style={styles.txtanexo}>    Adicionar Anexo</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={styles.botoesModal} >
                            <TouchableOpacity
                            // onPress={() => setModalVisible(!modalVisibleVar)}
                            // onPress={() => Concluir()}
                            >
                                <View style={styles.associarModal}>
                                    <Text style={styles.texto}> Concluida </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity

                            //onPress={() => setModalVisible(!modalVisible)}
                            >
                                <View style={styles.fecharModal}>
                                    <Text style={styles.textoFechar} onPress={() => this.closeModalExtras()} >Fechar X</Text>
                                </View>

                            </TouchableOpacity>
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

};

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
        alignItems: 'center'
    },

    mainHeader: {

        alignItems: 'center',
        paddingTop: 40,

    },

    tituloEfects: {
        fontFamily: 'SemiBoldM',
        // justifyContent: 'center',
        // alignItems: 'center',
        color: '#2A2E32',
        fontSize: 30,
        paddingTop: 40,
        textAlign: 'center'
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
        paddingTop: 40,
        paddingBottom: 48
    },

    itemEquipe: {

        marginRight: 80,
        alignItems: 'center',
    },

    font: {
        fontFamily: 'Quicksand-Regular',
        color: "#636466",
        fontSize: 23,
        paddingBottom: 5,
    },

    itemIndividual: {
        alignItems: 'center',
    },

    boxTitulo: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },

    titulo: {
        color: '#B83F52',
        fontSize: 18,
        fontFamily: 'SemiBold',
    },


    MinhaAtividade: {
        // paddingTop: 80,
        // alignItems:'center',
        // justifyContent:'center',
        height: 120,
        borderWidth: 1,
        borderColor: '#B3B3B3',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        marginBottom: 20,
        width: '85%',
    },

    quadradoeTexto: {
        flexWrap: "wrap",
    },

    quadrado: {
        backgroundColor: '#2A2E32',
        height: 119,
        width: '7%',
        // borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        marginRight: 16,

    },

    TituloAtividade: {
        fontFamily: "Quicksand-SemiBold",
        fontSize: 18,
        color: "#0E0E0E",
        marginTop: 16,
        height: 36
        // marginBottom: 13,

    },

    descricao: {
        fontFamily: "Quicksand-Regular",
        textAlign: 'center',
        fontSize: 14,
        color: "#636466",
        marginBottom: 5,
    },

    status: {
        fontFamily: "Quicksand-Regular",
        fontSize: 14,
        color: "#636466",
    },

    avaliando: {
        marginRight: 9,
        marginTop: 4,
        height: 15,
        width: 15,
    },

    statusImagem: {
        flexDirection: 'row',
        marginTop: 7,
        height: 20

    },

    descricaoOlho: {
        flexDirection: 'row',
        // justifyContent: 'flex-end',
        justifyContent: 'space-between',

    },


    lineAtividade: {
        width: 260,
        paddingTop: 10,
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 3,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    modalView: {
        margin: 20,
        backgroundColor: "#F2F2F2",
        borderRadius: 5,
        padding: 35,
        alignItems: "center",
        width: 280
    },

    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        height: 40,
        width: 90,
        backgroundColor: '#F2F2F2',
        borderRadius: 5,
    },

    boxTextos: {
        marginBottom: 30,
        marginTop: 20,
    },

    Modalbotao: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        // paddingRight: 18,
        paddingTop: 6,
        // marginLeft:130,
        paddingLeft: 130
    },

    botao: {
        // flexDirection: 'row',
        // justifyContent: 'flex-start',
        // paddingTop: 20,
        // paddingLeft: 16
    },

    corBotão: {
        borderRadius: 15,
        height: 30,
        width: 87,
        backgroundColor: '#C20004',
        alignItems: 'center',
        justifyContent: 'center',
    },

    texto: {
        fontFamily: 'Montserrat-Medium',
        color: '#E2E2E2',
        fontSize: 11,
        alignItems: 'center',
    },

    botaoIndisp: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 19,
    },

    corIndisp: {
        borderRadius: 5,
        height: 40,
        width: 90,
        backgroundColor: '#B1B3B6',
        alignItems: 'center',
        justifyContent: 'center',
    },

    ModaleBotao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    textoIndisp: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#000000',
        fontSize: 11,
        alignItems: 'center',
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
    },

    modalView: {
        height: 390,
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
        paddingBottom: 16,
        marginLeft: 16
    },

    botoesModal: {
        fontFamily: 'Montserrat-Medium',
        flexDirection: 'row',
        justifyContent: 'center',
        justifyContent: 'space-evenly',
        paddingTop: 30
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

    anexo: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#B3B3B3',
        width: 175,
        marginLeft: 19,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 30
    },

    txtanexo: {
        fontFamily: 'Quicksand-Regular',
        marginRight: 40
    },

    mais: {
        fontSize: 21,
        textAlign: 'center'
    },

    textoFechar: {
        fontFamily: 'Montserrat-Medium',
        color: '#C20004'
    },

    FlatList: {
        width: '100%',
        // alignItems:'center'
    },

    MinhaAtividadeCentro: {
        alignItems: 'center',
        marginBottom: 40
    },

})