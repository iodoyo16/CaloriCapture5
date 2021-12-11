// 사진 촬영 후 성분 보여주는 스크린임

import React, {useEffect, useState} from "react";
import {
    SafeAreaView,
    Text,
    View,
    Button,
    StyleSheet,
    Modal,
    Pressable,
    Animated,
    FlatList,
    TouchableOpacity,
    TextInput
} from "react-native";

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
        <View style={styles.container}>
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
                    <View style={styles.modalViewContainer}>
                        <View style={styles.modalTitle}>
                            <Text style = {styles.modalTitleText}>{candiList[0]}</Text>
                        </View>

                        <View style={styles.modalLists}>
                            <FlatList
                                keyExtractor={item => item.id}
                                data={candiList}
                                renderItem={({item}) => <TouchableOpacity
                                    style={styles.tableElem}
                                    onPress={() => {
                                        changeFoodItem(candiList[0], item);
                                    }}>
                                    <Text style = {styles.elem}>{'\u2022'}  {item}</Text>

                                </TouchableOpacity>
                                }
                            />
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder = "음식 추가"
                                    autoCapitalize='none'

                                />
                            </View>
                        </View>
                        <View style={styles.modalButton}>
                            <TouchableOpacity
                                style={{ alignItems: "center"}}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    }
                                }
                            >
                                <Text style={styles.elem}>DONE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={{backgroundColor:"tomato", width: "90%", height:"90%", //그냥 배경입니다 이곳에 사진이 옵니다.
                 }}>
                {/* 사진이 올라갈 곳*/}
                <View >
                {
                    foodTagsPos.map((pos)=>
                        <TouchableOpacity
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

                        </TouchableOpacity>
                    )
                }
                </View>
                {/* 해당 끼니를 기록하고, 출력값으로 배열에 음식 리스트 */}
                {/* 혹시 이 힛미 버튼을 매뉴 상단에 " < Back" 버튼 위치에 올려주실수 있나요*/}
                <Button title={"Hit Me!"}
                        style={{position: "absolute", top: 300, left:300 }}
                        onPress={() => navigation.navigate('NextFoodScreen', {
                            foods: selectedFood,
                            otherParam: 'anything you want here',
                        })}
                />

            </View>
        </View>
    </SafeAreaView>

};
//tag 가 있다고 가정하고

const styles = StyleSheet.create({
    container: {
        backgroundColor:"black",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: { //Modal View 가 센터로 뜨게 도와줌
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalViewContainer: {
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
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        flex: 1,
        alignContent: "baseline",
        justifyContent: 'flex-start',
        width: "100%",
        backgroundColor: '#FFF',
    },
    modalTitleText:{
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10,
        color: "#5048e5",
    },
    modalLists:{
        flex: 8,
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: '#fdfdfd',
    },
    elem:{
        fontSize: 20,
        color: "#5048e5",

    },
    modalButton:{
        alignItems: "stretch",
        width: "100%",
    },

    button: {
        marginBottom: 30,

        alignItems: 'center',
        backgroundColor: '#2196F3',
        width: "100%",
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
    inputView: {
        marginLeft: 28,
        backgroundColor: '#D2D0FC',
        borderRadius: 5,
        width: '80%',
        height: 45,
        marginBottom:20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5
    },
    textInput: {
        height: 50,
        flex: 1,
        marginLeft: 20,
        padding: 10,
    },
    tableElem:{
        padding: 5,
        marginTop: 5,
        alignItems: "flex-start",
        backgroundColor: '#ffffff',
        width: "100%",
        borderColor: '#5048e5',
        borderWidth: 1,
        borderRadius: 4,
    },
});
