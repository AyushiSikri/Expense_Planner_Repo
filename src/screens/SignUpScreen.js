import React, { useContext, useState } from 'react';
import { ScrollView, Text, View, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput, } from 'react-native-paper';
import { AuthContext } from '../navigation/AuthProvider';

let mail = "", pass = "", confirm = "", business = "", boolBusiness = false, boolRegister = false, boolRetId = false, padding1 = 0, padding2 = 0, padding3 = 0, id, val = 91, msg = "";

const SignupScreen = ({ navigation }) => {

    const { register } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [BorderColor, setBorderColor] = React.useState("green");

    function Validate() {
        // alert(email, password, confirmPassword);
        if (email == '') {
            setBorderColor("red");
            mail = "Email cannot be empty";
            // alert(mail);
            boolBusiness = false;
            padding1 = 15;
        }
        else {
            setBorderColor("green");
            mail = "";
            boolBusiness = true;
            padding1 = 0;
        }

        if (password == '') {
            setBorderColor("red");
            pass = "Password cannot be empty";
            boolRetId = false;
            padding3 = 15;
            // alert(pass);
        }
        else {
            setBorderColor("green");
            pass = "";
            boolRetId = true;
            padding3 = 0;
        }

        if (confirmPassword == '') {
            setBorderColor("red");
            confirm = "Confirm Password cannot be empty";
            boolRegister = false;
            padding2 = 15;
            // alert(confirm);
        }
        else if (confirmPassword != password) {
            setBorderColor("red");
            confirm = "Confirm Password doesn't matches with the password";
            boolRegister = false;
            alert("Confirm Password doesn't matches with the password");
            padding2 = 15;
        }
        else if (confirmPassword == password) {
            setBorderColor("green");
            confirm = "";
            boolRegister = true;
            padding2 = 0;
        }



        if (boolBusiness && boolRegister && boolRetId) {
            register(email, password, navigation);
        }
    };


    return (
        <ScrollView style={{ flex: 1 }} >
            <View style={{}}>
                <Image style={{ height: 150, width: 150, alignSelf: "center", marginTop: 40, borderRadius: 75, borderWidth: 2, borderColor: "green" }} resizeMode="contain" source={require('../assets/logo.png')} />
            </View>
            <View style={{ margin: "5%", marginTop: "10%", }}>
                <Text style={{ textAlign: "center", fontSize: 40, color: 'black', marginBottom: "8%" }}>Create Account</Text>

                <TextInput
                    label="Email"
                    theme={{
                        colors: {
                            placeholder: "green"
                        },
                        roundness: 10
                    }}
                    mode="outlined"
                    outlineColor={BorderColor}
                    activeOutlineColor='green'
                    onChangeText={(text) => setEmail(text)}
                    style={{ marginBottom: "3%" }}
                    left={<TextInput.Icon name={require('../assets/email.png')} />}
                    autoCapitalize='none'
                />
                <Text style={{ ...styles.error, fontSize: padding1 }} >{mail}</Text>

                <TextInput
                    label="Password"
                    theme={{
                        colors: {
                            placeholder: "green"
                        },
                        roundness: 10
                    }}
                    mode="outlined"
                    outlineColor={BorderColor}
                    activeOutlineColor='green'
                    onChangeText={(text) => setPassword(text)}
                    style={{ marginBottom: "3%", }}
                    secureTextEntry
                    left={<TextInput.Icon name={require('../assets/key.png')} />}
                />

                <Text style={{ ...styles.error, fontSize: padding2 }} >{pass}</Text>


                <TextInput
                    label="Confirm Password"
                    theme={{
                        colors: {
                            placeholder: "green"
                        },
                        roundness: 10
                    }}
                    mode="outlined"
                    outlineColor={BorderColor}
                    activeOutlineColor='green'
                    onChangeText={(text) => setConfirmPassword(text)}
                    style={{ marginBottom: "3%", }}
                    secureTextEntry
                    left={<TextInput.Icon name={require('../assets/key.png')} />}
                />
                <Text style={{ ...styles.error, fontSize: padding3 }}>{confirm}</Text>

                <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "green", marginTop: "5%" }} onPress={() => Validate()}>
                    <Text style={{ textAlign: "center", color: "white", fontSize: 20, padding: 13 }}>Sign Up</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={{ textAlign: "center", fontSize: 20, color: 'green', marginTop: 20 }}>Have an account? Login</Text>
                </TouchableOpacity>


            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: "column",
    },
    header: {
        alignSelf: "flex-start",
        margin: 40,
        marginLeft: 20,
    },
    imgLogo: {
        alignSelf: "center",
    },
    body: {
        flex: 7,
        backgroundColor: "#1C843B",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        textAlign: "center",
        marginTop: 5,
    },
    bodyScrollView: {
        margin: 20,
        marginTop: 25
    },
    bodyHeaderText: {
        color: "#FFFFFF",
        fontSize: 25,
    },
    inputBoxStyling: {
        marginTop: 3,
        marginBottom: 3,
        color: "white",
        borderRadius: 2,
        backgroundColor: "#1C843B",
    },
    buttonView: {
        backgroundColor: "#FFC600",
        borderRadius: 10,
        padding: 15,
        paddingLeft: "30%",
        marginTop: 8,
        flexDirection: "row",
    },
    buttonText: {
        color: "#1C843B",
        textAlign: "center",
        alignSelf: "center",
        paddingLeft: 8,
    },
    imgContinue: {
        alignSelf: "center",
        resizeMode: "contain",
        height: "75%",
    },
    imgArrow: {
        margin: 5,
        marginTop: 10,
        marginBottom: 25,
    },
    dropdownView: {
        flex: 1,
        flexDirection: "row",
    },
    error: {
        color: "red",
    },
});
export default SignupScreen;