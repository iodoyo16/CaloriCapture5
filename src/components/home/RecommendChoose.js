import React,{useEffect,useState} from "react";
import {SafeAreaView, ScrollView, Text, TouchableOpacity, View,StyleSheet} from "react-native";
import RecommendStorage from "../../model/RecommendStorage"
import User from "../../model/User"
import HistoryInfo from "../../model/History"
import HistoryStorage from "../../model/HistoryStorage"
import {createNativeStackNavigator} from "@react-navigation/native-stack";
function RecommendChooseMain({route,navigation}){
    const mainDishes=RecommendStorage.getMainDish();
    //const toDayInfoList=User.getMyHistory()[`${HistoryInfo.convertDateFormat(new Date())}`];
    const todayInfoList=User.getMyHistory()['2021-12-07'];
    const mealCounts=todayInfoList.length;
    const leftMealCount=3-mealCounts;
    const dailyRecoNut={"칼로리":2000,"지방":51,"탄수화물":275,"단백질":72};
    const [myTodayTotal,setMyTodayTotal]=useState({});
    const [myMainReco,setMyMainReco]=useState([]);
    const calcMyTodayTotal=async()=>{
        let sum_kcal=0,sum_carb=0,sum_fat=0,sum_protein=0;
        const todayTotal={"탄수화물":0,"단백질":0,"지방":0,"칼로리":0};
        let i;
        for(i=0;i<todayInfoList.length;i++){
            const foodList=todayInfoList[i].foodList;
            const mealTotal=await HistoryStorage.getTotalFoodNutritions(...foodList)
            sum_kcal=sum_kcal+mealTotal["칼로리"];
            sum_fat=sum_fat+mealTotal["지방"];
            sum_protein=sum_protein+mealTotal["단백질"];
            sum_carb=sum_carb+mealTotal["탄수화물"];
        }
        //console.log({"탄수화물":sum_kcal,"지방":sum_fat,"단백질":sum_protein,"칼로리":sum_kcal});
        return {"탄수화물":sum_kcal,"지방":sum_fat,"단백질":sum_protein,"칼로리":sum_kcal};
    }
    const getMyMainReco=async(Candies)=>{
        const todayMyTotal=await calcMyTodayTotal();
        const dris={"칼로리":0,"탄수화물":0,"단백질":0,"지방":0};

        dris["칼로리"]=(dailyRecoNut["칼로리"]-todayMyTotal["칼로리"])/leftMealCount;
        dris["탄수화물"]=(dailyRecoNut["탄수화물"]-todayMyTotal["탄수화물"])/leftMealCount;
        dris["지방"]=(dailyRecoNut["지방"]-todayMyTotal["지방"])/leftMealCount;
        dris["단백질"]=(dailyRecoNut["단백질"]-todayMyTotal["단백질"])/leftMealCount;
        RecommendStorage.getRecommendFood(dris,...mainDishes).then((mainReco)=>{
            setMyMainReco(mainReco);
        })
    }
    useEffect(()=>{
        (async ()=>{
            await getMyMainReco();
        })();
    }, []);

    return (<SafeAreaView style={styles.Container}>
        <View style = {styles.header}>
            <Text style={styles.Title}>
                Select Main Dish</Text>
        </View>
        <ScrollView style={styles.RecoListContainer}>
            {
                myMainReco.map((reco)=>{
                    return (
                        <View style={styles.RecoContainer}>
                        <Text style={styles.RecoText}>{reco[1]["식품명"]}</Text>
                    </View>)
                })
            }
        </ScrollView>
        <View style={styles.footer}>
            <TouchableOpacity
                style={styles.SideRecommendationBtn}
                onPress={()=>{navigation.navigate('사이드디쉬')}}
            >
                <Text style={styles.SideRecommendationTxt}>Side Dish Recommend</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>)
}
function RecommendChooseSide({route,navigation}){
    const selectedReco=route?.param;
    const sideDishes=RecommendStorage.getSideDish();
    //const toDayInfoList=User.getMyHistory()[`${HistoryInfo.convertDateFormat(new Date())}`];
    const todayInfoList=User.getMyHistory()['2021-12-07'];
    const mealCounts=todayInfoList.length;
    const leftMealCount=3-mealCounts;
    const dailyRecoNut={"칼로리":2000,"지방":51,"탄수화물":275,"단백질":72};
    const [myTodayTotal,setMyTodayTotal]=useState({});
    const [myMainReco,setMyMainReco]=useState([]);
    const calcMyTodayTotal=async()=>{
        let sum_kcal=0,sum_carb=0,sum_fat=0,sum_protein=0;
        const todayTotal={"탄수화물":0,"단백질":0,"지방":0,"칼로리":0};
        let i;
        for(i=0;i<todayInfoList.length;i++){
            const foodList=todayInfoList[i].foodList;
            const mealTotal=await HistoryStorage.getTotalFoodNutritions(...foodList)
            sum_kcal=sum_kcal+mealTotal["칼로리"];
            sum_fat=sum_fat+mealTotal["지방"];
            sum_protein=sum_protein+mealTotal["단백질"];
            sum_carb=sum_carb+mealTotal["탄수화물"];
        }
        //console.log({"탄수화물":sum_kcal,"지방":sum_fat,"단백질":sum_protein,"칼로리":sum_kcal});
        return {"탄수화물":sum_kcal,"지방":sum_fat,"단백질":sum_protein,"칼로리":sum_kcal};
    }
    const getMyMainReco=async(Candies)=>{
        const todayMyTotal=await calcMyTodayTotal();
        const dris={"칼로리":0,"탄수화물":0,"단백질":0,"지방":0};

        dris["칼로리"]=(dailyRecoNut["칼로리"]-todayMyTotal["칼로리"])/leftMealCount;
        dris["탄수화물"]=(dailyRecoNut["탄수화물"]-todayMyTotal["탄수화물"])/leftMealCount;
        dris["지방"]=(dailyRecoNut["지방"]-todayMyTotal["지방"])/leftMealCount;
        dris["단백질"]=(dailyRecoNut["단백질"]-todayMyTotal["단백질"])/leftMealCount;
        RecommendStorage.getRecommendFood(dris,...mainDishes).then((mainReco)=>{
            setMyMainReco(mainReco);
        })
    }
    useEffect(()=>{
        (async ()=>{
            await getMyMainReco();
        })();
    }, []);

    return (<SafeAreaView style={styles.Container}>
        <View style = {styles.header}>
            <Text style={styles.Title}>
                Select Main Dish</Text>
        </View>
        <ScrollView style={styles.RecoListContainer}>
            {
                myMainReco.map((reco)=>{
                    return (
                        <View style={styles.RecoContainer}>
                            <Text style={styles.RecoText}>{reco[1]["식품명"]}</Text>
                        </View>)
                })
            }
        </ScrollView>
        <View style={styles.footer}>
            <TouchableOpacity
                style={styles.SideRecommendationBtn}
                onPress={()=>{navigation.navigate('사이드디쉬',{mySelect:myMainReco})}}
            >
                <Text style={styles.SideRecommendationTxt}>Side Dish Recommend</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>)
}
export default function RecommendChooseScreen({route,navigation}){
    const Stack = createNativeStackNavigator();
    return(<Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name ='메인디쉬' component={RecommendChooseMain} />
        <Stack.Screen name='사이드디쉬' component={RecommendChooseSide} />
    </Stack.Navigator>);
}
const styles=StyleSheet.create({
    header: {
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        width: "90%",
        height:80,
    },
    Title: {
        width: '100%',
        height: 60,
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 30,
        fontWeight: '700',
        color: '#5048e5',
    },
    Container:{
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems:"center",
        width:"100%",
        height:"100%",
        backgroundColor:"#fff",
    },
    RecoListContainer:{
        width:"90%",
    },
    RecoContainer:{
       width:"90%",
        height:50,
        backgroundColor: '#5048e5',
        flex:1,
        justifyContent:'center',
        margin:15,
        borderRadius:15,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9.0,
        elevation: 15,
    },
    RecoListBox:{
        width:"100%",
        flex:1,
        justifyContent:'space-around',
    },
    RecoText:{
        fontSize: 25,
        color:'white',
        fontWeight: '800',
        fontStyle: 'italic',
        textAlign:'center',
        alignSelf:'center',
    },
    footer:{
        backgroundColor:"#fff",
        height:100,
        width:"100%",
        justifyContent:"space-around",
        alignItems:"center",
        paddingLeft:10,
        paddingTop:10,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9.0,
        elevation: 15,
    },
    SideRecommendationBtn: {
        backgroundColor: '#5048e5',
        borderRadius: 10,
        width: '90%',
        height: '70%',
        marginBottom: 20,
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
    SideRecommendationTxt: {
        //textAlignVertical: 'center',
        paddingTop: '5%',
        textAlign: 'center',
        width: '80%',
        height: '80%',
        fontSize: 20,
        fontWeight: '800',
        color: '#ffffff',
    },
})
