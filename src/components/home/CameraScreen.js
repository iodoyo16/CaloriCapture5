import React from "react";
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import API from "../../api/API";
import Config from "../../api/Config";
import ScreenNames from "../ScreenNames";
//HERE
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FoodDetailScreen from "./detail/FoodDetailScreen";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});


function CameraScreenHome({route, navigation}) {

    const getFoodInfos = async (base64) => {
        const response = await API.logic.runFunction('food_detection', {
            cmd: 'food.detection.get_food_info',
            image_base64: base64
        });
        return response?.results?.food;
    };

    const takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            const base64 = data.base64;
            const foods = await getFoodInfos(base64);
            console.log(foods);
            navigation.navigate('FoodDetailScreen', {
                foods: foods,
                otherParam: 'anything you want here',
            });

        }
    };

    return <View style={styles.container}>
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                captureAudio={false}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                onGoogleVisionBarcodesDetected={({ barcodes }) => {
                    console.log(barcodes);
                }}
            />
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={takePicture.bind(this)} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> 촬영! </Text>
                </TouchableOpacity>
            </View>
        </View>

}



export default function CameraScreen({route, navigation}) {

    const Stack = createNativeStackNavigator();

    return <Stack.Navigator>
        <Stack.Screen name={'CameraScreenHome'} component={CameraScreenHome}/>
        <Stack.Screen name={'FoodDetailScreen'} component={FoodDetailScreen}/>
    </Stack.Navigator>

}
