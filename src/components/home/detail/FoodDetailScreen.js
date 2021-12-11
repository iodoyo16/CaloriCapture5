// 사진 촬영 후 성분 보여주는 스크린임

import React, {useEffect, useState} from "react";
import {SafeAreaView, Text, View, Button, StyleSheet, Modal, Pressable, Animated, FlatList, TouchableOpacity} from "react-native";
import { Slider } from 'react-native-elements';
import NextFoodScreen from "../NextFoodScreen";



export default function FoodDetailScreen({route, navigation}){
    const [modalVisible, setModalVisible] = useState(false);

    const obj = JSON.stringify(route.params?.foods);
    const temp = JSON.parse(obj);
    const [candiList,setCandiList]=useState([]);

    const foodTagsPos=temp.map((foodTag)=>{
        const x=foodTag.x;
        const y=foodTag.y;
        const w = foodTag.width;
        const h = foodTag.height;
        const foodCandi = foodTag.class_info;
        return {x,y, w, h, foodCandi};
    });
    const [selectedFood,setSelected]=useState(foodTagsPos.map(foodList => foodList.foodCandi[0]["food_name"]));


    function changeFoodItem(preFoodName, newFoodName){

        if(selectedFood.includes( newFoodName) == false) {
            const a = [...selectedFood, newFoodName]; //UseState 쓰면 안됨..
            const b = a.filter((food) => { return food !== preFoodName});
            //USE STATE 가 여기서 안됨
            const idx_old = candiList.findIndex(ans => ans === newFoodName);
            let new_candiList = candiList;
            new_candiList[0] = newFoodName;
            new_candiList[idx_old] = preFoodName;

            setSelected(b);
            setCandiList(new_candiList);
        }

    }
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
                <View style={styles.centeredView }>
                    <View style={styles.modalView}>
                        <View style={{ flex: 2, alignItems: 'stretch', justifyContent: 'flex-start', }}>
                            <Text style = {{    fontSize: 20, fontWeight: "bold"}}>{candiList[0]}</Text>
                        </View>
                        <View style={{ flex: 8, justifyContent: 'flex-start', }}>
                            {}
                            <FlatList
                                keyExtractor={item => item.id}
                                data={candiList}
                                renderItem={({item}) => <TouchableOpacity
                                                        style={[styles.button,
                                                            {
                                                                alignItems: "flex-start",
                                                            }]}
                                                        onPress={() => {
                                                            changeFoodItem(candiList[0], item);
                                                        }}>
                                                                <Text>{item}</Text>
                                                        </TouchableOpacity>
                                }
                            />
                        </View>
                        <View style={{flex: 1, alignItems: "stretch", justifyContent: 'flex-end'}}>
                            <Pressable
                                style={[styles.button, styles.buttonClose,
                                    {
                                        alignItems: "flex-end",
                                    }]}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    }
                                }
                            >
                                <Text style={styles.textStyle}>DONE</Text>
                            </Pressable>
                        </View>
                        <View style={{flex:1,}}/>
                    </View>
                </View>
            </Modal>
            <View style={{backgroundColor:"tomato", width: "90%", height:"90%",}}>

                <View style={{position: "absolute", }}>
                {
                    foodTagsPos.map((pos)=>
                        <Pressable
                            style={[styles.button,]}
                            onPress={() => {
                                setModalVisible(true);
                                const candis=pos.foodCandi;
                                setCandiList(candis.map(candi=>{
                                    return candi.food_name;
                                }));
                            }}
                        >
                            <Text style={{position: "absolute", top: pos.y/2, left:pos.x/2 }}>
                                x: {pos.x} y: {pos.y} NAME: {pos.foodCandi[0]["food_name"]}
                            </Text>
                            <View style={{top: pos.y/2, left:pos.x/2, }}/>
                        </Pressable>
                    )
                }
                </View>
                {/* 해당 끼니를 기록하고, 출력값으로 배열에 음식 리스트 */}
                <Button title={"Hit Me!"} style={[styles.button, ]}
                        onPress={() => navigation.navigate('NextFoodScreen', {
                            foods: selectedFood,
                            otherParam: 'anything you want here',
                        })}/>

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
        alignItems: "flex-start",
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
        elevation: 2,

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
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },

});
