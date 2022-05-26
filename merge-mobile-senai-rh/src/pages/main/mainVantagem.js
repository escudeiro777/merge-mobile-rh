import React from 'react';
import { useNavigation } from "@react-navigation/native";
import {
    StyleSheet,
    View,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Redirecionar from "../redirecionamento/redirecionamento.js";
import ListagemCurso from '../curso/listagemCurso.js';
import ListagemDesconto from '../desconto/listagemDesconto.js';
import Favoritos from '../favoritos/favoritosCurso.js';
import FavoritosDesconto from '../favoritos/favoritosDesconto.js';
import Perfil from '../perfil/perfil.js';
// import MainFavoritos from '../main/MainFavoritos.js';
import { Entypo, Feather } from "@expo/vector-icons";

function ButtonNew({ size, color }) {
    return (
        <View style={styles.container}>
            <Entypo name="plus" color={color} size={size} />
        </View>
    );
}


const Tab = createBottomTabNavigator();

export default function MainAcompanhar() {

    const navigation = useNavigation();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#ffa500",
                tabBarInactiveTintColor: "gray",
                tabBarShowLabel: true,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#f1f1f1",
                    borderTopColor: "gray",
                    paddingBottom: 5,
                    paddingTop: 5,
                },
                headerLeft: () => null
            }}
            initialRouteName="Dashboard"
        >
            <Tab.Screen
                name="Cursos"
                component={ListagemCurso}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="book" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Descontos"
                component={ListagemDesconto}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="percent" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="Redirecionar"
                component={Redirecionar}
                options={{
                    tabBarIcon: ({ color }) => <ButtonNew size={40} color={color} />,
                    tabBarLabel: "",
                    headerShown: false,
                }}
                listeners={{
                    tabPress: (e) => {
                        // Prevent default action
                        navigation.goBack();
                    },
                }}
            />
            <>
                <Tab.Screen
                    name="Favoritos"
                    component={Favoritos}
                    options={{
                        tabBarIcon: ({ size, color }) => (
                            <Feather name="heart" size={size} color={color} />
                        ),
                        headerShown: false,
                    }}
                />
                {/* <Tab.Screen
                    name="FavoritosDesconto"
                    component={FavoritosDesconto}
                    options={{
                        tabBarIcon: ({ size, color }) => (
                            <Feather name="heart" size={size} color={color} />
                        ),
                        headerShown: false,
                    }}
                /> */}
            </>
            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="user" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
        backgroundColor: "#f1f1f1",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
        borderWidth: 4,
        borderColor: "#ffa500",
    },

    modalView: {
        flex: 1,
        backgroundColor: "white",
        //borderRadius: 20,
        alignItems: "center",
        justifyContent: 'center',
        paddingHorizontal: '5%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    iconFechar: {
        marginTop: 16,
        alignSelf: 'flex-start'
    },
    titulo: {
        fontSize: 28,
        width: "80%",
        textAlign: "center",
        marginBottom: 15,
    },
    containerLinks: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: 15,
        backgroundColor: 'transparent'
    },
    button: {
        //backgroundColor: '#C20004',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "gray",
        width: "100%",
        height: 85,
        borderRadius: 5,
        marginTop: 15,
        marginBottom: 15,
    },
    texto: {
        color: "black",
        textAlign: "center",
        fontSize: 20,
    },
});