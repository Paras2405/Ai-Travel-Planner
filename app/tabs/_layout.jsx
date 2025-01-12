import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown:false,
      tabBarActiveTintColor:'#000'
    }}
    >
        <Tabs.Screen name="my-trip" 
        options={{
          tabBarLabel:'My Trip',
  tabBarIcon:(color)=><Ionicons name="location" size={24} color="black" />

        }}/>
        <Tabs.Screen name="discover"
         options={{
          tabBarLabel:'Discover',
  tabBarIcon:(color)=><Ionicons name="globe" size={24} color="black" />

        }}
        />
        <Tabs.Screen name="profile"
         options={{
          tabBarLabel:'Profile',
  tabBarIcon:(color)=><Ionicons name="people-circle" size={24} color="black" />

        }}
        
        />
    </Tabs>
  )
}