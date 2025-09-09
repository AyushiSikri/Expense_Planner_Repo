import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, Text, View, Image, Button, StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../navigation/AuthProvider';

let count = 0;
const BudgetScreen = ({ navigation, route }) => {
    const category = route.params;
    //console.log(category)

    const sliceColor = ['#cd5057', '#dc3e78', '#ac2575', '#9e3d9a', '#76449d', '#302a72', '#3f439c', '#1b80c4', '#4cb8e8', '#34bcb2']

    const [savedlist, setSavedList] = useState([]);
    const [lists, setLists] = useState([]);
    const [incomeSoFar, setIncomeSoFar] = useState(1000);
    const [date, setDate] = React.useState();
    const [amount, setAmount] = React.useState("");
    const [note, setNote] = React.useState("");
    const [dob, setDob] = React.useState(moment(date).format('DD MMM, YYYY'));
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

    const getData = async () => {

        await AsyncStorage.getItem('storedLists').then(data => {
            if (data !== null) {
                setLists(JSON.parse(data));
                let length = lists.length;
                // console.log(length)
                count = length;
            }
        }).catch((error) => console.log(error));
    }
    useEffect(() => {
        getData();
    }, []);


    const keyboardPress = (val) => {
        let amt = amount + "" + val;
        setAmount(amt);
    };

    const deleteKeys = (val) => {
        let amt = amount.substring(0, amount.length - 1);
        setAmount(amt);
    };

    const storeData = async (val) => {
        await AsyncStorage.setItem('storedIncome', JSON.stringify(val)).then(() => {
            console.log(amount)
        }).catch(error => console.log(error));
    }

    const onSubmit = () => {
        storeData(amount);
        setAmount("");
        navigation.navigate("MainScreen");
    };


    return (
        <ScrollView style={{ backgroundColor: "#f0f1ff", flex: 1 }} >
            <Text style={{ fontSize: 30, color: "black", marginLeft: 20, marginVertical: 15, }}>Add Budget</Text>

            <TextInput
                style={styles.textBox1}
                value={amount}
                editable={false}
                showSoftInputOnFocus={false}
                onChangeText={(val) => setAmount(val)}
                right={<TextInput.Icon name={require('../assets/del.png')} onPress={() => deleteKeys()} />}
                left={<TextInput.Icon name={require('../assets/cash.png')} />}
                keyboardType={"numeric"}
            />


            <View style={styles.keypadContainer}>
                <View style={styles.rowContainer}>
                    <TouchableOpacity style={styles.boxView} onPress={() => keyboardPress(1)}>
                        <Text style={styles.boxText}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxView} onPress={() => keyboardPress(2)}>
                        <Text style={styles.boxText}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxView} onPress={() => keyboardPress(3)}>
                        <Text style={styles.boxText}>3</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowContainer}>
                    <TouchableOpacity style={styles.boxView} onPress={() => keyboardPress(4)}>
                        <Text style={styles.boxText}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxView} onPress={() => keyboardPress(5)}>
                        <Text style={styles.boxText}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxView} onPress={() => keyboardPress(6)}>
                        <Text style={styles.boxText}>6</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowContainer}>
                    <TouchableOpacity style={styles.boxView} onPress={() => keyboardPress(7)}>
                        <Text style={styles.boxText}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxView} onPress={() => keyboardPress(8)}>
                        <Text style={styles.boxText}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxView} onPress={() => keyboardPress(9)}>
                        <Text style={styles.boxText}>9</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowContainer}>
                    <TouchableOpacity style={styles.boxView} onPress={() => keyboardPress('.')}>
                        <Text style={styles.boxText}>.</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxView} onPress={() => keyboardPress(0)}>
                        <Text style={styles.boxText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxView}>
                        <Text style={styles.boxText}>=</Text>
                    </TouchableOpacity>
                </View>


                <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "green", margin: 2, marginTop: 40, }} onPress={() =>
                    onSubmit()
                }><Text style={{ textAlign: "center", color: "white", fontSize: 20, padding: 13 }}>Add Budget</Text></TouchableOpacity>

            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({

    keypadContainer: {
        flex: 4,
        marginTop: 12,
        marginHorizontal: 8
    },
    rowContainer: {
        flexDirection: "row",
        flex: 3
    },
    boxView: {
        flex: 2,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#fcbbb8",
        margin: 2,
        backgroundColor: "white"
    },
    boxText: {
        fontSize: 35,
        textAlign: "center",
        padding: 8,
        color: "black",
    },
    textBox1: {
        backgroundColor: "#fcbbb8",
        margin: 10,
        borderRadius: 5,
        fontSize: 25,
        marginTop: 50,
    },
    textBox2: {
        borderBottomWidth: 1,
        margin: 13,
        backgroundColor: "white",
        fontSize: 25,
    },

});
export default BudgetScreen;