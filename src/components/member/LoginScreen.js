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

    const styles = StyleSheet.create({
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
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
                <View>
                    <Text> LOGIN! </Text>
                </View>
                <View>
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
                </View>
            </SafeAreaView>

}
