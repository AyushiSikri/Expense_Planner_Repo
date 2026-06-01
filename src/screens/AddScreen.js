import React, {useContext, useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  RefreshControl,
  TextInput,
} from 'react-native';
// import {TextInput} from 'react-native-paper';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../navigation/AuthProvider';
import uuid from 'react-native-uuid';
import {SafeAreaView} from 'react-native-safe-area-context';

let count = 0;
const AddScreen = ({navigation, route}) => {
  const {category, categoryImg, categoryColor} = route.params || {};

  const sliceColor = [
    '#cd5057',
    '#dc3e78',
    '#ac2575',
    '#9e3d9a',
    '#76449d',
    '#302a72',
    '#3f439c',
    '#1b80c4',
    '#4cb8e8',
    '#34bcb2',
  ];

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
    },
  ];

  const [savedlist, setSavedList] = useState([]);
  const [lists, setLists] = useState([]);
  let color = '',
    img = '';
  const [date, setDate] = React.useState();
  const [amount, setAmount] = React.useState('0');
  const [note, setNote] = React.useState('');
  const [dob, setDob] = React.useState(moment(date).format('DD MMM'));
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const getData = async () => {
    await AsyncStorage.getItem('storedLists')
      .then(data => {
        if (data !== null) {
          setLists(JSON.parse(data));
        }
      })
      .catch(error => console.log(error));

    await AsyncStorage.getItem('storedIncome')
      .then(data => {
        if (data !== null) {
          setBud(JSON.parse(data));
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    let abortController = new AbortController();
    getData();
    return () => {
      abortController.abort();
    };
  }, []);

  // useEffect(() => {
  //     let abortController = new AbortController();
  //     storeData2();
  //     return () => {
  //         abortController.abort();
  //     }
  // }, []);

  // useEffect(() => {
  //     let abortController = new AbortController();
  //     storeData3();
  //     return () => {
  //         abortController.abort();
  //     }
  // }, []);

  // useEffect(() => {
  //     return () => {
  //         storeData2();

  //     }
  // }, []);

  const handleConfirm = date => {
    setDate(date);
    setDob(moment(date).format('DD MMM, YYYY'));
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const keyboardPress = val => {
    let amt = amount + '' + val;
    setAmount(amt);
  };

  const deleteKeys = val => {
    let amt = amount.substring(0, amount.length - 1);
    setAmount(amt);
  };

  const [bud, setBud] = useState(0);
  const [exp, setExp] = useState(0);
  const [bal, setBal] = useState(0);

  const storeData = async val => {
    await AsyncStorage.setItem('storedLists', JSON.stringify(val))
      .then(() => {
        setLists(val);
        // storeData2();
      })
      .catch(error => console.log(error));
    console.log('avs', amount);
  };

  // const storeData2 = async () => {
  //     let expense = 0;
  //     // console.log("ll" + lists);
  //     lists.map((item) => {
  //         expense = expense + parseInt(item.amount);
  //     });
  //     expense = expense + parseInt(amount);
  //     console.log("avs 11 ", expense);
  //     console.log("pp", bud);

  //     await AsyncStorage.setItem('storedExpense', JSON.stringify(expense)).then(() => {
  //         setExp(expense);
  //         storeData3();
  //     }).catch(error => console.log(error));

  // }

  //   const storeData3 = async () => {
  //       let balance = 0;
  //       balance = bud - exp;
  //       console.log("b " + balance)

  //       await AsyncStorage.setItem('storedBalance', JSON.stringify(balance)).then(() => {
  //           setBal(balance);
  //       }).catch(error => console.log(error));
  //   }

  const onSubmit = () => {
    if (category != null && dob != null && note != '' && amount != null) {
      if (category == 'Bills') {
        img = require('../assets/bill.png');
        color = sliceColor[0];
      } else if (category == 'Clothes') {
        img = require('../assets/clothes.png');
        color = sliceColor[1];
      } else if (category == 'Travel') {
        img = require('../assets/transport.png');
        color = sliceColor[2];
      } else if (category == 'Entertainment') {
        img = require('../assets/entertainment.png');
        color = sliceColor[3];
      } else if (category == 'Health') {
        img = require('../assets/health.png');
        color = sliceColor[4];
      } else if (category == 'Beauty and Care') {
        img = require('../assets/care.png');
        color = sliceColor[5];
      } else if (category == 'Sports') {
        img = require('../assets/sports.png');
        color = sliceColor[6];
      } else if (category == 'Food') {
        img = require('../assets/food.png');
        color = sliceColor[7];
      } else if (category == 'Education') {
        img = require('../assets/edu.png');
        color = sliceColor[8];
      }
      count = uuid.v4();
      console.log(count + ' ' + img);
      const newItem = {
        category: category,
        amount: amount,
        note: note,
        date: dob,
        id: count,
        img: img,
        color: color,
      };
      getData();
      const newList = [...lists, newItem];
      setLists(newList);
      console.log(newList);
      storeData(newList);

      // navigation.navigate('ExpenseHistoryScreen');
      navigation.navigate('MainScreen');
    } else if (category == null) {
      alert('Please select the category');
    } else if (amount == '') {
      alert('Please enter an amount');
    } else if (note == '') {
      alert('Please write a note');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#E2E8F0'}}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingVertical: 15,
          flexGrow: 1,
          // backgroundColor:'yellow'
        }}
        // style={{ backgroundColor:'green' }}
      >
        <View
          style={{
            //   justifyContent: 'center',
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            // backgroundColor: 'yellow',
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
            Add Expense
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 1,
            // backgroundColor: 'pink',
          }}>
          <Image
            source={require('../assets/rupee_indian.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: '#0F172A',
              marginRight: 5,
            }}
          />
          <TextInput
            style={styles.textBox1}
            value={amount}
            editable={false}
            showSoftInputOnFocus={false}
          />
        </View>
        <TextInput
          label="Note"
          placeholder="Note"
          style={styles.textBox2}
          onChangeText={val => setNote(val)}
          //   left={<TextInput.Icon name={require('../assets/pen.png')} />}
        />

        <View
          style={{
            flexDirection: 'row',
            // backgroundColor:"green",
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              // margin: 10,
              padding: 13,
              borderWidth: 1,
              borderColor: '#64748B',
              borderRadius: 15,
              marginVertical: 5,
              // backgroundColor: 'white',
              // elevation: 5,
            }}
            onPress={() => setDatePickerVisibility(true)}>
            <Image
              source={require('../assets/calendar.png')}
              resizeMode="contain"
              style={{
                height: 25,
                width: 25,
                alignSelf: 'center',
                tintColor: '#64748B',
              }}
            />
            <Text style={{fontSize: 20, marginLeft: 2, color: '#0F172A'}}>
              {dob}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 2.5,
              padding: 13,
              marginVertical: 5,
              borderWidth: 1,
              marginLeft: 10,
              borderColor: '#64748B',
              borderRadius: 15,
              justifyContent: 'center',
              //   backgroundColor: 'white',
            }}
            onPress={() => navigation.push('CategoriesScreen')}>
            {category == null ? (
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  //    padding:13,
                  color: '#0F172A',
                }}>
                Select Category
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  alignSelf: 'center',
                  // padding: 13,
                  color: '#0F172A',
                }}>
                {category}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.keypadContainer}>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.boxView}
              onPress={() => keyboardPress(1)}>
              <Text style={styles.boxText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxView}
              onPress={() => keyboardPress(2)}>
              <Text style={styles.boxText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxView}
              onPress={() => keyboardPress(3)}>
              <Text style={styles.boxText}>3</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.boxView}
              onPress={() => keyboardPress(4)}>
              <Text style={styles.boxText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxView}
              onPress={() => keyboardPress(5)}>
              <Text style={styles.boxText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxView}
              onPress={() => keyboardPress(6)}>
              <Text style={styles.boxText}>6</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.boxView}
              onPress={() => keyboardPress(7)}>
              <Text style={styles.boxText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxView}
              onPress={() => keyboardPress(8)}>
              <Text style={styles.boxText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxView}
              onPress={() => keyboardPress(9)}>
              <Text style={styles.boxText}>9</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity
              style={styles.boxView}
              onPress={() => keyboardPress('.')}>
              <Text style={styles.boxText}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.boxView}
              onPress={() => keyboardPress(0)}>
              <Text style={styles.boxText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.boxView, justifyContent: 'center'}}
              onPress={() => deleteKeys()}>
              <Image
                source={require('../assets/del.png')}
                style={{
                  width: 30,
                  height: 30,
                  alignSelf: 'center',
                  tintColor: '#0F172A',
                  // backgroundColor:"red",
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={{
            borderRadius: 23,
            backgroundColor: '#10b981',
            marginTop: 5,
            justifyContent: 'center',
            // marginBottom: 0,
          }}
          onPress={() => onSubmit()}>
          <Text
            style={{
              textAlign: 'center',
              color: '#0F172A',
              fontSize: 22,
              fontWeight: '600',
              padding: 20,
            }}>
            Add Expense
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keypadContainer: {
    // flex: 1,
    // backgroundColor:"pink",
    // marginTop: 12,
    marginVertical: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    // flex: 3,
  },
  boxView: {
    flex: 2,
    borderRadius: 16,
    borderWidth: 1,
    // borderColor: '#b4b3b3',
    margin: 5,
    color: '#0F172A',
    borderColor: '#E2E8F0',
    // backgroundColor: '#f5f5f5',
    backgroundColor: '#F8FAFC',
  },
  boxText: {
    fontSize: 30,
    textAlign: 'center',
    padding: 8,
    color: '#0F172A',
  },
  textBox1: {
    // backgroundColor:"pink",
    padding: 0,
    color: '#0F172A',
    textAlign: 'center',
    fontSize: 36,
    fontWeight: '600',
  },
  textBox2: {
    // flex:1,
    // backgroundColor:"blue",
    borderWidth: 1,
    color: '#0F172A',
    borderColor: '#64748B',
    borderRadius: 15,
    padding: 13,
    marginVertical: 10,
    // backgroundColor: 'white',
    fontSize: 20,
  },
});
export default AddScreen;
