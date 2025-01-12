import { View, Text, TextInput,StyleSheet,TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
//import {useNavigation} from 'expo-router'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../../../components/FireBase';
import {  signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn() {
  const[ email, setEmail] = useState("")
  const [password, setPassword] = useState("")
    //const navigation = useNavigation()
    const router = useRouter()
   /* useEffect(()=>{
      navigation.setOptions({
        headerShown:false
      })
    },[])*/
    const SignInAccount=()=>{
      if(!email && !password){
        ToastAndroid.show("Please enter details",ToastAndroid.BOTTOM)
     return 
      }
      signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    if(user){
      const token=user.stsTokenManager.accessToken
      AsyncStorage.setItem('accessToken', token);
      console.log('Access token saved successfully:', token);
      console.log('User logged in !')
      console.log(user)
    
      ToastAndroid.show("User logged in successfully!",ToastAndroid.BOTTOM)
      router.replace('/tabs/my-trip');
    }

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage,errorCode)
    if(errorCode==='auth/invalid-credential'){
      ToastAndroid.show("User does not exist",ToastAndroid.BOTTOM)
    }
    else if (errorCode==="auth/invalid-email"){
    ToastAndroid.show("Inavlid credentials",ToastAndroid.BOTTOM)
    }
  });
    }
  return (
    <View style={{padding:25,
        backgroundColor:'white',
        paddingTop:50,
        height:'100%'
    }}>
        <TouchableOpacity onPress={()=>router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>       
      <Text style={{
        fontFamily:'outfit-Bold',
        fontSize:30
      }}>Let's Sign You In</Text>
      <Text style={{
        fontFamily:'outfit',
        fontSize:30,
        color:'#7d7d7d',
        marginTop:20
      }}>Welcome Back</Text>
      <Text style={{
        fontFamily:'outfit',
        color:'#7d7d7d',
        fontSize:30,
        marginTop:10
      }}>You have been missed !</Text>
      <View  style={{marginTop:20}}>
        <Text style={{fontFamily:'outfit'}}>Email</Text>
        <TextInput onChangeText={(value)=>setEmail(value)} style={styles.input} placeholder='Enter Email'></TextInput>
      </View>
      <View  style={{marginTop:20}}>
        <Text style={{fontFamily:'outfit'}}>Password</Text>
        <TextInput onChangeText={(value)=>setPassword(value)} secureTextEntry={true} style={styles.input} placeholder='Enter Password'></TextInput>
      </View>
      <TouchableOpacity onPress={SignInAccount} style={{
        padding:20,
        backgroundColor:'#000',
        borderRadius:15,
        marginTop:50
      }}>
        <Text style={{color:'white',textAlign:'center'}}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=>router.replace('auth/sign-up')}
      style={{
        padding:20,
        borderRadius:15,
        borderWidth:1,
        backgroundColor:'white',
        marginTop:20
      }}>
        <Text style={{textAlign:'center'}}>Create Account</Text>
      </TouchableOpacity>
    </View>
    

  )
}
const styles = StyleSheet.create({
  input:{
  padding:15,
  borderWidth:1,
  borderRadius:6,
  borderColor:'#7d7d7d',
  fontFamily:'outfit'
  }
})
