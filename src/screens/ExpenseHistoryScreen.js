import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Image, Button, StyleSheet, TouchableOpacity, Keyboard, FlatList, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let value = "";
const ExpenseHistoryScreen = ({ navigation, route }) => {

    const [flag, setFlag] = useState(true);
    const [lists, setLists] = useState();

    const getData = async () => {
        await AsyncStorage.getItem('storedLists').then(data => {
            if (data !== null) {
                //console.log("expense " + data[0]);
                setLists(JSON.parse(data));
            }
            else {
                setFlag(false);
            }
        }).catch((error) => console.log(error));
    }


    const clearStorage = async () => {
        try {
            await AsyncStorage.clear();
            alert('Storage successfully cleared!');
        } catch (e) {
            alert('Failed to clear the async storage.');
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const [col, setCol] = React.useState("white");

    const Item = ({ lists }) => (

        <View style={{ margin: 10, backgroundColor: "white", padding: 10, borderRadius: 25, borderColor: lists.color, borderWidth: 1, paddingLeft: 25 }}>
            <View style={{ backgroundColor: lists.color, borderRadius: 70, marginRight: 10 }}>
                {/* <Text style={{ padding: 5, color: color }}>jjiff</Text> */}
                <Image style={{ height: 25, width: 25, margin: 5, alignSelf: "center" }} source={lists.img} />
            </View>
            <Text style={{ margin: 2, marginBottom: 5, marginLeft: 200 }}>{lists.date}</Text>
            <Text style={{ fontWeight: '600', fontSize: 18, marginBottom: 5, color: "black" }}>{lists.category}</Text>
            <Text style={{ fontSize: 17, marginBottom: 5, }}>{lists.note}</Text>
            <Text style={{ fontWeight: '600', fontSize: 20, color: "red" }}>Rs. {lists.amount}</Text>
        </View>
    );


    const renderItem = ({ item }) => (
        <Item lists={item} />
    );

    return (
        <View style={{ flex: 1, backgroundColor: "#f0f1ff" }}>
            <View style={{ flexDirection: "row", }}>
                <Text style={{ fontSize: 30, color: "black", marginLeft: 20, marginVertical: 15, }}>Expense History</Text>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={lists}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    scrollEnabled={true}
                />
            </View>
            {/* <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "green", margin: 2 }} onPress={() =>
                clearStorage()
            }><Text style={{ textAlign: "center", color: "white", fontSize: 20, padding: 13 }}>Clear Storage</Text></TouchableOpacity> */}
            <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "green", margin: 2 }} onPress={() =>
                navigation.navigate('MainScreen')
            }><Text style={{ textAlign: "center", color: "white", fontSize: 20, padding: 13 }}>Go back to Home</Text></TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({

    keypadContainer: {
        flex: 4,
        marginTop: 32
    },
    rowContainer: {
        flexDirection: "column",
        flex: 6
    },
    boxView: {
        flex: 2,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#fcbbb8",
        margin: 1,
        // backgroundColor: "#fcbbb8"

    },
    boxText: {
        fontSize: 35,
        textAlign: "center",
        // fontWeight: "bold",
        // marginTop: 7,
        padding: 8,
        color: "black"
    },
    textBox1: {
        // borderWidth: 1,
        backgroundColor: "#fcbbb8",
        // flex: 0.8,
        margin: 10,
        marginTop: 30,
        borderRadius: 5,
        fontSize: 25,
    },
    textBox2: {
        borderBottomWidth: 1,
        // flex: 0.8,
        margin: 13,
        backgroundColor: "white",
        fontSize: 25,
    },
    flatlist: {
        margin: 10,
    },
    item: {
        backgroundColor: "white",
        margin: 3,
        padding: 15,
        borderWidth: 1

    },
    title: {
        fontSize: 18,

    }

});
export default ExpenseHistoryScreen;
