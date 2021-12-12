const fs =require("react-native-fs");
import API from "../api/API";
import HistoryInfo from "../model/History"
class HistoryStorage{
    static #history={
        "aAMRxEJVuXdUQwPSkxU2ME": {
            "2021-12-07": [
                {"foodList": ["오곡밥"], "amountList": [1.0],"totalKcal":200,"time":10},
                {"foodList": ["닭볶음탕"], "amountList": [1.0],"totalKcal":600,"time":15},
            ],
            "2021-12-08": [
                {"foodList": ["삼계탕","오곡밥"], "amountList": [1.0,1.0],"totalKcal":1000,"time":8},
                {"foodList": ["쌀밥"], "amountList": [1.0],"totalKcal":500,"time":17},
            ],
            "2021-12-09": [
                {"foodList":["쌀밥","시레기국","닭볶음탕","백김치","김치","버섯볶음"], "amountList":[1.0,1.0,0.3,0.2,0.2,0.2],"totalKcal":2000,"time":17}
            ],
        },
    }//key 값은 userid
    static getHistory=(userId)=>{
        let historyList=this.#history[`${userId}`];
        if(historyList==undefined){
            this.#history[`${userId}`] = {};
            historyList=this.#history[`${userId}`];
        }
        return historyList;
    }
    static addTodayHistory=async(userId,foodList,amountList)=>{
        const dateObj=new Date();
        const dateString=HistoryInfo.convertDateFormat(dateObj);
        const nowTime=dateObj.getTime();
        const totalKcal=await HistoryStorage.getMultipleFoodInfo(...foodList);
        const newMeal={
            "aAMRxEJVuXdUQwPSkxU2ME":{
                [dateString]: [{"foodList":{foodList},"amountList":{amountList},"totalKcal":{totalKcal},"time":{nowTime}}],
            }
        }
        this.#history[`${userId}`].push(newMeal);
    }
    static getSingleFoodInfo=async (foodName)=>{
        const response=await API.logic.runFunction("DB_and_reco_API",
            {
                "cmd":"food.db_find_one",
                "query":foodName
            });
        return response
    }
    static getMultipleFoodInfo=async(...foodNames)=>{
        const response= await API.logic.runFunction("DB_and_reco_API",
            {
                "cmd":"food.db_find_many",
                "query":[...foodNames]
        });
        return response;
    }
    static getTotalFoodNutritions=async(...foodNames)=>{
        return API.logic.runFunction("DB_and_reco_API",
            {
                "cmd":"food.foods_nutriiton",
                "query":[...foodNames]
            }).then((response)=>{
                return response;
            }).catch(console.log)
    }
}

module.exports=HistoryStorage;