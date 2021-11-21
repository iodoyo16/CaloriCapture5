// 사진 촬영 후 성분 보여주는 스크린임


import React from "react";
import {SafeAreaView, Text, View} from "react-native";

export default function FoodDetailScreen({route, navigation}){

    // TODO
    return <SafeAreaView>
        <View>
            <Text>
                {JSON.stringify(route.params?.foods)}
            </Text>
        </View>
    </SafeAreaView>

};
