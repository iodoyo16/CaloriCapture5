import React from "react";
import {
    Button,
    Text,
    View
} from 'react-native';
import API from "../../api/API";


export default function HistoryScreen({route, naviation}) {

    const [loggedIn, setLoggedIn] = React.useState(null);

    const logout = () => {
        API.auth.logout().then((response)=>{
            setLoggedIn(false);
        });
    }

    React.useEffect(()=>{

    }, [loggedIn]);

    //TODO
    return <View>
        <Text>History! count </Text>
        <Button title={'로그아웃 (테스트용)'}
            onPress={()=>{
                logout();
            }}
        />
    </View>

}
