import React from 'react';
import {
    Button,
    Text,
    View
} from 'react-native';

export default function HistoryDetailScreen({route, navigation}){
    const {selectedDate}=route.params;
    return (
        <View>
            <Text>
                {selectedDate}
            </Text>
        <Button title='goback' onPress={()=>{navigation.goBack(null)}}/>
        </View>
    );
}