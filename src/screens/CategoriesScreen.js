import React from 'react';
import { ScrollView, Text, View, Image, Button, StyleSheet, TouchableOpacity, Keyboard, FlatList, TouchableWithoutFeedback, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';


let value = "";
const CategoriesScreen = ({ navigation, route }) => {
    const sliceColor = ['#cd5057', '#dc3e78', '#ac2575', '#9e3d9a', '#76449d', '#302a72', '#3f439c', '#1b80c4', '#4cb8e8', '#34bcb2']
    const DATA = [
        {
            img: require('../assets/bill.png'),
            id: '1',
            title: 'Bills',
            status: false,
            color: sliceColor[0],
        },
        {
            img: require('../assets/clothes.png'),
            id: '2',
            title: 'Clothes',
            status: false,
            color: sliceColor[1],
        },
        {
            img: require('../assets/transport.png'),
            id: '3',
            title: 'Travel',
            status: false,
            color: sliceColor[2],
        },
        {
            img: require('../assets/entertainment.png'),
            id: '4',
            title: 'Entertainment',
            status: false,
            color: sliceColor[3],
        },
        {
            img: require('../assets/health.png'),
            id: '5',
            title: 'Health',
            status: false,
            color: sliceColor[4],
        },
        {
            img: require('../assets/care.png'),
            id: '6',
            title: 'Beauty and Care',
            status: false,
            color: sliceColor[5],
        },
        {
            img: require('../assets/sports.png'),
            id: '7',
            title: 'Sports',
            status: false,
            color: sliceColor[6],
        },
        {
            img: require('../assets/food.png'),
            id: '8',
            title: 'Food',
            status: false,
            color: sliceColor[7],
        },
        {
            img: require('../assets/edu.png'),
            id: '9',
            title: 'Education',
            status: false,
            color: sliceColor[8],
        }
    ];

    const [col, setCol] = React.useState("red");
    const [flag, setFlag] = React.useState(false);

    const Item = ({ title, status, img, color }) => (

        <TouchableOpacity onPress={() => value = title} style={{ ...styles.item, flexDirection: "row", borderRadius: 13, }} >
            <View style={{ backgroundColor: color, borderRadius: 70, marginRight: 10 }}>
                <Image style={{ height: 25, width: 25, margin: 5 }} source={img} />
            </View>
            <Text style={{ ...styles.title, color: color }}>{title}</Text>
        </TouchableOpacity>
    );


    const renderItem = ({ item }) => (
        <Item title={item.title} status={item.status} img={item.img} color={item.color} />
    );

    return (
        <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 30, color: "black", marginTop: 10, marginLeft: 20, flex: 1, }}>Categories</Text>

            <View style={{ margin: 5, flex: 10 }}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
            <TouchableOpacity style={{ borderRadius: 10, backgroundColor: "green", margin: 2, marginHorizontal: 5 }} onPress={() =>
                navigation.push("AddScreen", value)
            }><Text style={{ textAlign: "center", color: "white", fontSize: 20, padding: 13 }}>Select</Text></TouchableOpacity>
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
        margin: 5,
    },
    item: {
        backgroundColor: "white",
        margin: 3,
        padding: 15,
        // borderWidth: 1,
        elevation: 5

    },
    title: {
        fontSize: 18,

    }

});
export default CategoriesScreen;
