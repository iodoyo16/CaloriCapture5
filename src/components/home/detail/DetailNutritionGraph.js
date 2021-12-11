import React,{useState,useEffect} from 'react'
import {Text,View,StyleSheet} from 'react-native'
import {Grid, LineChart,AreaChart,PieChart, XAxis, YAxis,} from "react-native-svg-charts";
import * as shape from "d3-shape";
import {Circle, G, Line, Rect} from "react-native-svg";
export default function DetailNutritionGraph({dateString,myDetailHistory,myMealsTotal,oneDayInfo}){
    const data_percentage = Array.from({length:201},(v,i)=>i);
    const data_time=Array.from({length:13},(v,i)=>0);
    const data_kcal=Array.from({length:25},()=>0);
    const data_fat=Array.from({length:25},()=>0);
    const data_carbon=Array.from({length:25},()=>0);
    const data_protein=Array.from({length:25},()=>0);
    const nutritionDataArr=[
        {data:data_kcal,svg:{stroke:'rgba(255, 45, 44, 1)',strokeWidth:4}},
        {data:data_fat,svg:{stroke:'rgba(255, 204, 0, 1)',strokeWidth:3}},
        {data:data_carbon,svg:{stroke:'rgba(134, 65, 244, 1)',strokeWidth:3}},
        {data:data_protein,svg:{stroke:'rgba(144, 144, 144, 1)',strokeWidth:3}},
    ];
    const dataFieldArr=[
        {name:'kcal',stroke:'rgba(255, 45, 44, 1)'},
        {data:'fat',stroke:'rgba(255, 204, 0, 1)'},
        {data:'carb',stroke:'rgba(134, 65, 244, 1)'},
        {data:'protein',stroke:'rgba(144, 144, 144, 1)'},
    ];
    /*const graphSetArr=[
        'rgba(255, 45, 44, 0.4)',
        'rgba(255, 204, 0, 0.4)',
        'rgba(134, 65, 244, 0.4)',
        'rgba(204, 204, 204, 0.4)'
    ]*/
    /*const graphSetArr=[
        {fill:'rgba(255, 45, 44, 0.4)',style:{flex: 1}},
        {fill:'rgba(255, 204, 0, 0.4)',style: StyleSheet.absoluteFill},
        {fill:'rgba(134, 65, 244, 0.4)',style: StyleSheet.absoluteFill},
        {fill:'rgba(204, 204, 204, 0.4)',style: StyleSheet.absoluteFill}
    ]*/
    const stackData=()=>{
        let i=0;
        let idx=0;
        let sum_kcal=0;
        let sum_fat=0;
        let sum_carbon=0;
        let sum_protein=0;
        for(i=0;i<25;i++){
            if(idx<oneDayInfo.length&&i==oneDayInfo[idx].time){
                if(typeof myMealsTotal[idx]["칼로리"]!=="undefined")
                    sum_kcal=sum_kcal+myMealsTotal[idx]["칼로리"];
                if(typeof myMealsTotal[idx]["지방"]!=="undefined")
                    sum_fat=sum_fat+myMealsTotal[idx]["지방"];
                if(typeof myMealsTotal[idx]["탄수화물"]!=="undefined")
                    sum_carbon=sum_carbon+myMealsTotal[idx]["탄수화물"];
                if(typeof myMealsTotal[idx]["단백질"]!=="undefined")
                    sum_protein=sum_protein+myMealsTotal[idx]["단백질"];
                idx++;
            }
            data_kcal[i]=(sum_kcal/2000)*100;
            data_fat[i]=(sum_fat/51)*100;
            data_carbon[i]=(sum_carbon/275)*100;
            data_protein[i]=(sum_protein/72)*100;
        }
    }
    if (Object.keys(myMealsTotal).length !== 0) {
        stackData();
    }
    const axesSvg = { fontSize: 10, fill: '#5048e5' };
    const verticalContentInset = { top: 30, bottom: 30 }
    const xAxisHeight = 20;
    const DataRect=(...dataFields)=>{
        return <G x={5} y={5}>
            <Rect
                height={ 30 }
                width={ 55 }
                stroke={ 'grey' }
                fill={ 'white' }
                ry={ 10 }
                rx={ 10 }
            >
            {
                dataFields.map((field,idx)=>{
                    return<View>
                        <Text>
                            {field.name}
                        </Text>
                        <Line
                            x1={ 10 }
                            x2={ 90 }
                            y1={10}
                            y2={10}
                            stroke={field.stroke}
                            strokeWidth={ 2 }
                        />
                    </View>
                })
            }
            </Rect>
        </G>
    }

    return (<View style={styles.GraphBox}>
            <Text style={styles.NutritionData}>{dateString}'s Nutrition Data</Text>
        {
            Object.keys(myMealsTotal).length == 0
                ? <View style={{height: "100%", padding: 20, flexDirection: 'column', justifyContent:'center',alignItems:'center',top: 20,}}>
                    <Text style={{}}>Loading...</Text>
                </View>
                : <View style={{height: "100%", padding: 20, flexDirection: 'row', top: 20,}}>
                        <YAxis
                            data={data_percentage}
                            style={{marginBottom: xAxisHeight}}
                            contentInset={verticalContentInset}
                            svg={axesSvg}
                            formatLabel={(value, index) => `${value}%`}
                        />
                        <View style={{flex: 1, marginLeft: 10}}>
                            <LineChart
                                style={{flex: 1}}
                                data={nutritionDataArr}
                                contentInset={verticalContentInset}
                            >
                                <Grid/>
                                <DataRect dataFields={dataFieldArr}/>
                                <HorizontalLine/>
                            </LineChart>
                            <XAxis
                                style={{marginHorizontal: -10, height: xAxisHeight}}
                                data={data_time}
                                formatLabel={(value, index) => `${2 * value}h`}
                                contentInset={{left: 10, right: 10}}
                                svg={axesSvg}
                            />

                        </View>
                    </View>
        }
        </View>
    );
}
const HorizontalLine = (({ y }) => (
    <Line
        x1={ '0%' }
        x2={ '100%' }
        y1={ '120' }
        y2={ '120' }
        stroke={ 'grey' }
        strokeDasharray={ [ 6, 4 ] }
        strokeWidth={ 3 }
    />
))

const styles=StyleSheet.create({
    /*Screen ELEMENTS*/

    NutritionData: {
        paddingTop: 10,
        paddingLeft:10,
        position: 'absolute',
        width: '100%',
        height: '80%',
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: '#5048e5',
    },
    GraphBox: {
        height: '90%',
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 5,
        //shadow
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9.0,
        elevation: 15,
    },
})
