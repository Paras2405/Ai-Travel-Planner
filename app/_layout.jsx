import { Stack } from "expo-router";
import {useFonts} from "expo-font"
import {CreateTripContext} from '../context/CreateTripContext'
import { useState } from "react";
export default function RootLayout() {

useFonts({
  'outfit':require('../assets/fonts/Outfit-Regular.ttf'),
  'outfit-Medium':require('../assets/fonts/Outfit-Medium.ttf'),
  'outfit-Bold':require('../assets/fonts/Outfit-Bold.ttf')
})

const[tripData,setTripData]=useState([])
  return (


<CreateTripContext.Provider value={{tripData,setTripData}}>
<Stack   screenOptions={{headerShown:false}} >
  {/*<Stack.Screen name="index" />*/}
    <Stack.Screen name="tabs"/>
    <Stack.Screen name="search"/>
  </Stack>


</CreateTripContext.Provider>
  
  ) 
  ;
}
