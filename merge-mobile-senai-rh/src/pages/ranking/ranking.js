import react from "react";
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    AnimatableBlurView,
    FlatList,
    Image,
    Alert,
    Pressable,
    ScrollView,
    SafeAreaView,
} from 'react-native';

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Leaderboard from 'react-native-leaderboard';
import { EvilIcons, Entypo, Feather, AntDesign } from "@expo/vector-icons";


import {
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
} from '@expo-google-fonts/quicksand'

import {
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light_Italic,
    Montserrat_400Regular_Italic,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black_Italic,
} from '@expo-google-fonts/montserrat';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";
import api from "../../services/apiGp1";

export default function Ranking() {

    const [ListarRanking, setListarRanking] = useState([]);
    const [RankingUsuario, setRankingUsuario] = useState([]);
    //const [count, setCount] = useState(0);
    // const [ partners, onPartnerDetails ] = props;

    let [customFonts] = useFonts({
        Regular: Quicksand_400Regular,
        Light: Quicksand_300Light,
        SemiBold: Quicksand_600SemiBold,
        Bold: Quicksand_700Bold,
        Medium: Quicksand_500Medium,
        Montserrat_100Thin,
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        MediumM: Montserrat_500Medium,
        SemiBoldM: Montserrat_600SemiBold,
        Montserrat_700Bold,
        Montserrat_800ExtraBold,
        Montserrat_900Black,
        Montserrat_100Thin_Italic,
        Montserrat_200ExtraLight_Italic,
        Montserrat_300Light_Italic,
        Montserrat_400Regular_Italic,
        // Montserrat_500Medium_Italic,
        Montserrat_600SemiBold_Italic,
        Montserrat_700Bold_Italic,
        Montserrat_800ExtraBold_Italic,
        Montserrat_900Black_Italic,
    });


    const retornaRanking = async () => {
        const token = await AsyncStorage.getItem("userToken");
        // const xambers = base64.decode(token.split('.')[1])
        // const user = JSON.parse(xambers)

        if (token != null) {
            const resposta = await api.get("/Usuarios/Ranking/", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            const dadosDaApi = await resposta.data;
            setListarRanking(dadosDaApi);
        }
    };

    // const retornaRankingUsuario = async () => {
    //     const token = await AsyncStorage.getItem("userToken");
    //     // const xambers = base64.decode(token.split('.')[1])
    //     // const user = JSON.parse(xambers)

    //     if (token != null) {
    //         const resposta = await api.get("/Usuarios/Ranking/" + user.jti, {
    //             headers: {
    //                 Authorization: "Bearer " + token,
    //             },
    //         });

    //         const dadosDaApi = await resposta.data;
    //         setRankingUsuario(dadosDaApi);
    //     }
    // };

    useEffect(() => {
        retornaRanking();
        //retornaRankingUsuario();
    }, []);

    // useEffect(() => {
    //     order();     
    // }, []);

    if (!customFonts) {
        return <AppLoading />;
    }

    // const order = () => {
    //     let lista = [...ListarRanking]
    //     ListarRanking.sort((a, b) => (b.nome > a.nome ? 1: a.nome > b.nome ? -1 : 0 ))
    //     setListarRanking (lista)
    // };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.main}>


                    <View>
                        <View style={styles.mainHeader}>
                            <Image source={require('../../../assets/img-geral/logo_2S.png')}
                                style={styles.imgLogo}
                            />

                        </View>

                        <View style={styles.titulo}>

                            <Text style={styles.tituloEfects}>{'Ranking'.toUpperCase()} </Text>

                        </View>

                        {/* <TouchableOpacity onPress={order}>
                   <Text>cvhjklç~]</Text>
                </TouchableOpacity> */}

                        {/* <FlatList
                    //ContentContainerStyle={styles.RankingGp1}
                    // style={styles.RankingGp1}
                    data={ListarRanking}
                    // data={partners.sort((a, b) => a.name.localeCompare(b.name))}
                    keyExtractor={item => item.idUsuario}
                    renderItem={renderItem}
                /> */}

                        {/* <FlatList
                    style={styles.FlatListGp1}
                    data={ListarRanking}
                    // data={ListarRanking.sort((a, b) => b.trofeus > a.trofeus)}
                    keyExtractor={(item) => item.idUsuario}
                    renderItem={({ item}) => (
                        
                        <View style={styles.RankingGp1Centro}>                         
                        <View style={styles.RankingGp1}>
                                <Text style={styles.numero}> </Text>                        
                            <Image source={require('../../../assets/img-gp1/bonecoRanking.png')}
                                style={styles.fotoRankingGp1}
                            />
                            <Text style={styles.nomeRankingGp1}>{item.nome}</Text>
                            <View style={styles.trofeuEnumero}>
                                <Image source={require('../../../assets/img-gp1/trofeu.png')}
                                    style={styles.trofeuGp1}
                                />
                                <Text style={styles.Ntrofeu} >{item.trofeus}</Text>
                            </View>
                
                        </View>
                
                        {/* <View style={styles.RankingGp1_2}>
                            <Text style={styles.numero}>2.</Text>
                            <Image source={require('../../../assets/img-gp1/bonecoRanking.png')}
                                style={styles.fotoRankingGp1}
                            />
                            <Text style={styles.nomeRankingGp1}>Manuel</Text>
                            <View style={styles.trofeuEnumero}>
                                <Image source={require('../../../assets/img-gp1/trofeu.png')}
                                    style={styles.trofeuGp1}
                                />
                                <Text style={styles.Ntrofeu} >20</Text>
                            </View>
                
                        </View>
                
                        <View style={styles.RankingGp1_3}>
                            <Text style={styles.numero}>3.</Text>
                            <Image source={require('../../../assets/img-gp1/bonecoRanking.png')}
                                style={styles.fotoRankingGp1}
                            />
                            <Text style={styles.nomeRankingGp1} >Manuel</Text>
                            <View style={styles.trofeuEnumero}>
                                <Image source={require('../../../assets/img-gp1/trofeu.png')}
                                    style={styles.trofeuGp1}
                                />
                                <Text style={styles.Ntrofeu} >20</Text>
                            </View>
                
                        </View>
                
                        <View style={styles.RankingGp1_suaposicao}>
                            <Text style={styles.numero}>15.</Text>
                            <Image source={require('../../../assets/img-gp1/bonecoRanking.png')}
                                style={styles.fotoRankingGp1}
                            />
                            <Text style={styles.nomeRankingGp1}>Manuel</Text>
                            <View style={styles.trofeuEnumero}>
                                <Image source={require('../../../assets/img-gp1/trofeu.png')}
                                    style={styles.trofeuGp1}
                                />
                                <Text style={styles.Ntrofeu} >20</Text>
                            </View>
                
                        </View> */}
                        {/* </View>)} */}

                        {/* /> */}


                        {/* <View style={styles.RankingGp1}>
                    <Text style={styles.numero}> </Text>
                    <Image source={require('../../../assets/img-gp1/bonecoRanking.png')}
                        style={styles.fotoRankingGp1}
                    />
                    <Text style={styles.nomeRankingGp1}>{item.nome}</Text>
                    v
                        <Image source={require('../../../assets/img-gp1/trofeu.png')}
                            style={styles.trofeuGp1}
                        />
                        <Text style={styles.Ntrofeu} >{item.trofeus}</Text>
                    </View> */}

                        {/* 
                <View style={styles.RankingGp1}>
                    <Text style={styles.numero}>Rank</Text>
                    <Image source={require('../../../assets/img-gp1/bonecoRanking.png')}
                        style={styles.fotoRankingGp1}
                    />
                 
                    <View style={styles.trofeuEnumero}>
                        <Image source={require('../../../assets/img-gp1/trofeu.png')}
                            style={styles.trofeuGp1}
                        />
                      c
                    </View>
                </View> */}

                        {/* <View style={styles.RankingGp1} >
                <Text style={styles.numero}>Rank</Text>
                <View style={styles.trofeuEnumero}>
                     <EvilIcons name="trophy" size={35} color="#E7C037" />
                 <Text >20</Text>   
                </View>
              
                        
                </View> */}
                        <View style={styles.RankingGp1}>

                            {/* <Leaderboard
                                //style={styles.FlatListGp1}
                                style={{ backgroundColor: 'black' }}
                                data={RankingUsuario}
                                sortBy='trofeus'
                                labelBy='nome'
                                // contentContainerStyle={styles.RankingGp1}
                            /> */}

                            <Leaderboard
                                //style={styles.FlatListGp1}
                                style={{ backgroundColor: 'black' }}
                                data={ListarRanking}
                                sortBy='trofeus'
                                labelBy='nome'
                                // contentContainerStyle={styles.RankingGp1}
                            />
                        </View>

                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

// renderItem = ({item}) => (

//     <View style={styles.RankingGp1Centro}>
//         <View style={styles.RankingGp1}>
//             <Text style={styles.numero}></Text>
//             <Image source={require('../../../assets/img-gp1/bonecoRanking.png')}
//                 style={styles.fotoRankingGp1}
//             />
//             <Text style={styles.nomeRankingGp1}>{item.nome}</Text>
//             <View style={styles.trofeuEnumero}>
//                 <Image source={require('../../../assets/img-gp1/trofeu.png')}
//                     style={styles.trofeuGp1}
//                 />
//                 <Text style={styles.Ntrofeu} >{item.trofeus}</Text>
//             </View>

//         </View>

//         {/* <View style={styles.RankingGp1_2}>
//             <Text style={styles.numero}>2.</Text>
//             <Image source={require('../../../assets/img-gp1/bonecoRanking.png')}
//                 style={styles.fotoRankingGp1}
//             />
//             <Text style={styles.nomeRankingGp1}>Manuel</Text>
//             <View style={styles.trofeuEnumero}>
//                 <Image source={require('../../../assets/img-gp1/trofeu.png')}
//                     style={styles.trofeuGp1}
//                 />
//                 <Text style={styles.Ntrofeu} >20</Text>
//             </View>

//         </View>

//         <View style={styles.RankingGp1_3}>
//             <Text style={styles.numero}>3.</Text>
//             <Image source={require('../../../assets/img-gp1/bonecoRanking.png')}
//                 style={styles.fotoRankingGp1}
//             />
//             <Text style={styles.nomeRankingGp1} >Manuel</Text>
//             <View style={styles.trofeuEnumero}>
//                 <Image source={require('../../../assets/img-gp1/trofeu.png')}
//                     style={styles.trofeuGp1}
//                 />
//                 <Text style={styles.Ntrofeu} >20</Text>
//             </View>

//         </View>

//         <View style={styles.RankingGp1_suaposicao}>
//             <Text style={styles.numero}>15.</Text>
//             <Image source={require('../../../assets/img-gp1/bonecoRanking.png')}
//                 style={styles.fotoRankingGp1}
//             />
//             <Text style={styles.nomeRankingGp1}>Manuel</Text>
//             <View style={styles.trofeuEnumero}>
//                 <Image source={require('../../../assets/img-gp1/trofeu.png')}
//                     style={styles.trofeuGp1}
//                 />
//                 <Text style={styles.Ntrofeu} >20</Text>
//             </View>

//         </View> */}
//     </View>
// )

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#F2F2F2',
        alignItems: 'center',
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
        fontSize: 30,
    },

    RankingGp1: {
        fontFamily: 'Light',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // height: 55,
        // borderWidth: 1,
        // borderColor: '#B3B3B3',
        // backgroundColor: 'white',
        // borderRadius: 10,
        // borderBottomColor:'#F2F2F2',
        // marginBottom: 24,
        // width: '85%',

    },

    numero: {
        fontFamily: 'SemiBold',
        marginLeft: 29,

    },
    trofeuEnumero: {
        flexDirection: 'row',
    },

    Ntrofeu: {
        fontFamily: 'Light',
        marginLeft: 10,
        marginTop: 2
    },

    trofeuGp1: {
        marginRight: 30
    },
    nomeRankingGp1: {
        fontFamily: 'Light',
    },

    RankingGp1_2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        borderWidth: 1,
        borderColor: '#B3B3B3',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        marginBottom: 24,
        width: '78%',

    },
    RankingGp1_3: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        borderWidth: 1,
        borderColor: '#B3B3B3',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        marginBottom: 24,
        width: '78%',

    },

    RankingGp1_suaposicao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        borderWidth: 3,
        borderColor: '#2A2E32',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        marginBottom: 24,
        width: '78%',

    },
    // FlatListGp1: {
    //     width:'78%',
    //     justifyContent: 'center',
    //     alignItems: 'center',

    // },
    RankingGp1Centro: {
        alignItems: 'center',
        justifyContent: 'center',
    },



});