import React from 'react';
import { ScrollView, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ backgroundColor: "#fcbbb8", flex: 1 }} >
            <Image style={{ height: 350, width: 350, alignSelf: "center", marginTop: 110 }} resizeMode='contain' source={require('../assets/logo.png')} />
            {/* <Text>Ayushi gjhhjh</Text> */}
            <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "green", margin: 10 }} onPress={() =>
                navigation.push("LoginScreen")
            }><Text style={{
                textAlign: "center", color: "#fcbbb8", fontSize: 20, padding: 15, fontWeight: "700"
            }}>Login</Text></TouchableOpacity>
            <TouchableOpacity style={{ borderRadius: 10, borderWidth: 2, borderColor: "green", margin: 10, marginTop: 10 }} onPress={() =>
                navigation.navigate("SignUpScreen")
            }><Text style={{ textAlign: "center", color: "green", fontSize: 20, padding: 15, fontWeight: "700" }}>Sign Up</Text></TouchableOpacity>


        </View>
    );
};
export default HomeScreen;
