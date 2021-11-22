import React from "react";
import {
    Text, TextInput,
    View, StyleSheet, Button
} from 'react-native';
import API from "../../api/API";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";



export default function LoginScreen({route, navigation}) {

    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    const styles = StyleSheet.create({ //Screen View Components - JUN
        container: {

            backgroundColor: 'white',

        },
        LoginPage: {
            position: 'relative',
            alignItems: 'stretch',
           //flex: 1,
            flexDirection: 'column',
            width: 414,
            height: 896,
            backgroundColor: '#ffffff',
        },
        CalorieCapture: {
            //width: '100%',
            //height: '80%',

            alignItems: 'flex-start',
            //fontFamily: 'Roboto, sans-serif',
            fontSize: 48,
            fontWeight: '900',
            fontStyle: 'italic',
            color: '#5048e5',
        },
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
        },

        Group1: {
            position: 'absolute',
            left: 60,
            top: 563,
            width: 300,
            height: 35,
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        Rectangle2: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: 300,
            height: 35,
            backgroundColor: '#d2d0fc',
            borderRadius: 5,
        },
        Password: {
            position: 'absolute',
            left: 9,
            top: 11,
            width: 101,
            height: 20,
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto, sans-serif',
            fontSize: 12,
            lineHeight: 14.0625,
        },
        Group3: {
            position: 'absolute',
            left: 60,
            top: 627,
            width: 300,
            height: 35,
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        Rectangle3: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: 300,
            height: 35,
            backgroundColor: '#5b53ff',
            borderRadius: 5,
        },
        Login: {
            position: 'absolute',
            left: 100,
            top: 7,
            width: 101,
            height: 20,
            color: '#ffffff',
            fontFamily: 'Roboto, sans-serif',
            fontSize: 12,
            fontWeight: '700',
            lineHeight: 14.0625,
            textAlign: 'center',
            textAlignVertical: 'center',
        },
        Group2: {
            position: 'absolute',
            left: 60,
            top: 499,
            width: 300,
            height: 35,
        },
        Rectangle1: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: 300,
            height: 35,
            backgroundColor: '#d2d0fc',
            borderRadius: 5,
        },
        LoginID: {
            position: 'absolute',
            left: 9,
            top: 11,
            width: 101,
            height: 20,
            color: '#000000',
            fontFamily: 'Roboto, sans-serif',
            fontSize: 12,
            lineHeight: 14.0625,
        },
        RegisterNewAccount: {
            position: 'absolute',
            left: 138,
            top: 698,
            width: 138,
            height: 17,
            color: '#b18acf',
            fontFamily: 'Roboto, sans-serif',
            fontSize: 12,
            textDecorationLine: 'underline',
            lineHeight: 14.0625,
            textAlign: 'center',
        },
        ForgotLoginID: {
            position: 'absolute',
            left: 163,
            top: 731,
            width: 88,
            height: 21,
            color: '#b18acf',
            fontFamily: 'Roboto, sans-serif',
            fontSize: 12,
            textDecorationLine: 'underline',
            lineHeight: 14.0625,
            textAlign: 'center',
        },
        ForgotPassword: {
            position: 'absolute',
            left: 155,
            top: 768,
            width: 110,
            height: 20,
            color: '#b18acf',
            fontFamily: 'Roboto, sans-serif',
            fontSize: 12,
            textDecorationLine: 'underline',
            lineHeight: 14.0625,
            textAlign: 'center',
        },

    });

    const loginSuccess = () => {
        // 로그인 완료시 호출하세요. 수정 필요 없음.

    };

    const loginFailed = (error) => {
        // 로그인 실패시 호출하세요.
        alert("로그인 실패! 계정을 확인해주세요." + error.message);
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

    // 아래 View 내부에 로그인 페이지를 구현하세요 TODO
    return <SafeAreaView>
                <View style = {styles.LoginPage}>
                    {/*<Text> LOGIN! </Text>*/}
                    <Text style={styles.CalorieCapture}>
                        Calorie Capture
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value)=>{
                            setEmail(value);
                        }}
                        value={email}
                        placeholder="Email"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(value)=>{
                            setPassword(value);
                        }}
                        value={password}
                        placeholder="Password"
                        keyboardType="default"
                    />
                    <Button
                        title={'로그인!'}
                        onPress={()=>{
                            tryLogin(email, password);
                        }}
                    />
                    <Text style={styles.RegisterNewAccount}>
                        Register New Account
                    </Text>
                    <Text style={styles.ForgotLoginID}>
                        Forgot Login ID?
                    </Text>
                    <Text style={styles.ForgotPassword}>
                        Forgot Password?
                    </Text>

                </View>

        {/*
        <View style={LoginPageStyles.LoginPage}>
            <View style={LoginPageStyles.Group1}>
                <View style={LoginPageStyles.Rectangle2} />
                <Text style={LoginPageStyles.Password}>
                    Password
                </Text>
            </View>
            <View style={LoginPageStyles.Group3}>
                <View style={LoginPageStyles.Rectangle2} />
                <Text style={LoginPageStyles.Login}>
                    Login
                </Text>
            </View>
            <View style={LoginPageStyles.Group2}>
                <View style={LoginPageStyles.Rectangle1} />
                <Text style={LoginPageStyles.LoginID}>
                    Login ID
                </Text>
            </View>
            <Text style={LoginPageStyles.RegisterNewAccount}>
                Register New Account
            </Text>
            <Text style={LoginPageStyles.ForgotLoginID}>
                Forgot Login ID?
            </Text>
            <Text style={LoginPageStyles.ForgotPassword}>
                Forgot Password?
            </Text>
            <Text style={LoginPageStyles.CalorieCapture}>
                Calorie Capture
            </Text>
        </View>

        */}
            </SafeAreaView>

}



