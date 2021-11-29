/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// In App.js in a new project
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NextFoodScreen from "./src/components/home/NextFoodScreen";
import CameraScreen from "./src/components/home/CameraScreen";
import HistoryScreen from "./src/components/home/HistoryScreen";
import API from "./src/api/API";
import LoginScreen from "./src/components/member/LoginScreen";
import ScreenNames from "./src/components/ScreenNames";
import FoodDetailScreen from "./src/components/home/detail/FoodDetailScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//EDIT

function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {

    const [mainScreen, setMainScreen] = React.useState(null);

    const NextFoodScreenName = ScreenNames.NextFoodScreenName;
    const CameraScreenName = ScreenNames.CameraScreenName;
    const HistoryScreenName = ScreenNames.HistoryScreenName;

    const isLoggedIn = async () => {
        return await API.auth.isLogin();
    };

    const routeScreen = async () => {
        let loggedIn = await isLoggedIn();
        if (loggedIn){
            const screen = <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;
                            if (route.name === NextFoodScreenName) {
                                iconName = focused
                                    ? 'ios-home'
                                    : 'ios-home-outline';
                            }
                            if (route.name === CameraScreenName) {
                                iconName = focused
                                    ? 'ios-camera'
                                    : 'ios-camera-outline';
                            }
                            if (route.name === HistoryScreenName) {
                                iconName = focused
                                    ? 'ios-calendar'
                                    : 'ios-calendar-outline';
                            }

                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: '#5048e5',
                        tabBarInactiveTintColor: 'gray',
                    })}
                >
                    <Tab.Screen name={NextFoodScreenName} component={NextFoodScreen} />
                    <Tab.Screen name={CameraScreenName} component={CameraScreen} />
                    <Tab.Screen name={HistoryScreenName} component={HistoryScreen} />

                </Tab.Navigator>

            </NavigationContainer>;
            setMainScreen(screen);
        }else{
            const screen = <LoginScreen/>;
            setMainScreen(screen);
        }
    };

    React.useEffect(()=>{
        // 추가 주석띠
        (async ()=>{
            await routeScreen();
        })();
    }, [mainScreen]);

    return mainScreen;
}
