import { Text, View } from "react-native";
import Login from '../components/Login';
import { auth } from '../components/FireBase';
//import { useRouter } from 'expo-router';
//import MyTrip from '../app/tabs/my-trip'
import { Redirect } from "expo-router";
export default function Index() {
  const user = auth.currentUser;
  //const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
       {user ? <Redirect href="/tabs/my-trip" /> : <Login />}
    </View>
  );
}
