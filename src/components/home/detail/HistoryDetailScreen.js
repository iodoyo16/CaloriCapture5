import React from 'react';
import {
    Button, StyleSheet,
    Text, TextInput, TouchableOpacity,SafeAreaView,
    View
} from 'react-native';
import fs from "react-native-fs";
import HistoryStorage from "../../../model/HistoryStorage"
function convertDateFormat(date) {
    return date.toLocaleDateString().replace(/\./g, '').split(' ').map((v,i)=> i > 0 && v.length < 2 ? '0' + v : v).join('-');
}
export default function HistoryDetailScreen({route, navigation}){
    const {selectedDate,myHistoryInfo}=route.params;
    console.log(myHistoryInfo);
    const Today=convertDateFormat(new Date());
        return (<SafeAreaView style={styles.Container}>
        <View style = {styles.header}>
            <Text style={styles.TodaysMeal}>
                {
                    selectedDate==Today
                    ? 'Today'
                    : selectedDate
                }'s MEAL</Text>
        </View>
        <View style={styles.body1}>
            <View style={styles.item3}/>
            <View style={styles.item2}/>
            <View style = {styles.item1}/>
        </View>
        <View style={styles.body2}>
            <View style={styles.GraphBox}>
                <Text style={{
                    textAlign: 'center',

                }}>GRAPH</Text>
            </View>
        </View>
        <View style={styles.body3}>
            {
                selectedDate==Today
                    ? <TouchableOpacity style={styles.NextMealRecomendationBtn}>
                        <Text style={styles.NextMealRecomendationTxt}>Next Meal Recomendation</Text>
                    </TouchableOpacity>
                    : null
            }
            <Button title='goback' onPress={() => {
                navigation.goBack(null)
            }}/>
        </View>
    </SafeAreaView>
    )
};

const styles = StyleSheet.create({ //Screen View Components - JUN

    Container: { //container
        flex: 1,
        backgroundColor: '#fff',
    },
    /*Structure: header - body 1, 2 - footer*/
    header: { //TODAY's MEAL
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    body1: { //PREVIOUS MEAL PHOTO
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',

        backgroundColor: '#ffffff',

    },
    body2: { //GRAPH
        flex: 5,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',

        //borderRadius: '5%',
    },
    body3: { //NEXT MEAL RECOMENDATION
        flex: 2,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    /*Screen ELEMENTS*/
    TodaysMeal: {
        width: '100%',
        height: '80%',
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 30,
        fontWeight: '700',
        color: '#5048e5',
    },
    NextMealRecomendationBtn: {
        backgroundColor: '#5048e5',
        borderRadius: 10,
        width: '80%',
        height: '60%',
        marginBottom:20,
        alignItems: "center",
        //shadow
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9.0,
        elevation: 15,
    },
    NextMealRecomendationTxt: {
        //textAlignVertical: 'center',
        paddingTop: '5%',
        textAlign: 'center',
        width: '80%',
        height: '80%',
        fontSize: 20,
        fontWeight: '800',
        color: '#ffffff',
    },
    item1: {
        //flex: 1,
        backgroundColor: '#cccccc',
        height: '90%',
        width: '30%',
        //shadow
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9.0,
        elevation: 15,
    },
    item2: {
        //flex: 1,
        height: '90%',
        width: '30%',
        backgroundColor: '#cccccc',
        //shadow
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9.0,
        elevation: 15,
    },
    item3: {
        //flex: 1,
        height: '90%',
        width: '30%',
        backgroundColor: '#cccccc',
        //shadow
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9.0,
        elevation: 15,
    },
    GraphBox: {
        height: '90%',
        width: '90%',
        backgroundColor: '#cccccc',
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

});
