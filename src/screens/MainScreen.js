import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, Text, View, Image, Button, StyleSheet, TouchableOpacity, Keyboard, FlatList, TouchableWithoutFeedback, SafeAreaView, RefreshControl, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../navigation/AuthProvider';
import { useIsFocused } from '@react-navigation/native';


const MainScreen = ({ navigation, route }) => {

    const { logout } = useContext(AuthContext);

    const sliceColor = ['#cd5057', '#dc3e78', '#ac2575', '#9e3d9a', '#76449d', '#302a72', '#3f439c', '#1b80c4', '#4cb8e8', '#34bcb2'];

    let amtBills = 0, amtClothes = 0, amtTravel = 0, amtEntertainment = 0, amtHealth = 0, amtBeautyCare = 0, amtSports = 0, amtFood = 0, amtEducation = 0, amtTotal = 0;

    const [expenseSoFar, setExpenseSoFar] = useState(0);
    const [incomeSoFar, setIncomeSoFar] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [isFetching, setIsFetching] = React.useState(false);
    const [lists, setLists] = useState();
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const isFocused = useIsFocused();

    const [requests, setRequests] = useState('');

    useEffect(() => {
        getData();
    }, [isFocused])

    // useEffect(() => {
    //     getData();
    // }, [navigation])

    const onRefresh = async () => {
        setIsFetching(true);
        // filterChartData();
        getData();
        await sleep(5000);
        setIsFetching(false);
    };

    let inc = 0, exp = 0;
    const getData = async () => {
        await AsyncStorage.getItem('storedLists').then(data => {
            if (data !== null) {
                // setRefreshing(true);
                //console.log("expense " + data[0]);
                setLists(JSON.parse(data));
                filterChartData();
                console.log("lists: ", lists);

            }
        }).catch((error) => console.log(error));



        await AsyncStorage.getItem('storedIncome').then(data => {
            if (data !== null) {
                setIncomeSoFar(JSON.parse(data));
                inc = incomeSoFar;
            }
        }).catch((error) => console.log(error));

        // await AsyncStorage.getItem('storedExpense').then(data => {
        //     if (data !== null) {
        //         setExpenseSoFar(JSON.parse(data));
        //         exp = expenseSoFar;
        //     }
        // }).catch((error) => console.log(error));


        // await AsyncStorage.getItem('storedBalance').then(data => {
        //     if (data !== null) {
        //         setTotalBalance(JSON.parse(data));
        //     }
        // }).catch((error) => console.log(error));
    }


    const filterChartData = () => {
        console.log("in filterdataa ");

        lists.map((item) => {
            let category = item.category;
            let expense = parseInt(item.amount);
            console.log("in map ", (category));

            amtTotal = amtTotal + expense;

            // switch (category) {
            //     case 'Bills':
            //         console.log("in switch ");
            //         amtBills += expense;
            //         break;
            //     case 'Clothes':
            //         console.log("in switch ");
            //         amtClothes += expense;
            //         break;
            //     case 'Travel':
            //         console.log("in switch ");
            //         amtTravel += expense;
            //         break;
            //     case 'Entertainment':
            //         console.log("in switch ");
            //         amtEducation += expense;
            //         break;
            //     case 'Health':
            //         console.log("in switch ");
            //         amtHealth += expense;
            //         break;
            //     case 'BeautyCare':
            //         console.log("in switch ");
            //         amtBeautyCare += expense;
            //         break;
            //     case 'Sports':
            //         console.log("in switch ");
            //         amtSports += expense;
            //         break;
            //     case 'Food':
            //         console.log("in switch ");
            //         amtFood += expense;
            //         break;
            //     case 'Education':
            //         console.log("in switch ");
            //         amtEducation += expense;
            //         break;
            // }

        });
        setExpenseSoFar(amtTotal);
        let income = parseInt(incomeSoFar);
        setTotalBalance(income - amtTotal);
    };


    const Item = ({ lists }) => (

        <View style={{ margin: 5, marginHorizontal: 10, backgroundColor: "white", padding: 5, borderRadius: 25, borderColor: lists.color, borderWidth: 1, paddingLeft: 25, elevation: 4 }}>
            <View style={{ flexDirection: "row" }}>
                <View style={{ backgroundColor: lists.color, marginVertical: 12, borderRadius: 70, marginRight: 10, flex: 1 }}>
                    <Image style={{ height: 25, width: 25, margin: 5 }} source={lists.img} />
                </View>
                <View style={{ flex: 4 }}>
                    <Text style={{ fontWeight: '600', fontSize: 18, marginVertical: 5, color: "black" }}>{lists.category}</Text>
                    <Text style={{ fontSize: 14, marginBottom: 5, }}>{lists.note}</Text>
                </View>
                <Text style={{ fontWeight: '600', fontSize: 20, color: "red", flex: 3, alignSelf: "center" }}>Rs. {lists.amount}</Text>
            </View>

        </View>

    );


    const renderItem = ({ item }) => (
        <Item lists={item} />
    );

    const CardBlack = ({ text, icon, press, color }) => {
        return (
            <TouchableOpacity style={{ ...styles.cardBlack, }} onPress={press}>
                <View style={{ flex: 1 }}>
                    <Image source={icon} style={styles.iconStyle} />
                </View>

                <Text style={styles.cardTextBlack}>{text}</Text>
            </TouchableOpacity>
        );
    }
    const CardBlack2 = ({ text, icon, press, color }) => {
        return (
            <TouchableOpacity style={{
                flex: 1,
                backgroundColor: "pink",
                borderRadius: 10,
                flexDirection: "row",
                width: "100%",
                height: "100%",
                borderWidth: 1,
                borderColor: "black",
                padding: 16,
                paddingVertical: 28,
                margin: 5,
                alignItems: "center"
            }} onPress={press}>
                <View style={{ flex: 1, alignItems: "flex-end", marginRight: 18 }}>
                    <Image source={icon} style={{
                        ...styles.iconStyle, height: 35,
                        width: 35,
                    }} />
                </View>
                <Text style={{ ...styles.cardTextBlack, flex: 2, fontSize: 20, color: "black", fontWeight: "400" }}>{text}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={{ backgroundColor: "#f0f1ff", flex: 1 }}>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 30, color: "black", marginLeft: 20, marginTop: 15, flex: 1 }}>Home</Text>

                <TouchableOpacity style={{ flex: 1, margin: 12, marginRight: 15 }} onPress={() => logout(navigation)}>
                    <Image style={{ height: 45, width: 45, alignSelf: "flex-end" }} source={require('../assets/logout.png')} />
                </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: "pink", height: 150, borderRadius: 15, margin: 15, elevation: 10, padding: 15, borderWidth: 1, borderColor: "black", }}>
                <View style={{ flexDirection: "row", flex: 1 }}>
                    <View style={{ flex: 1, borderWidth: 1, borderColor: "pink", borderEndColor: "black" }}>
                        <Text style={{ textAlign: "center", fontSize: 13, color: "grey" }}>EXPENSE SO FAR</Text>

                        <Text style={{ textAlign: "center", fontSize: 23, margin: 5, color: "red", }}>{expenseSoFar}</Text>

                    </View>
                    <View style={{ flex: 1, }}>
                        <Text style={{ textAlign: "center", fontSize: 13, color: "grey" }}>BUDGET SO FAR</Text>
                        <Text style={{ textAlign: "center", fontSize: 23, margin: 5, color: "green", }}>{incomeSoFar}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, borderWidth: 1, borderColor: "pink", borderTopColor: "black" }}>
                    <Text style={{ textAlign: "center", fontSize: 15, color: "grey", marginTop: 6 }}>TOTAL BALANCE</Text>
                    <Text style={{ textAlign: "center", fontSize: 25, margin: 5, color: "black", }}>{totalBalance}</Text>
                </View>
            </View>

            <View style={{ flex: 2, margin: 10 }}>
                <View style={{ flexDirection: "row", flex: 1, margin: 5 }}>
                    <CardBlack text={"Add Budget"} icon={require('../assets/budget.png')} press={() => navigation.navigate('BudgetScreen')} />
                    <CardBlack text={"Add expense"} icon={require('../assets/property.png')} press={() => navigation.navigate('AddScreen')} />
                </View>
                <View style={{ flexDirection: "row", flex: 1, margin: 5 }}>
                    <CardBlack2 text={"Expense History"} icon={require('../assets/history.png')} press={() => navigation.navigate('ExpenseHistoryScreen')} />
                </View>
            </View>

            <Text style={{ fontSize: 20, color: "black", margin: 5, marginLeft: 20, marginTop: 15, }}>RECENT EXPENSES</Text>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={lists}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    enableEmptySections={true}
                    onRefresh={onRefresh}
                    refreshing={isFetching}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardBlack: {
        flex: 1,
        backgroundColor: "pink",
        borderRadius: 10,
        flexDirection: "row",
        width: "100%",
        height: "100%",
        padding: 16,
        paddingVertical: 28,
        margin: 5,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
    },
    iconStyle: {
        height: 33,
        width: 33,
        resizeMode: 'contain'
    },

    cardTextBlack: {
        fontSize: 18,
        fontWeight: '400',
        color: "black",
        flex: 2
    },
});
export default MainScreen;
