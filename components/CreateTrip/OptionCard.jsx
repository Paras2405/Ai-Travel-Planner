import { View, Text } from 'react-native'
import React from 'react'


export default function OptionCard({option,selectedTraveller,selectedBudget}) {
  return (
    <View style={[{
        padding:25,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#ddd',
        borderRadius:15,
    },selectedTraveller?.id==option?.id &&{borderWidth:3},selectedBudget?.id==option?.id &&{borderWidth:3}]}>

        <View>
        <Text style={{
            fontSize:20,
            fontFamily:'outfit-Bold'
        }}>{option?.title}</Text>
        <Text style={{
            fontSize:17,
            fontFamily:'outfit-Bold',
            color:'#7d7d7d'
        }}>{option?.desc}</Text>
        </View>
     <Text style={{
        fontSize:40
     }}>{option?.icon}</Text>
    </View>
  )
}