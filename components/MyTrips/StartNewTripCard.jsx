import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function StartNewTripCard() {
    const router=useRouter()
  return (
    <View style={{
        padding:20,
        marginTop:50,
        display:'flex',
        alignItems:'center',
        gap:20
    }}>
    <Ionicons name="location-sharp" size={30} color="black" />
    <Text style={{
        fontSize:25,
        fontFamily:'outfit-Medium'
    }}>No Trips planned yet</Text>


<Text style={{
        fontSize:20,
        fontFamily:'outfit',
        color:'#7d7d7d'
    }}>Looks like its Time to plan a new travel experience! Get Started</Text>


    <TouchableOpacity onPress={()=>router.push('/create-trip/search')} style={{
        backgroundColor:'#000',
        padding:15,
        borderRadius:15,
        paddingHorizontal:30
    }}>
      <Text style={{
        color:'white',
        fontSize:17,
        fontFamily:'outfit'
      }}>Start a new Trip</Text>
    </TouchableOpacity>
    </View>
  )
}