// 사진 촬영 후 성분 보여주는 스크린임

import React, { useState } from "react";
import {SafeAreaView, Text, View, Button, StyleSheet, Modal, Pressable, Animated, } from "react-native";
import { Slider } from 'react-native-elements';
import NextFoodScreen from "../NextFoodScreen";



export default function FoodDetailScreen({route, navigation}){
    const [modalVisible, setModalVisible] = useState(false);
    // TODO
    return <SafeAreaView>
        <View style={{backgroundColor:"pink", height: "100%", justifyContent: 'center',
            alignItems: 'center',}}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                            <Text style={styles.modalText}>Hellodsadsadsadsadas World!</Text>
                            {/* */}
                            <Slider
                            />

                            {}
                        </View>
                        <View>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                        <View style={{flex:1,}}/>


                    </View>
                </View>
            </Modal>
            <View style={{backgroundColor:"tomato", width: "80%", height:"80%", justifyContent: 'center',
                alignItems: 'center',}}>
            <Text>
                {JSON.stringify(route.params?.foods)}
            </Text>
                <Button title={"Hit Me!"} style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}/>
                <Button title={"GOTO"} style={[styles.button, styles.buttonOpen]}
                        />
            </View>
        </View>
    </SafeAreaView>

};
//tag 가 있다고 가정하고

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        height: "80%",
        width: "90%",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }


});
