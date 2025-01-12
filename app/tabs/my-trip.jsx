import { View, Text,TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { auth } from '../../components/FireBase';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyTrip() {
  const user =auth.currentUser
  const router=useRouter()
  const [userTrips, setUserTrips] = useState([])


  const logout=async()=>{
    const token = user.stsTokenManager.accessToken;
   await  AsyncStorage.removeItem('accessToken')
   await auth.signOut();
   router.replace('auth/sign-in')
   console.log(token)
    ToastAndroid.show("User Logged out successfully!",ToastAndroid.BOTTOM)
    
  }
  return (
    <View style={{
      padding:25,
      paddingTop:55,
      backgroundColor:'white',
      height:'100%',
      
    }}>
      <View style={{display:'flex',flexDirection:'row',padding:10,gap:10}}>

        <TouchableOpacity onPress={logout}>
        <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
     
      <Text style={{fontFamily:'outfit',fontSize:20}}>Welcome {user?.displayName || 'Guest'}</Text>
      </View>
     
      
      <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:20

      }}>

      <Text style={{
        fontFamily:'outfit-Bold',
        fontSize:35
      }}>MyTrips</Text>
      <Ionicons  name="add-circle" size={50} color="black" />
        
      </View>
      {
    userTrips?.length===0?
    (<StartNewTripCard/>):(null)


      }
    </View>
  )
}