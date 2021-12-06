import React from "react";
import {
    Button, Text, View,
    StyleSheet,
} from 'react-native';
import API from "../../api/API";
import {Calendar ,Agenda, CalendarList} from "react-native-calendars"
import {NavigationContainer} from "@react-navigation/native";
import ScreenName from '../ScreenNames';
import HistoryDetailScreen from './detail/HistoryDetailScreen';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {selectedDayBackgroundColor} from "react-native-calendars/src/style";

const HistoryDetailScreenName =ScreenName.HistoryDetailScreenName;

const cur_date=Date();

function HistoryScreenHome({route, navigation}){


    const [loggedIn, setLoggedIn] = React.useState(null);
    const [markedDate,setMarkedDate]=React.useState({});
    const logout = () => {
        API.auth.logout().then((response)=>{
            setLoggedIn(false);
        });
    }
    const custom_theme=
    React.useEffect(()=>{

    }, [loggedIn]);
    //TODO
    return (<View style={styles.HistoryContainer}>
            <View style={styles.Header}>
            <Text style={styles.Title}>
                History
            </Text>
            </View>
        <View style={styles.CalendarContainer}>
            <CalendarList
                style={styles.CurMonth}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                minDate={'2021-01-01'}
                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                maxDate={cur_date}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={(day) => {
                    console.log(day);
                    navigation.navigate(HistoryDetailScreenName,{selectedDate:day.dateString})
                }}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'yyyy MM'}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                firstDay={1}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={substractMonth => substractMonth()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}
                // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                disableAllTouchEventsForDisabledDays={true}
                enableSwipeMonths={true}
                // Callback which gets executed when visible months change in scroll view. Default = undefined
                onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={12}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={0}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={true}
            />
        </View>
        <View style={styles.Footer}>
            <View style={styles.LogoutButton}>
                <Button title={'로그아웃 (테스트용)'}
                        color='#fff'
                        onPress={()=>{
                            logout();
                        }}

                />
            </View>
        </View>
    </View>
    );
}

export default function HistoryScreen({route, navigation}) {
    const Stack = createNativeStackNavigator();
    return(<Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name ='HistoryScreenHome' component={HistoryScreenHome} />
            <Stack.Screen name={HistoryDetailScreenName} component={HistoryDetailScreen} />
        </Stack.Navigator>);
}

const styles=StyleSheet.create({
    Header:{
        flex:0.5,
        width: '100%',
        padding: 15,
    },
    Title:{
        fontSize: 45,
        fontWeight: '900',
        fontStyle: 'italic',
        color: '#5048e5',
    },
   CurMonth:{
       width:'100%',
   },
   CalendarContainer:{
       flex:3,
       paddingBottom:0,
       shadowOffset: {
           width: 0,
           height: 7,
       },
       shadowOpacity: 0.25,
       shadowRadius: 9.0,
       elevation: 15,
   },
   Footer:{
       flex:1,
       justifyContent:"center",
   },
    LogoutButton:{
        backgroundColor: '#5048e5',
        borderRadius: 10,
        width: '60%',
        alignSelf:"center",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9.0,
        elevation: 15,
    },
   HistoryContainer:{
       flex:1,
     flexDirection:"column",
     justifyContent:"space-around",
       backgroundColor:'white',
   }
});