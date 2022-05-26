import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ImageBackground,
    TextInput,
    Modal,
    AnimatableBlurView,
    FlatList,
    SectionList,
    SafeAreaView,
    ScrollView,
    Pressable
} from 'react-native';

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/apiGp1'
import base64 from 'react-native-base64';
import { EvilIcons, AntDesign, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'
import AwesomeAlert from 'react-native-awesome-alerts';
import * as Permission from 'expo-permissions';
import axios from 'axios';
// import 'intl';

let customFonts = {
    'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('../../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Medium': require('../../../assets/fonts/Montserrat-Medium.ttf'),
    'Quicksand-Regular': require('../../../assets/fonts/Quicksand-Regular.ttf'),
    'Quicksand-SemiBold': require('../../../assets/fonts/Quicksand-SemiBold.ttf')
}

export default class AtividadesExtras extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaAtividades: [],
            AtividadeBuscada: {},
            modalVisible: false,
            imagemEntrega: {},
            fontsLoaded: false,
            setLoading: false,
            showAlert: false,
            showAlertSuce: false,
            mensagem: '',
        };
    }

    showAlert = () => {
        this.setState({ showAlert: true })
    }

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };

    showAlertSuce = () => {
        this.setState({ showAlertSuce: true })
    }

    hideAlertSuce = () => {
        this.setState({
            showAlertSuce: false
        });
    };

    finalizarAtividade = async (item) => {
        try{
            
            console.warn(item)
    
            const token = await AsyncStorage.getItem('userToken');
    
            const data = new FormData();
    
            data.append('arquivo', {
                uri: this.state.imagemEntrega.uri,
                type: this.state.imagemEntrega.type
            })
            console.warn(data)
    
    
            // axios({
            //     method: 'patch',
            //     url: 'http://192.168.3.84:5000/api/Atividades/FinalizarAtividade/'+ item,
            //     data : data,
            //     headers:{
            //         "Content-Type": "multipart/form-data",
            //     }
            // })
            // .then(resposta =>{
            //     console.warn(resposta)
            // })
            const resposta = await axios.patch('http://192.168.3.84:5000/api/Atividades/FinalizarAtividade/' + item, {
                arquivo: data
            }, {
                headers: {
                    "Content-Type": "multipart/form-data"
    
                }
            })
            console.warn(resposta)
        }
        catch (error) {
            console.warn(error)
            this.showAlert();
          }
      


    }


    buscarAtividade = async () => {
        var Buffer = require('buffer/').Buffer

        const token = (await AsyncStorage.getItem('userToken'));
        let base64Url = token.split('.')[1]; // token you get
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        let decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
        console.warn(decodedData.jti);

        const resposta = await api.get('/Atividades/MinhasAtividadeExtra/' + decodedData.jti);
        const dadosDaApi = resposta.data;
        //console.warn(resposta)
        this.setState({ listaAtividades: dadosDaApi });
    };

    // ListarMinhas = async () => {

    //     var Buffer = require('buffer/').Buffer


    //     const token = (await AsyncStorage.getItem('userToken'));
    //     let base64Url = token.split('.')[1]; // token you get
    //     let base64 = base64Url.replace('-', '+').replace('_', '/');
    //     let decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
    //     //const xambers = JSON.parse(atob(token.split('.')[1]))
    //     console.warn(decodedData);



    //     if (token != null) {
    //         await api.get("/Atividades/MinhasAtividade/" + decodedData.jti, {
    //             headers: {
    //                 "Authorization": "Bearer " + token,
    //             },

    //         })
    //             .then(response => {
    //                 if (response.status === 200) {
    //                     // console.warn(response)
    //                     // console.warn(this.state.modalVisible)
    //                     const dadosMinhasAtividades =  response.data;
    //                     console.warn(dadosMinhasAtividades);
    //                     this.setState({ listaAtividades: dadosMinhasAtividades });
    //                 }
    //             })
    //             .catch(response => {
    //                 console.warn(response)
    //             })



    //     }
    // };


    ProcurarAtividades = async (id) => {
        //console.warn(id)
        try {

            const resposta = await api('/Atividades/' + id);
            if (resposta.status == 200) {
                const dadosAtividades = await resposta.data.atividade;
                await this.setState({ AtividadeBuscada: dadosAtividades })
                console.warn(dadosAtividades.idAtividade)
            }
        }
        catch (erro) {
            console.warn(erro);
        }
    }

    setModalVisible = async (visible, id) => {
        if (visible == true) {
            // console.warn(id)
            await this.ProcurarAtividades(id)
            this.setState({ modalVisible: true });
            // console.warn(this.state.AtividadeBuscada)
        }
        else if (visible == false) {
            this.setState({ AtividadeBuscada: {} })
            this.setState({ modalVisible: false })
        }

    }


    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
        this.buscarAtividade();
    }

    associar = async (item) => {
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

    imagePickerCall = async () => {
        if (Constants.platform.ios) {
            const result = await Permission.askAsync(Permission.MEDIA_LIBRARY)
            if (result.status !== 'granted') {
                console.warn('permissão necessária')
            }
        }

        const data = await ImagePicker.launchImageLibraryAsync({})

        this.setState({ imagemEntrega: data })

        console.warn(this.state.imagemEntrega)
    }

    render() {
        if (!customFonts) {
            return <AppLoading />;
        }
        return (

            <View style={styles.main}>

                <View>
                    <View style={styles.mainHeader}>
                        <Image source={require('../../../assets/img-geral/logo_2S.png')}
                            style={styles.imgLogo}
                        />
                    </View>

                    <View style={styles.titulo}>

                        <Text style={styles.tituloEfects}>{'Extras'.toUpperCase()} </Text>

                        {/* <View style={styles.escritaEscolha}>
                            <View style={styles.itemEquipe}>
                                <Pressable >
                                    <Text style={styles.font}> Obrigatórios </Text>
                                </Pressable><View style={styles.line1}></View>
                            </View>
                            <View style={styles.itemIndividual}>
                                <Pressable onPress={() => this.props.navigation.navigate('AtividadesExtras')}>
                                    <Text style={styles.font}> Extras </Text>
                                    <View style={styles.line2}></View>
                                </Pressable>
                               
                            </View>
                        </View> */}
                    </View>
                </View>

                <FlatList
                    // contentContainerStyle={styles.boxAtividade}
                    // style={styles.boxAtividade}
                    data={this.state.listaAtividades}
                    keyExtractor={item => item.idAtividade}
                    renderItem={this.renderItem}
                />


            </View>

        )
    }

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
                    

                    <Text style={styles.criador}> Responsável: {item.criador} </Text>
        
                    <View style={styles.ModaleBotao}>

                        <Text style={styles.dataEntrega}>Data de Entrega: {item.dataConclusao}</Text>

                        <Pressable style={styles.Modalbotao} onPress={() => this.setModalVisible(true, item.idAtividade)}  >
                            <AntDesign name="downcircleo" size={24} color="#C20004" />
                        </Pressable>

                        {/* <View style={styles.statusImagem}>
                            {item.idSituacaoAtividade == 1 &&
                                <AntDesign name="check" size={24} color="black" />
                            }
                            {item.idSituacaoAtividade == 2 &&
                                <Feather name="alert-triangle" size={24} color="#C20004" />
                            }
                            <Text style={styles.status}>{item.idSituacaoAtividade == 1 ? this.setState({ mensagem: 'Validado' }) : item.idSituacaoAtividade == 2 ? this.setState({ mensagem: 'Pendente' }) : null} </Text>
                        </View> */}
                    </View>
                </View>


            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                key={item.idAtividade == this.state.AtividadeBuscada.idAtividade}
                onRequestClose={() => {
                    console.warn(item)
                    this.setModalVisible(!this.state.modalVisible)
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

                            <Text style={styles.entregaModal}> Recompensa em trofeu: {this.state.AtividadeBuscada.recompensaTrofeu} 
                                <EvilIcons name="trophy" size={25} color="#E7C037" /> 
                            </Text>


                            <Text style={styles.criadorModal}> criador: {this.state.AtividadeBuscada.criador} </Text>
                            {/* <TouchableOpacity onPress={this.imagePickerCall}>
                                <Text>Escolher foto</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View style={styles.botoesModal}  >
                            <Pressable onPress={() => this.finalizarAtividade(this.state.AtividadeBuscada.idAtividade)} >
                                <View style={styles.associarModal}>
                                    <Text style={styles.texto}> Concluida </Text>
                                </View>
                            </Pressable>
                            <Pressable

                                onPress={() => this.setModalVisible(!this.state.modalVisible)}
                            >
                                <View style={styles.fecharModal}>
                                    <Text style={styles.textoFechar}>Fechar X</Text>
                                </View>

                            </Pressable>
                        </View>
                    </View>

                </View>

                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title="Sucesso"
                    titleStyle={styles.tituloAlert}
                    message="Sua Atividade foi Concluida!"
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
                        this.hideAlertSuce();
                    }}
                />

                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title="Oops !"
                    titleStyle={
                        styles.tituloModalLogin
                    }
                    message="Falha ao concluir sua Atividade"
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


            </Modal>
        </View>

    )

};
const styles = StyleSheet.create({

    main: {
        flex: 1,
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
        paddingBottom: 64
    },

    tituloEfects: {
        fontFamily: 'SemiBoldM',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#2A2E32',
        fontSize: 28,
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

    line1: {
        width: '100%',
        borderBottomWidth: 1,
    },

    itemIndividual: {
        alignItems: 'center',
    },

    line2: {
        width: '100%',
        borderBottomWidth: 1,
    },

    boxAtividade: {

        // paddingTop: 40,

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
        paddingTop: 16,
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
        marginTop: 10,
        paddingLeft: 16,
        flexDirection: 'column'
    },


    nomeBox: {
        fontFamily: 'Quicksand-SemiBold',
        color: '#000000',
        fontSize: 18,
    },

    criador: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
        paddingTop: 16,
    },

    dataEntrega: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
        paddingTop: 16,
        //paddingLeft: 20
    },


    data: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
        paddingTop: 8,
    },

    Modalbotao: {
        paddingRight: 18,
        paddingTop: 13,
    },

    statusImagem: {
        flexDirection: 'row',
        marginTop: 7,
        height: 20

    },

    status: {
        fontFamily: "Regular",
        fontSize: 14,
        color: "#636466",
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
        //paddingRight:30,
        //alignItems:'flex-end',
        //justifyContent: 'space-between',
        //alignItems: 'center',


    },

    textoIndisp: {
        // fontFamily: 'Montserrat-SemiBold',
        color: '#000000',
        fontSize: 10,
        alignItems: 'center',
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        // marginTop: 22
    },

    modalView: {
        height: 410,
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

    conteudoBoxModal: {
        flexDirection: 'column',
    },

    nomeBoxModal: {
        fontFamily: 'Quicksand-SemiBold',
        textAlign: "center",
        paddingTop: 24,
        fontSize: 20,
    },

    descricaoModal: {
        fontFamily: 'Quicksand-Regular',
        paddingTop: 24,
        fontSize: 15,
        //paddingBottom: 16,
        marginLeft: 16
    },

    itemPostadoModal: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
        paddingTop: 16,
        //paddingBottom: 24,
        marginLeft: 16
    },

    entregaModal: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
        paddingTop: 16,
        marginLeft: 16,
    },

    trofeu: {
        paddingTop: 13,
    },

    criadorModal: {
        fontFamily: 'Quicksand-Regular',
        fontSize: 15,
        paddingTop: 16,
        marginLeft: 16,
        paddingBottom: 16,
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

    textoFechar: {
        fontFamily: 'Montserrat-Medium',
        color: '#C20004',
        fontSize: 12
    },
    descricao: {
        fontFamily: "Regular",
        textAlign: 'center',
        fontSize: 14,
        color: "#636466",
        marginBottom: 5,
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
        height: 30,
        paddingLeft: 23,
    },

    txtanexo: {
        fontFamily: 'Regular',
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

    tituloAlert: {
        color: 'green'
    }
})