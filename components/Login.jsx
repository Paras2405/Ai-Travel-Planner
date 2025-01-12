import { View,Image,Text,StyleSheet,TouchableOpacity} from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function Login() {
    const router=useRouter()
  return (
    <View>
  <Image  style={{height:450,width:'100%'}}source={require('../assets/images/ai.webp')}></Image>
  <View style={styles.container}>
    <Text style={{fontSize:30,fontFamily:'outfit-Bold',textAlign:'center'}}>AI Travel Planner</Text>
    <Text style={{
        fontFamily:'outfit',
        fontSize:17,
        textAlign:'center',
        color:'#7d7d7d',
        marginTop:20
    }}>Discover your next adventure effortlessly.Travel smarter with AI-driven insights</Text>

    <TouchableOpacity style={styles.button}
    onPress={()=>router.push('auth/sign-in')}>
    <Text style={{color:'white',
        fontFamily:'outfit',
        textAlign:'center',
        fontSize:17
    }}>Get started</Text>
    </TouchableOpacity>
  
  </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    marginTop:-20,
    height:'100%',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    padding:25 
  },
  button:{
    padding:15,
    backgroundColor:'#000',
    borderRadius:99,
    marginTop:'25%'

  }
})
