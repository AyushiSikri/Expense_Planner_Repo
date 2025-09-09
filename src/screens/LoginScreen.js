import React, { useContext, useState } from 'react';
import { ScrollView, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { TextInput, } from 'react-native-paper';
import { AuthContext } from '../navigation/AuthProvider';


const LoginScreen = ({ navigation }) => {
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return (
        <ScrollView style={{ flex: 1 }} >
            <View style={{}}>
                <Image style={{ height: 150, width: 150, alignSelf: "center", marginTop: 40, borderRadius: 75, borderWidth: 2, borderColor: "green" }} resizeMode="contain" source={require('../assets/logo.png')} />
            </View>
            <View style={{ marginHorizontal: "5%", marginTop: "10%", }}>
                <Text style={{ textAlign: "center", fontSize: 50, color: 'black', marginBottom: "5%" }}>Login</Text>
                <TextInput
                    label="Username"
                    theme={{
                        colors: {
                            placeholder: "green"
                        },
                        roundness: 10
                    }}
                    left={<TextInput.Icon name={require('../assets/email.png')} />}
                    mode="outlined"
                    onChangeText={(text) => setEmail(text)}
                    outlineColor='green'
                    activeOutlineColor='green'
                    style={{ marginBottom: "3%" }}
                    autoCorrect={false}
                />
                <TextInput
                    label="Password"
                    theme={{
                        colors: {
                            placeholder: "green"
                        },
                        roundness: 10
                    }}
                    left={<TextInput.Icon name={require('../assets/key.png')} />}
                    onChangeText={(text) => setPassword(text)}
                    mode="outlined"
                    outlineColor='green'
                    // error
                    activeOutlineColor='green'
                    style={{ marginBottom: "8%", }}
                    secureTextEntry
                    autoCorrect={false}
                />

                <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "green" }} onPress={() =>
                    login(email, password, navigation)
                }><Text style={{ textAlign: "center", color: "white", fontSize: 20, padding: 13 }}>Login</Text></TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.push("SignUpScreen")}>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'green', marginTop: "8%" }}>
                        Don't have an account? Create here
                    </Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
};
export default LoginScreen;