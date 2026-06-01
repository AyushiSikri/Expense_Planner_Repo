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
    const [BorderColor, setBorderColor] = React.useState("#64748B");

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
            setBorderColor("#0F172A");
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
            setBorderColor("#0F172A");
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
            setBorderColor("#0F172A");
            confirm = "";
            boolRegister = true;
            padding2 = 0;
        }



        if (boolBusiness && boolRegister && boolRetId) {
            register(email, password, navigation);
        }
    };


    return (
        <ScrollView style={{paddingHorizontal: 18,
        paddingVertical: 15,
        flex: 1,
        backgroundColor: '#E2E8F0',}} >
             <View
        style={{
          //   justifyContent: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          //   backgroundColor: 'pink',
        }}>
            <TouchableOpacity onPress={() => navigation.pop()}>
        <Image
          source={require('../assets/back.png')}
          style={{
            width: 30,
            height: 35,
            tintColor: '#64748B',
            // backgroundColor:"red",
            resizeMode: 'contain',
          }}
        />
</TouchableOpacity>
        <Image
          source={require('../assets/plannerLogoNew.png')}
          style={{
            width: 150,
            height: 50,
            // backgroundColor:"blue",
            // resizeMode: 'contain',
          }}
        />
      </View>
                <Text style={{  
                     marginBottom: "5%",

                     fontSize: 40,
            fontWeight: '700',
            // marginHorizontal: '2%',
            marginTop: '8%',
            // alignSelf: 'center',
            //  backgroundColor:"yellow",
            
            color: '#0F172A',
                      }}>Create Account</Text>

                <TextInput
                    label="Email"
                    theme={{
                        colors: {
                            placeholder: "#64748B"
                        },
                        roundness: 10
                    }}
                    mode="outlined"
                    outlineColor={BorderColor}
                    activeOutlineColor='#0F172A'
                    onChangeText={(text) => setEmail(text)}
                    style={{ marginBottom: "3%" ,backgroundColor:"#E2E8F0"}}
                    left={<TextInput.Icon color={"#0F172A"} name={require('../assets/email.png')} />}
                    autoCapitalize='none'
                />
                <Text style={{ ...styles.error, fontSize: padding1 }} >{mail}</Text>

                <TextInput
                    label="Password"
                    theme={{
                        colors: {
                            placeholder: "#64748B"
                        },
                        roundness: 10
                    }}
                    mode="outlined"
                    outlineColor={BorderColor}
                    activeOutlineColor='#0F172A'
                    onChangeText={(text) => setPassword(text)}
                    style={{ marginBottom: "3%",backgroundColor:"#E2E8F0" }}
                    secureTextEntry
                    left={<TextInput.Icon color={"#0F172A"} name={require('../assets/key.png')} />}
                />

                <Text style={{ ...styles.error, fontSize: padding2 }} >{pass}</Text>


                <TextInput
                    label="Confirm Password"
                    theme={{
                        colors: {
                            placeholder: "#64748B"
                        },
                        roundness: 10
                    }}
                    mode="outlined"
                    outlineColor={BorderColor}
                    activeOutlineColor='#0F172A'
                    onChangeText={(text) => setConfirmPassword(text)}
                    style={{ marginBottom: "3%",backgroundColor:"#E2E8F0" }}
                    secureTextEntry
                    left={<TextInput.Icon color={"#0F172A"} name={require('../assets/key.png')} />}
                />
                <Text style={{ ...styles.error, fontSize: padding3 }}>{confirm}</Text>

                <TouchableOpacity style={{ borderRadius: 23, backgroundColor: "#10B981", marginTop: "5%" }} onPress={() => Validate()}>
                    <Text style={{ textAlign: 'center',
              color: '#F8FAFC',
              fontSize: 22,
              padding: 20,
              fontWeight: '600', }}>Sign Up</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={{ textAlign: "center", fontSize: 17, color: '#64748B', marginTop: 20 }}>Have an account? Login</Text>
                </TouchableOpacity>

        </ScrollView>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: "column",
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