import { View, Text, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from 'expo-router';
import axios from 'axios';
import { CreateTripContext } from '../../context/CreateTripContext';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Search() {
  const [query, setQuery] = useState(''); // User's search query
  const [results, setResults] = useState([]); // Search results
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();
  const API_KEY = 'AlzaSysaebXKNf3hT6YelAIMXuPL3clGLplrTqS'; // Replace with your actual API key

  const handleSearch = async () => {
    const url = `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${encodeURIComponent(
      query
    )}&key=${API_KEY}`;

    try {
      const response = await axios.get(url);

      if (response.data && response.data.predictions) {
        const predictions = response.data.predictions;
        setResults(predictions); // Update results with predictions
        console.log('Predictions:', predictions);
      } else {
        Alert.alert('No Results', 'No places found for the given query.');
        setResults([]); // Clear previous results if no places found
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      Alert.alert('Error', 'Could not fetch search results. Please try again.');
    }
  };

  const fetchPlaceDetails = async (placeId, description) => {
    const url = `https://maps.gomaps.pro/maps/api/place/details/json?place_id=${placeId}&key=${API_KEY}`;

    try {
      const response = await axios.get(url);

      if (response.data && response.data.result) {
        const details = response.data.result;
        console.log('Place Details:', {
          location: details.geometry?.location,
          photo_reference: details.photos?.[0]?.photo_reference,
          url: details.url,
        });

        // Update context with place details and name
        setTripData({
          ...tripData,
          name: description, // Set the selected place name
          location: details.geometry?.location,
          photo_reference: details.photos?.[0]?.photo_reference,
          url: details.url,
        });

        router.push('/create-trip/SelectTraveller'); // Navigate to the next page
      } else {
        Alert.alert('Error', 'Could not fetch place details.');
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
      Alert.alert('Error', 'Could not fetch place details. Please try again.');
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search',
    });
  }, []);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: 'white',
        height: '100%',
      }}
    >
      <TouchableOpacity onPress={() => router.push('/create-trip/SelectTraveller')}>
        <Ionicons name="arrow-forward" size={24} color="black" />
      </TouchableOpacity>

      <TextInput
        style={{
          height: 50,
          borderColor: 'gray',
          borderWidth: 1,
          paddingHorizontal: 10,
          marginBottom: 20,
        }}
        placeholder="Search for a place"
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#000',
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
        }}
        onPress={handleSearch}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Search</Text>
      </TouchableOpacity>

      <FlatList
        data={results}
        keyExtractor={(item) => item.place_id} // Use place_id as unique key
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#ddd',
            }}
            onPress={() => fetchPlaceDetails(item.place_id, item.description)} // Pass description and placeId
          >
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
