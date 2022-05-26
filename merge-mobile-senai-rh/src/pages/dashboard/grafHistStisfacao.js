import React, { useEffect, useRef, useState } from 'react';
// import * as React from 'react'
import {
    PanResponder, Dimensions, Text, TouchableOpacity, View,
} from 'react-native';
import { AreaChart, XAxis, YAxis } from 'react-native-svg-charts';
import {
    Circle, Defs, G, Line, LinearGradient, Path, Rect, Stop,
    Text as SvgText,
} from 'react-native-svg';
import * as shape from 'd3-shape';

import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

import api from "../../services/apiGp3";




 

 export default function InteractiveChart() {


    const [listaDatas, setListaDatas] = useState([
        //'20', '20', '21', '22', 
        '01', '02', '03', '04','05','06', '07', '08', '09', '10',
        '11', '12', '13', '14','15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
    ]);
    const [mediasSatisfacao, setMediasSatisfacao] = useState([
        //.78, .85, .66, .66, 
        .97, .75, .9, .85, .4, .6, .4, .4, .3, .45,
        .97, .75, .9, .85, .4, .6, .4, .73, .3, .45,
        .68, .45, .7, .52, .4, .35, .4, .1, .3, .45, .66

    ]);


    useEffect(() => BuscarHistorico(), []);

    



    async function BuscarHistorico() {
        try {
          const token = await AsyncStorage.getItem("userToken");
    
          const resposta = await api.get(
            "HistoricoA/Listar/" + jwtDecode(token).jti,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
    
         if (resposta.status === 200) {
            // setListaDatas(resposta.data.map((p) => {
            //     return (p.atualizadoEm.split("-")[2]).substring(0,2);
            //   }
            //   ));
            //   setMediasSatisfacao(resposta.data.map((p) => {
            //     return parseFloat(p.nivelSatisfacao);
            //   }
            //   ));
              //console.warn('media satisfacao ' + mediasSatisfacao);
              console.warn('lista datas ' + listaDatas);
          }
        } catch (error) {
          console.warn(error);
        }
      }







    const apx = (size = 0) => {
        let width = Dimensions.get('window').width;
        return (width / 750) * size;
    };

    // const [historico, setHistorico] = useState([]);

    // const datas = historico
    // .map((p) => {
    //   return (p.atualizadoEm.split("-")[2]).substring(0,2);
    // }
    // );
    // const niveisSatisfacao = historico
    // .map((p) => {
    //   return parseFloat(p.nivelSatisfacao);
    // }
    // );
    

//samuel

    
    const size = useRef(listaDatas.length);

    const [positionX, setPositionX] = useState(-1);// The currently selected X coordinate position





    const panResponder = useRef(
        PanResponder.create({
            
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                updatePosition(evt.nativeEvent.locationX);
                return true;
            },
            onPanResponderMove: (evt, gestureState) => {
                updatePosition(evt.nativeEvent.locationX);
                return true;
            },
            onPanResponderRelease: () => {
                setPositionX(-1);
            },
        })
    );

    const updatePosition = (x) => {
        const YAxisWidth = apx(130);
        const x0 = apx(0);// x0 position
        const chartWidth = apx(750) - YAxisWidth - x0;
        const xN = x0 + chartWidth;//xN position
        const xDistance = chartWidth / size.current;// The width of each coordinate point
        if (x <= x0) {
            x = x0;
        }
        if (x >= xN) {
            x = xN;
        }

        // console.log((x - x0) )

        // The selected coordinate x :
        // (x - x0)/ xDistance = value
        let value = ((x - x0) / xDistance).toFixed(0);
        if (value >= size.current - 1) {
            value = size.current - 1; // Out of chart range, automatic correction
        }

        setPositionX(Number(value));
    };

    const CustomGrid = ({ x, y, ticks }) => (
        <G>
            {
                // Horizontal grid
                ticks.map((tick) => (
                    <Line
                        key={tick}
                        x1="0%"
                        x2="100%"
                        y1={y(tick)}
                        y2={y(tick)}
                        stroke="#EEF3F6"
                    />
                ))
            }
            {
                // Vertical grid
                mediasSatisfacao.map((_, index) => (
                    <Line
                        key={index.toString()}
                        y1="0%"
                        y2="100%"
                        x1={x(index)}
                        x2={x(index)}
                        stroke="#EEF3F6"
                    />
                ))
            }
        </G>
    );

    //LINHA DO GRAFICO
    const CustomLine = ({ line }) => (
        <Path
            key="line"
            d={line}
            stroke="#C20004"
            strokeWidth={apx(6)}
            fill="none"
        />
    );

    const CustomGradient = () => (
        <Defs key="gradient">
            <LinearGradient id="gradient" x1="0" y="0%" x2="0%" y2="100%">
                {/* <Stop offset="0%" stopColor="rgb(134, 65, 244)" /> */}
                {/* <Stop offset="100%" stopColor="rgb(66, 194, 244)" /> */}

                <Stop offset="0%" stopColor="#C20004" stopOpacity={0.25} />
                <Stop offset="100%" stopColor="blue" stopOpacity={0} />
            </LinearGradient>
        </Defs>
    );

    function Tooltip ({ x, y, ticks }) {
        if (positionX < 0) {
            return null;
        }

        const date = listaDatas[positionX];

        return (
            <G x={x(positionX)} key="tooltip">
                <G
                    x={positionX > size.current / 2 ? -apx(250 + 10) : apx(10)}
                    y={y(mediasSatisfacao[positionX]) - apx(10)}>
                    <Rect
                        y={-apx(24 + 24 + 20) / 2}
                        rx={apx(12)} // borderRadius
                        ry={apx(12)} // borderRadius
                        width={apx(300)}
                        height={apx(96)}
                        stroke="rgba(50, 50, 50, 0.27)"
                        fill="rgba(255, 255, 255, 0.8)"
                    />

                    <SvgText x={apx(20)} fill="#617485" opacity={0.65} fontSize={apx(24)}>
                        {date}
                    </SvgText>
                    <SvgText
                        x={apx(20)}
                        y={apx(24 + 20)}
                        fontSize={apx(24)}
                        fontWeight="bold"
                        fill="rgba(20, 20, 20, 1)">
                        ${mediasSatisfacao[positionX]}
                    </SvgText>
                </G>

                <G x={x}>
                    <Line
                        y1={ticks[0]}
                        y2={ticks[Number(ticks.length)]}
                        stroke="#FEBE18"
                        strokeWidth={apx(4)}
                        strokeDasharray={[6, 3]}
                    />

                    <Circle
                        cy={y(mediasSatisfacao[positionX])}
                        r={apx(20 / 2)}
                        stroke="#fff"
                        strokeWidth={apx(2)}
                        fill="black"
                    />
                </G>
            </G>
        );
    };

    const verticalContentInset = { top: apx(40), bottom: apx(40) };

    return (
        <View
            style={{
                backgroundColor: '#f1f1f1',
                alignItems: 'stretch',
                flex: 1,
                justifyContent: 'center',

            }}>
            <View
                style={{
                    flexDirection: 'row',
                    width: apx(700),
                    height: apx(350),
                    alignSelf: 'stretch',
                    paddingRight: '3%'
                }}>
                <View style={{ flex: 1 }} {...panResponder.current.panHandlers}>
                    <AreaChart
                        style={{ flex: 1 }}
                        data={mediasSatisfacao}
                        curve={shape.curveNatural}
                        //curve={shape.curveMonotoneX}
                        contentInset={{ ...verticalContentInset }}
                        svg={{ fill: 'url(#gradient)' }}>
                        <CustomLine />
                        {/* <CustomGrid /> */}
                        <CustomGradient />
                        <Tooltip />
                    </AreaChart>
                </View>

                <YAxis
                    style={{ width: apx(130) }}
                    data={mediasSatisfacao} 
                    contentInset={verticalContentInset}
                    svg={{ fontSize: apx(20), fill: '#617485' }}
                />
            </View>
            <XAxis
                style={{
                    alignSelf: 'stretch',
                    // marginTop: apx(57),
                    width: apx(650),
                    height: apx(60),
                }}
                numberOfTicks={7}
                data={mediasSatisfacao}
                formatLabel={(value, index) => listaDatas[value]}
                contentInset={{
                    left: apx(36),
                    right: apx(130),
                }}
                svg={{
                    fontSize: apx(20),
                    fill: '#617485',
                    y: apx(20),
                    // originY: 30,
                }}
            />
        </View>
    );
}