import React from 'react';
import { ScrollView, Text, View, Image, Button, StyleSheet, TouchableOpacity, Keyboard, FlatList, TouchableWithoutFeedback } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

let value = "";
const CategoriesScreen = ({ navigation, route }) => {
    const sliceColor = ['#cd5057', '#dc3e78', '#ac2575', '#9e3d9a', '#8408e4', '#042a90', 
        '#3f439c', '#1b80c4', '#34bcb2', '#b57d1c']
    const sliceColorBg = ['#ffd2d4', '#ffc8dc', '#ffaadd',
         '#ffa0fc', '#d7a2ff', '#6e94ff', '#b0b4fc', '#92deff', '#aefffa', '#ffd489']

    const DATA = [
        {
            img: require('../assets/bill.png'),
            id: '1',
            title: 'Bills',
            status: false,
            color: sliceColor[0],
            bg:sliceColorBg[0],
        },
        {
            img: require('../assets/food.png'),
            id: '2',
            title: 'Food',
            status: false,
            color: sliceColor[1],
            bg:sliceColorBg[1],
        },
        {
            img: require('../assets/transport.png'),
            id: '3',
            title: 'Travel',
            status: false,
            color: sliceColor[2],
            bg:sliceColorBg[2],
        },
        {
            img: require('../assets/entertainment.png'),
            id: '4',
            title: 'Entertainment',
            status: false,
            color: sliceColor[3],
            bg:sliceColorBg[3],
        },
        {
            img: require('../assets/health.png'),
            id: '5',
            title: 'Health',
            status: false,
            color: sliceColor[4],
            bg:sliceColorBg[4],
        },
        {
            img: require('../assets/care.png'),
            id: '6',
            title: 'Beauty and Care',
            status: false,
            color: sliceColor[5],
            bg:sliceColorBg[5],
        },
        {
            img: require('../assets/sports.png'),
            id: '7',
            title: 'Sports',
            status: false,
            color: sliceColor[6],
            bg:sliceColorBg[6],
        },
        {
            img: require('../assets/clothes.png'),
            id: '8',
            title: 'Clothes',
            status: false,
            color: sliceColor[7],
            bg:sliceColorBg[7],
        },
        {
            img: require('../assets/edu.png'),
            id: '9',
            title: 'Education',
            status: false,
            color: sliceColor[8],
            bg:sliceColorBg[8],
        },
          {
            img: require('../assets/other.png'),
            id: '10',
            title: 'Others',
            status: false,
            color: sliceColor[9],
            bg:sliceColorBg[9],
        }
    ];

    const [col, setCol] = React.useState("red");
    const [flag, setFlag] = React.useState(false);
const [selectedTitle, setSelectedTitle] = React.useState('');
const [selectedImg, setSelectedImg] = React.useState('');
const [selectedColor, setSelectedColor] = React.useState('');

    const Item = ({ title, status, img, color,bg }) => (

        <TouchableOpacity onPress={() => {
            setSelectedTitle(title);
            setSelectedColor(color);
            setSelectedImg(img);
        }} 
            style={{ ...styles.item, flexDirection: "row", borderRadius: 13, marginVertical:8, 
        backgroundColor:bg , borderWidth:2, borderColor: selectedTitle == title ? color : bg}} >
            <View style={{ backgroundColor: color, borderRadius: 70, marginRight: 10 }}>
                <Image style={{ height: 25, width: 25, margin: 5, tintColor:"white" }} source={img} />
            </View>
            <Text style={{ ...styles.title, color: color, alignSelf:"center" }}>{title}</Text>
        </TouchableOpacity>
    );


    const renderItem = ({ item }) => (
        <Item title={item.title} status={item.status} img={item.img} color={item.color} bg={item.bg}/>
    );

    return (
        <SafeAreaView style={{ flex: 1 , backgroundColor:"#E2E8F0", paddingHorizontal: 18, paddingVertical: 15}}>
  <View
          style={{
            //   justifyContent: 'center',
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom:"2%",
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

          <Text
            style={{
              fontSize: 35,
              //   marginTop: '8%',
              fontWeight: '700',
              marginLeft: '5%',
              //   textAlign:"center",
              //   flex: 1,
              color: '#0F172A',
            }}>
            Categories
          </Text>
        </View>
            <View style={{  flex: 10 }}>
                <FlatList
                    data={DATA}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
            <TouchableOpacity style={{ borderRadius: 23,
            backgroundColor: '#10b981',
            // flex: 1,
            marginTop: 10,
            justifyContent: 'center',
            // marginBottom: 10,
        }} onPress={() =>
                navigation.push("AddScreen",{
  category: selectedTitle,
  categoryImg: selectedImg,
  categoryColor: selectedColor,
})
            }><Text style={{ 
              textAlign: 'center',
              color: '#0F172A',
              fontSize: 22,
              fontWeight: '600',
              padding: 20,}}>Select</Text></TouchableOpacity>
        </SafeAreaView>
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
        // backgroundColor: "white",
        // margin: 3,
        padding: 18,
        // borderWidth: 1,
        // elevation: 5

    },
    title: {
        fontSize: 20,letterSpacing:1

    }

});
export default CategoriesScreen;
