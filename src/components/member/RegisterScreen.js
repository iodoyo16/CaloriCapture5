import React,{useState} from "react";
import {
    Text, TextField,
    View, StyleSheet, Button, TouchableOpacity, TextInput,
} from 'react-native';
import API from "../../api/API";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";

const neededInfo=[{name:"ID"},{name:"password"},{name:"passwordCheck"},{name:"extras"}]
function RegisterScreen({route,navigation}){
    const [email,setEmail]=useState('');
    const [userInfo,setUserInfo]=useState({ID:'',password:'',extras:''});
    const handleInfoChange=(name,text)=>{
        setUserInfo({...userInfo,[name]:text});
    }
    const registerSuccess=()=>{
        navigation.goBack(null);
    };
    const registerFail=(error)=>{
        alert("register failed\n"+error.message);
    };
    const tryRegister=(ID,password,extras)=>{
        const email=ID;
        API.auth.register(email,password,extras).then((response)=>{
            if(response.error){
                registerFail(response.error);
            }
            else{
                registerSuccess();
            }
        })
    };
    return (
        <SafeAreaView style={styles.RegisterPage}>
            <View style={styles.Header}>
                <Text style={styles.Title}>Calorie Capture</Text>
            </View>
            <View style={styles.RegisterForm}>
                {neededInfo.map((item)=>{
                    return (
                        <TextInput style={styles.Formelem}
                            placeholder={item.name}
                            value={userInfo[item.name]}
                            onChangeText={text=>handleInfoChange(name,text)}
                            autoCapitalize='none'/>
                        )
                    })
                }
            </View>
            <View style={styles.SubmitButton}>
                <Button
                    title={'Submit'}
                    color={'#fff'}
                    onPress={()=>{
                        console.log(userInfo);
                        tryRegister(userInfo.ID,userInfo.password,userInfo.extras);
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles=StyleSheet.create({
    RegisterPage:{
        flex:1,
        alignItems:'center',
        backgroundColor: '#fff',
    },
    Header:{
        flex:1,
        flexDirection:"row",
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#fff',
    },
    Title:{
        width:'100%',
        height:'50%',
        textAlign:'center',
        fontSize:45,
        fontWeight:'900',
        backgroundColor:'#fff',
        fontStyle:'italic',
        color:'#5048e5',
    },
    RegisterForm:{
        flex:4,
        width:'90%',
        flexDirection:'column',
        backgroundColor: '#5048e5',
        margin: 15,
        padding: 15,
        borderRadius: 15,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9.0,
        elevation: 15,
    },
    Formelem:{
        fontSize: 20,
        margin:10,
        padding:10,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9.0,
        elevation: 15,
    },
    SubmitButton:{
        margin: 10,
        width:'70%',
        borderRadius:15,
        backgroundColor: '#5048e5',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.35,
        shadowRadius: 9.0,
    }
})

export default RegisterScreen;