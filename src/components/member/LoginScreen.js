import React from "react";
import {
    Text, TextInput,
    View, StyleSheet, Button, TouchableOpacity,
} from 'react-native';
import API from "../../api/API";
import RegisterScreen from "./RegisterScreen";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import ScreenNames from "../ScreenNames";

const RegisterScreenName=ScreenNames.RegisterScreenName;
export default function LoginScreen({route, navigation}) {

    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    const loginSuccess = () => {
        // 로그인 완료시 호출하세요. 수정 필요 없음.

    };
    const registerPage = () => {
        // 회원가입 화면으로 전환

    };
    const loginFailed = (error) => {
        // 로그인 실패시 호출하세요.
        alert("로그인 실패! 계정을 확인해주세요.\n" + error.message);
    };
    const tryLogin = (email, password) => {
        API.auth.login(email, password).then(response=>{
            if (response.error){
                loginFailed(response.error);
            }else{
                loginSuccess();
            }
        });
    };

    // 아래 View 내부에 로그인 페이지를 구현하세요 TODO //DONE BY JUN
    return <SafeAreaView style = {styles.LoginPage}>
        <View style={styles.header}/>
        <View style={styles.body1}>
            <Text style={styles.CalorieCapture}>
                Calorie Capture
            </Text>
        </View>
        <View style={styles.body2}>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder = "ID"
                    onChangeText={(value)=>{
                        setEmail(value);
                    }}
                    autoCapitalize='none'
                    value={email}
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(value)=>{
                        setPassword(value);
                    }}
                    value={password}
                    secureTextEntry={true}
                    autoCapitalize='none'
                    placeholder="Password"
                    keyboardType="default"
                />
            </View>
            <View style ={styles.loginBtnView}>
                <Button
                    title={'로그인'}
                    color={'#FFF'}
                    onPress={()=>{
                        tryLogin(email, password);
                    }}
                    style = {styles.loginBtnView}
                />
            </View>
        </View>
        <View style={styles.footer}>
            <TouchableOpacity
                onPress={()=>{navigation.navigate(RegisterScreenName)}}
            >
                {/*여기서 링크 누르면 Register Page로 이동 */}
                <Text style={styles.additionalOptionText}>
                    Register New Account
                </Text>
            </TouchableOpacity>
            <Text style={styles.additionalOptionText}>
                Forgot Login ID?
            </Text>
            <Text style={styles.additionalOptionText}>
                Forgot Password?
            </Text>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({ //Screen View Components - JUN

    LoginPage: { //container
        flex: 1,
        backgroundColor: '#fff',
    },
    /*Structure: header - body 1, 2 - footer*/
    header: {
        flex: 2,
        backgroundColor: '#fff',
    },
    body1: {
        flex: 2,
        backgroundColor:'#fff',
    },
    body2: {
        flex:2,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    footer: {
        flex:2,
        backgroundColor: '#fff',
        justifyContent: 'center',

    },
    /*Screen ELEMENTS*/
    CalorieCapture: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        textAlign: 'center',
        //fontFamily: 'Roboto, sans-serif',
        fontSize: 45,
        fontWeight: '900',
        fontStyle: 'italic',
        color: '#5048e5',
    },
    textInput: {
        height: 50,
        flex: 1,
        marginLeft: 20,
        padding: 10,
    },
    inputView: {
        backgroundColor: '#D2D0FC',
        borderRadius: 10,
        width: '80%',
        height: 45,
        marginBottom:20,
        alignItems: "center",
        //shadow
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9.0,
        elevation: 15,
    },

    loginBtnView: {
        backgroundColor: '#5048e5',
        borderRadius: 10,
        width: '80%',
        height: 45,
        marginBottom:20,
        alignItems: "center",
        //shadow
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9.0,
        elevation: 15,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 15,
        height: 50,
        alignItems : 'center',
        marginTop : 30,
        justifyContent : 'center',

    },
    additionalOptionText: {
        paddingTop: 1,
        height: 20,
        color: '#b18acf',
        marginBottom: 10,
        fontSize: 12,
        textDecorationLine: 'underline',
        lineHeight: 14.0625,
        textAlign: 'center',
    },

});



