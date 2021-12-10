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
        oneDayInfo.map((oneMeal)=>{
            HistoryStorage.getMultipleFoodInfo(oneMeal.foodList).then((response)=>{
                console.log(response.result);
            })
        })
    }
}

module.exports=HistoryInfo;