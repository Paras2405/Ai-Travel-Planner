import { View, Text,FlatList,TouchableOpacity} from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import {SelectBudgetOptions} from '../../constants/Options'
import OptionCard from '../../components/CreateTrip/OptionCard';
import { useState } from 'react';
import { useContext } from 'react';
import { CreateTripContext } from '../../context/CreateTripContext';
import { useRouter } from 'expo-router';

export default function selectBudget() {
     const [selectedBudget,setSelectedBudget]=useState()
     const{tripData,setTripData}=useContext(CreateTripContext)
    const navigation=useNavigation()
    const router=useRouter()
     useEffect(() => {
        navigation.setOptions({
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
        });
      }, []);

      const onBudgetSelection=()=>{
          setTripData({
            ...tripData,
            Budget:selectedBudget
          })
          console.log(tripData)
          router.push('/create-trip/reviewTrip')
      }
  return (
    <View
    style={{
        padding: 20,
        paddingTop: 75,
        backgroundColor: 'white',
        height: '100%',
    }}>
      <Text
      style={{
        fontSize: 30,
    
        fontFamily: 'outfit-Bold',
      }}>Budget</Text>

      <View style={{marginTop:20}}>
        <Text  
         style={{
            fontSize: 20,
            textAlign:'center',
            fontFamily: 'outfit-Bold',
            color:'#7d7d7d'
          }}>Choose Your Budget</Text>
      </View>
       <FlatList data={SelectBudgetOptions}
              renderItem={({item,index})=>(
      
           <TouchableOpacity onPress={()=>setSelectedBudget(item)} style={{marginVertical:10}}>
               <OptionCard option={item} selectedBudget={selectedBudget}/>
           </TouchableOpacity>
      
              )}
              >
                  
              </FlatList>
               <TouchableOpacity
                      onPress={onBudgetSelection}
                      style={{
                        padding: 15,
                        paddingHorizontal: 30,
                        borderRadius: 15,
                        backgroundColor: '#000',
                        marginTop: 35,
                      }}
                    >
                      <Text style={{ textAlign: 'center', color: 'white' }}>Continue</Text>
                    </TouchableOpacity>
    </View>
  )
}