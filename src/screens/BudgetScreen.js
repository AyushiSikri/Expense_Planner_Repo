import React, {useContext, useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
// import { TextInput } from 'react-native-paper';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../navigation/AuthProvider';
import {SafeAreaView} from 'react-native-safe-area-context';

let count = 0;
const BudgetScreen = ({navigation, route}) => {
  const category = route.params;
  //console.log(category)

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

  const [savedlist, setSavedList] = useState([]);
  const [lists, setLists] = useState([]);
  const [incomeSoFar, setIncomeSoFar] = useState(1000);
  const [date, setDate] = React.useState();
  const [amount, setAmount] = React.useState('');
  const [note, setNote] = React.useState('');
  const [dob, setDob] = React.useState(moment(date).format('DD MMM, YYYY'));
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const [activeTab, setActiveTab] = useState('budget'); // 'budget' | 'expense'

  const getData = async () => {
    await AsyncStorage.getItem('storedLists')
      .then(data => {
        if (data !== null) {
          setLists(JSON.parse(data));
          let length = lists.length;
          // console.log(length)
          count = length;
        }
      })
      .catch(error => console.log(error));
  };
  useEffect(() => {
    getData();
  }, []);

  const keyboardPress = val => {
    let amt = amount + '' + val;
    setAmount(amt);
  };

  const deleteKeys = val => {
    let amt = amount.substring(0, amount.length - 1);
    setAmount(amt);
  };

  const storeData = async val => {
    const key = activeTab === 'budget' ? 'storedIncome' : 'storedExpense';
    await AsyncStorage.setItem(key, JSON.stringify(val))
      .then(() => {
        console.log(amount);
      })
      .catch(error => console.log(error));
  };

  const onSubmit = () => {
    storeData(amount);
    setAmount('');
    navigation.navigate('MainScreen');
  };
  // ── NEW: reset amount when tab changes ──────────────────────
  useEffect(() => {
    setAmount('');
  }, [activeTab]);
  // ────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#E2E8F0'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          //   gap: 10,
          flexGrow: 1,
          paddingHorizontal: 15,
          paddingVertical: 13,
        }}>
        <View
          style={{
            //   justifyContent: 'center',
            flexDirection: 'row',
            // justifyContent: 'space-between',
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
              //   marginTop: '8%',
              fontWeight: '700',
              marginLeft: '5%',
              //   textAlign:"center",
              //   flex: 1,
              color: '#0F172A',
            }}>
            {activeTab === 'budget' ? 'Add Budget' : 'Add Expense'}
            {/* ← NEW */}
          </Text>
        </View>

        {/* ── NEW: tab switch ─────────────────────────────────── */}
        {/* <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === 'budget' && styles.tabBtnActive,
            ]}
            onPress={() => setActiveTab('budget')}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'budget' && styles.tabTextActive,
              ]}>
              Budget
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === 'expense' && styles.tabBtnActive,
            ]}
            onPress={() => setActiveTab('expense')}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'expense' && styles.tabTextActive,
              ]}>
              Expense
            </Text>
          </TouchableOpacity>
        </View> */}
        {/* ──────────────────────────────────────────────────── */}

        {/* ── title — just text changes ── */}

        {/* <Text style={{ fontSize: 30, color: "black", marginLeft: 20, marginVertical: 15, }}>Add Budget</Text> */}
        {/* <Text
          style={{
            fontSize: 40,
            marginTop: '8%',
            fontWeight: '700',
            marginBottom: '5%',
            flex:1,
            //  backgroundColor:"yellow",
            color: '#0F172A',
          }}>
          Add Budget
        </Text> */}
        {/* <TextInput
          style={styles.textBox1}
          value={amount}
          editable={false}
          multiline={true}
          showSoftInputOnFocus={false}
          onChangeText={val => setAmount(val)}
          keyboardType={'numeric'}
        /> */}

          <View
                  style={{
                    flex: 5,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 1,
                    // backgroundColor: 'pink',
                  }}>
                  <Image
                    source={require('../assets/rupee_indian.png')}
                    style={{
                      width: 28,
                      height: 28,
                      tintColor: '#0F172A',
                      marginRight: 3,
                    }}
                  />
                  <TextInput
                    style={styles.textBox1}
                    value={amount}
                    editable={false}
                    showSoftInputOnFocus={false}
                  />
                </View>

        {activeTab === 'expense' ? (
          <TextInput
            style={styles.textBox3}
            placeholder={'Note'}
            editable={true}
            // showSoftInputOnFocus={false}
            // onChangeText={(val) => setAmount(val)}
            // keyboardType={'numeric'}
          />
        ) : null}

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
              style={styles.boxView}
              onPress={() => deleteKeys()}>
                <Image
                  source={require('../assets/del.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: '#0F172A',
                    alignSelf:"center",
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
            // flex: 1,
            marginTop: 5,
            justifyContent: 'center',
            marginBottom: 10,
          }}  onPress={() =>
                    onSubmit()
                }>
          <Text
            style={{
              textAlign: 'center',
              color: '#0F172A',
              fontSize: 22,
              fontWeight: '600',
              padding: 20,
            }}>
            {activeTab === 'budget' ? 'Add Budget' : 'Add Expense'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keypadContainer: {
    flex: 1,
    //  backgroundColor: 'pink',
  },
  rowContainer: {
    flexDirection: 'row',
    // backgroundColor:"blue",
     justifyContent: 'center',
  },
  boxView: {
    flex: 2,
    margin: 5,
    borderRadius: 16,
    justifyContent: 'center',
    borderWidth: 1,
    color: '#0F172A',
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  boxText: {
    fontSize: 30,
    padding:12,
    textAlign: 'center',
    color: '#0F172A',
  },
  textBox1: {
    // backgroundColor: "red",
    // flex: 3,
    // justifyContent: 'center',
    // borderRadius: 5,
    // textAlign: 'center',
    // fontSize: 30,
    // fontWeight: '700',
    // color: '#0F172A',
    // marginBottom: 10,
       padding: 0,
    color: '#0F172A',
    textAlign: 'center',
    fontSize: 38,
    fontWeight: '600',
  },
  textBox2: {
    flex: 0.3,
    width: '50%',
    borderRadius: 35,
    borderWidth: 1,
    color: '#64748B',
    borderColor: '#E2E8F0',
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    fontSize: 17,
    fontWeight: '400',
  },
  textBox3: {
    borderBottomWidth: 1,
    color: '#64748B',
    borderColor: '#64748B',
    // borderColor: '#E2E8F0',
    // alignSelf: 'center',
    // fontStyle: 'italic',
    textAlign: 'center',
    // backgroundColor: '#F8FAFC',
    // justifyContent: 'center',
    fontSize: 18,
    fontWeight: '400',
    // opacity: 0.7,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 4,
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 11,
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: '#10b981',
    // subtle shadow on Android
    elevation: 2,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#94A3B8',
  },
  tabTextActive: {
    color: '#fff',
  },
});
export default BudgetScreen;
