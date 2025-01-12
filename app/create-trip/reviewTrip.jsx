import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import { useNavigation } from 'expo-router';
//import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateTripContext } from '../../context/CreateTripContext';
import { useContext } from 'react';
import moment from 'moment'
import { auth } from '../../components/FireBase';
import { useRouter } from 'expo-router';

export default function reviewTrip() {
    const navigation = useNavigation()
    const router=useRouter()
    const user=auth.currentUser
    const { tripData, setTripData } = useContext(CreateTripContext)
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        });
    }, []);
    return (
        <View style={{
            padding: 25,
            paddingTop: 75,
            backgroundColor: 'white',
            height: '100%'
        }}>


            <Text style={{
                marginBottom:10,
                fontSize:20,
                fontFamily:'outfit'
            }}> Hey  {user?.displayName||'Guest'} !</Text>
            <Text
                style={{
                    fontSize: 30,

                    fontFamily: 'outfit-Bold',
                }}
            >Review Your Trip</Text>

            <Text
                style={{
                    fontSize: 20,
                    textAlign: 'center',
                    fontFamily: 'outfit-Bold',
                    color: '#7d7d7d'
                }}>
                Before generating your trip ,please review your selection
            </Text>


            <View style={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'row',
                padding: 15,
                gap: 30
            }}>
                {/* Destination*/}
                <Text style={{ fontSize: 30 }}>📍</Text>
                <View>
                    <Text style={{ fontFamily: 'outfit', fontSize: 20, color: '#7d7d7d' }}>Destination</Text>
                    <Text style={{ fontFamily: 'outfit-Medium', fontSize: 20, }}>{tripData?.name}</Text>
                </View>


            </View>

            <View style={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'row',
                padding: 15,
                gap: 30
            }}>
                {/* Travel Date*/}
                <Text style={{ fontSize: 30 }}>📆</Text>
                <View>
                    <Text style={{ fontFamily: 'outfit', fontSize: 20, color: '#7d7d7d' }}>Travel Date</Text>
                    <Text style={{ fontFamily: 'outfit-Medium', fontSize: 20, }}>{moment(tripData?.startDate).format('DD MMM')+"To"+moment(tripData?.endDate).format('DD MMM')}({tripData?.totalDays} days)</Text>
                </View>


            </View>

            <View style={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'row',
                padding: 15,
                gap: 30
            }}>
                {/* Who is Travelling*/}
                <Text style={{ fontSize: 30 }}>🚌</Text>
                <View>
                    <Text style={{ fontFamily: 'outfit', fontSize: 20, color: '#7d7d7d' }}>Who is Travelling</Text>
                    <Text style={{ fontFamily: 'outfit-Medium', fontSize: 20, }}>{tripData?.traveller?.title}</Text>
                </View>


            </View>

            <View style={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'row',
                padding: 15,
                gap: 30
            }}>
                {/* Budget*/}
                <Text style={{ fontSize: 30 }}>💰</Text>
                <View>
                    <Text style={{ fontFamily: 'outfit', fontSize: 20, color: '#7d7d7d' }}>Budget</Text>
                    <Text style={{ fontFamily: 'outfit-Medium', fontSize: 20, }}>{tripData?.Budget?.title}</Text>
                </View>


            </View>

                     <TouchableOpacity
                      onPress={()=>router.push('/create-trip/generateTrip')}
                      style={{
                        padding: 15,
                        paddingHorizontal: 30,
                        borderRadius: 15,
                        backgroundColor: '#000',
                        marginTop: 35,
                      }}
                    >
                      <Text style={{ textAlign: 'center', color: 'white' }}>Build My Trip</Text>
                    </TouchableOpacity>
           
        </View>
    )
}