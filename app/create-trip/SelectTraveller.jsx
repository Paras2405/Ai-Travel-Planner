import { View, Text,FlatList,TouchableOpacity } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useNavigation } from 'expo-router'
import {SelectTravelesList} from '../../constants/Options'
import OptionCard from '../../components/CreateTrip/OptionCard'
import { CreateTripContext } from '../../context/CreateTripContext'
import { useContext } from 'react'
import { useRouter } from 'expo-router'


export default function SelectTraveller() {
    const {tripData,setTripData}=useContext(CreateTripContext)
    const router =useRouter()
 const navigation=useNavigation()
 const [selectedTraveller,setSelectedTraveller]=useState()
 useEffect(()=>{
navigation.setOptions({
    headerShown: true,
    headerTransparent: true,
    headerTitle: '',
})
 },[])

 useEffect(()=>{
     setTripData({

        ...tripData,
        traveller:selectedTraveller
     })
 },[selectedTraveller])



console.log(tripData)
  return (
    <View style={{
        padding:25,
        paddingTop:75,
        backgroundColor:'white',
        height:'100%'
    }}>
      <Text style={{
        fontSize:35,
        fontFamily:'outfit-Bold',
        marginTop:'20'
      }}>Who's Travelling</Text>
 <View style={{
    marginTop:20
 }}>


    <Text style={{  fontSize:23,
        fontFamily:'outfit-Bold',}}>Choose your travels</Text>

        <FlatList data={SelectTravelesList}
        renderItem={({item,index})=>(

     <TouchableOpacity onPress={()=>setSelectedTraveller(item)} style={{marginVertical:10}}>
         <OptionCard option={item} selectedTraveller={selectedTraveller}/>
     </TouchableOpacity>

        )}
        >
            
        </FlatList>
 </View>
<TouchableOpacity onPress={()=>router.push('create-trip/SelectDates')} style={{
    padding:15,
    paddingHorizontal:30,
    borderRadius:15,
    backgroundColor:'#000',
    marginTop:20
}}>
    <Text style={{textAlign:'center',color:'white'}}>Continue</Text>
</TouchableOpacity>

    </View>
  )
}