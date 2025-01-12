import { View, Text,TextInput,StyleSheet,TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
//import {useNavigation} from 'expo-router'
//import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { auth } from '../../../components/FireBase'
import { useState } from 'react'
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage'



function SignUp() {
  const [fullname, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router=useRouter()
   /* const navigation = useNavigation()
    useEffect(()=>{
        navigation.setOptions({
            headerShown:false
          })
    },[])*/


    const OnCreateAccount = async () => {
      if (!fullname || !email || !password) {
        ToastAndroid.show('Please enter all details', ToastAndroid.BOTTOM);
        return;
      }
    
      // Email validation using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        ToastAndroid.show('Invalid email format', ToastAndroid.BOTTOM);
        return;
      }
    
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    
        // Save token
        const token = user.stsTokenManager.accessToken;
        await AsyncStorage.setItem('accessToken', token);
        console.log('Access token saved successfully:', token);
    
        // Update the user's display name
        await updateProfile(user, {
          displayName: fullname,
        });
    
        // Confirm display name
        const updatedUser = auth.currentUser;
        console.log('User displayName set successfully:', updatedUser.displayName);
    
        ToastAndroid.show('Account Created Successfully', ToastAndroid.BOTTOM);
        router.replace('auth/sign-in');
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
    
        if (errorCode === 'auth/email-already-in-use') {
          ToastAndroid.show('User already exists', ToastAndroid.BOTTOM);
        } else if (errorCode === 'auth/invalid-email') {
          ToastAndroid.show('Invalid email', ToastAndroid.BOTTOM);
        } else if (errorCode === 'auth/weak-password') {
          ToastAndroid.show('Password should be at least 6 characters', ToastAndroid.BOTTOM);
        } else {
          ToastAndroid.show('An error occurred', ToastAndroid.BOTTOM);
        }
      }
    };
    
  
  return (
    <View style={{
        padding:25,
        paddingTop:50,
        backgroundColor:'white',
        height:'100%'
    }}>
      <Text style={{
        fontFamily:'outfit-Bold',
        fontSize:30
      }}>Create New Account</Text>
       <View  style={{marginTop:20}}>
         <Text style={{fontFamily:'outfit'}}>Full Name</Text>
         <TextInput onChangeText={(value)=>setFullName(value)} style={styles.input} placeholder='Enter Full Name'></TextInput>
       </View>
   <View  style={{marginTop:20}}>
         <Text style={{fontFamily:'outfit'}}>Email</Text>
         <TextInput  onChangeText={(value)=>setEmail(value)} style={styles.input} placeholder='Enter Email'></TextInput>
       </View>
       <View  style={{marginTop:20}}>
         <Text style={{fontFamily:'outfit'}}>Password</Text>
         <TextInput onChangeText={(value)=>setPassword(value)} secureTextEntry={true} style={styles.input} placeholder='Enter Password'></TextInput>
       </View>
        <TouchableOpacity onPress={OnCreateAccount} style={{
            padding:20,
            backgroundColor:'#000',
            borderRadius:15,
            marginTop:50
          }}>
            <Text style={{color:'white',textAlign:'center'}}>Create Account</Text>
          </TouchableOpacity >
          <TouchableOpacity 
          onPress={()=>router.replace('auth/sign-in')}
          style={{
            padding:20,
            borderRadius:15,
            borderWidth:1,
            backgroundColor:'white',
            marginTop:20
          }}>
            <Text style={{textAlign:'center'}}>Sign In</Text>
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
  export default SignUp
  