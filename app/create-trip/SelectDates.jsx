import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { useNavigation } from 'expo-router';
import moment from 'moment';
import { useContext } from 'react';
import {CreateTripContext} from '../../context/CreateTripContext'
import { useRouter } from 'expo-router';

export default function SelectDates() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const {tripData,setTripData}=useContext(CreateTripContext)
  const navigation = useNavigation();
  const router=useRouter()
  const onDateChange = (date, type) => {
    console.log(date,type)
    if (type === 'START_DATE') {
      setStartDate(moment(date));
    } else if (type === 'END_DATE') {
      setEndDate(moment(date));
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  const onDateSelectionContinue = () => {
    if (!startDate || !endDate) {
      ToastAndroid.show(
        "Please select both a start date and an end date.",
        ToastAndroid.BOTTOM
      );
      return;
    }

    const totalDays = endDate.diff(startDate, 'days') + 1;
    console.log(`Total days: ${totalDays}`);
    setTripData({
      ...tripData,
       startDate:startDate,
       endDate:endDate,
       totalDays:totalDays
    })
    router.push('/create-trip/selectBudget')
    console.log(tripData)
  };

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 75,
        backgroundColor: 'white',
        height: '100%',
      }}
    >
      <Text
        style={{
          fontSize: 30,
          marginBottom: 20,
          fontFamily: 'outfit-Bold',
        }}
      >
        Travel Date
      </Text>
      <View>
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          selectedDayTextColor="white"
          selectedDayColor="#000"
        />
      </View>

      <TouchableOpacity
        onPress={onDateSelectionContinue}
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
  );
}
