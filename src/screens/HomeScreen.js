import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{
        paddingHorizontal: 15,
          paddingVertical: 13,
          backgroundColor: '#E2E8F0', 
          flex:1,
         }}>
      <Image
        style={{
          height: 120,
          width: 360,
          resizeMode:"contain",
          alignSelf: 'center',
          marginTop: 180,
        //   borderRadius: 150,
        }}
        resizeMode="contain"
        source={require('../assets/plannerLogoNew.png')}
      />
      {/* <Text>Ayushi gjhhjh</Text> */}
      <TouchableOpacity
        style={{borderRadius: 23, backgroundColor: '#10B981', marginTop:100 }}
        onPress={() => navigation.push('LoginScreen')}>
        <Text
          style={{
            textAlign: 'center',
            color: '#E2E8F0',
            fontSize: 22,
            padding: 20,
            fontWeight: '600',
          }}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          borderRadius: 23,
          borderWidth: 2,
          borderColor: '#10B981',
        //   margin: 10,
          marginTop: 10,
        }}
        onPress={() => navigation.navigate('SignUpScreen')}>
        <Text
          style={{
            textAlign: 'center',
            color: '#10B981',
            fontSize: 22,
            padding: 20,
            fontWeight: '600',
          }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default HomeScreen;
