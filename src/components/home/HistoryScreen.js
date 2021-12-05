import React from "react";
import {
    Button,
    Text,
    View
} from 'react-native';
import API from "../../api/API";
import {NavigationContainer} from "@react-navigation/native";
import ScreenName from '../ScreenNames';
import HistoryDetailScreen from './detail/HistoryDetailScreen';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
const HistoryDetailScreenName =ScreenName.HistoryDetailScreenName;

const cur_Month=new Date(0).getMonth();

function HistoryScreenHome({route, navigation}){


    const [loggedIn, setLoggedIn] = React.useState(null);

    const logout = () => {
        API.auth.logout().then((response)=>{
            setLoggedIn(false);
        });
    }

    React.useEffect(()=>{

    }, [loggedIn]);

    //TODO
    return (<View>
        <Text>History! count </Text>
        <Button title={'로그아웃 (테스트용)'}
                onPress={()=>{
                    logout();
                }}
        />
        <Button title={'historyDetail'}
                onPress={
                    ()=>{
                        navigation.navigate(HistoryDetailScreenName,{selectedDate:Date(0)})
                    }
                }
        />
    </View>);
}

export default function HistoryScreen({route, navigation}) {
    const Stack = createNativeStackNavigator();
    return(<Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name ='HistoryScreenHome' component={HistoryScreenHome} />
            <Stack.Screen name={HistoryDetailScreenName} component={HistoryDetailScreen} />
        </Stack.Navigator>);
}
