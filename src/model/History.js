import HistoryStorage from './HistoryStorage'


class HistoryInfo{
    constructor(userId){
        this.userId=userId;
        this.historyList=HistoryStorage.getHistory(this.userId);
    }
    addHistory(oneMeal){
        const now=new Date();
        HistoryStorage.addHistory(this.userId,oneMeal);
    }
    getMultipleFoodInfo=async(oneDayInfo)=>{
        const response =await Promise.all(oneDayInfo.map((oneMeal)=>{
            return HistoryStorage.getMultipleFoodInfo(oneMeal.foodList);
        }));
        return response;
    }
}

module.exports=HistoryInfo;