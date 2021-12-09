import API from "../api/API"
class HistoryStorage{
    static #history={};//key 값은 날짜
    static getHistory=async()=>{
        const me=JSON.parse(JSON.stringify(await API.auth.getMe()));
        console.log('me:',me);
        const myId=me.id;
        const myHistory=this.#history[`${myId}`];
        if(myHistory==undefined){
            this.#history[`${myId}`]={};
        }
        return;
    };
    static pushHistory(somebodyHistory){

    }
}

module.exports=HistoryStorage;