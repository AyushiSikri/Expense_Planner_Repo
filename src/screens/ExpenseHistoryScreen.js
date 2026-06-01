import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';

let value = '';
const ExpenseHistoryScreen = ({navigation, route}) => {
  const [flag, setFlag] = useState(true);
  const [lists, setLists] = useState();

  const getData = async () => {
    await AsyncStorage.getItem('storedLists')
      .then(data => {
        if (data !== null) {
          //console.log("expense " + data[0]);
          setLists(JSON.parse(data));
        } else {
          setFlag(false);
        }
      })
      .catch(error => console.log(error));
  };

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

  const [col, setCol] = React.useState('white');

 const Item = ({lists}) => (
  <View
    style={{
      marginHorizontal: 10,
      marginVertical: 6,
      backgroundColor: '#fff',
      borderRadius: 18,
      borderWidth: 1,
      borderColor: lists.color,
      padding: 15,
    }}>

    {/* Top Row */}
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>

        <View
          style={{
            backgroundColor: lists.color,
            borderRadius: 50,
            padding: 8,
          }}>
          <Image
            source={lists.img}
            style={{
              width: 24,
              height: 24,
            }}
          />
        </View>

        <Text
          style={{
            marginLeft: 12,
            fontSize: 18,
            fontWeight: '600',
            color: '#0F172A',
          }}>
          {lists.category}
        </Text>
      </View>

      <Text
        style={{
          color: '#64748B',
          fontSize: 14,
        }}>
        {lists.date}
      </Text>
    </View>

    {/* Note */}
    <Text
      style={{
        marginTop: 10,
        fontSize: 15,
        color: '#475569',
      }}>
      {lists.note}
    </Text>

    {/* Amount */}
    <Text
      style={{
        marginTop: 12,
        fontSize: 22,
        fontWeight: '700',
        color: '#EF4444',
      }}>
      ₹ {lists.amount}
    </Text>
  </View>
);

  const renderItem = ({item}) => <Item lists={item} />;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#E2E8F0',
        paddingHorizontal: 15,
        paddingVertical: 13,
      }}>
      <View
        style={{
          flexDirection: 'row',
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

        <Text
          style={{
            fontSize: 35,
            fontWeight: '700',
            marginLeft: '5%',
            color: '#0F172A',
          }}>
          Expense History
        </Text>
      </View>

      <View style={{flex: 1,

        paddingVertical: 13,
         }}>
        <FlatList
          data={lists}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keypadContainer: {
    flex: 4,
    marginTop: 32,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 6,
  },
  boxView: {
    flex: 2,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#fcbbb8',
    margin: 1,
    // backgroundColor: "#fcbbb8"
  },
  boxText: {
    fontSize: 35,
    textAlign: 'center',
    // fontWeight: "bold",
    // marginTop: 7,
    padding: 8,
    color: 'black',
  },
  textBox1: {
    // borderWidth: 1,
    backgroundColor: '#fcbbb8',
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
    backgroundColor: 'white',
    fontSize: 25,
  },
  flatlist: {
    margin: 10,
  },
  item: {
    backgroundColor: 'white',
    margin: 3,
    padding: 15,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
  },
});
export default ExpenseHistoryScreen;
