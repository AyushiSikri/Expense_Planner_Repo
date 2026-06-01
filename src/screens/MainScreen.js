import React, {useEffect, useState, useContext} from 'react';
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
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../navigation/AuthProvider';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const MainScreen = ({navigation, route}) => {
  const {logout} = useContext(AuthContext);

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

  let amtBills = 0,
    amtClothes = 0,
    amtTravel = 0,
    amtEntertainment = 0,
    amtHealth = 0,
    amtBeautyCare = 0,
    amtSports = 0,
    amtFood = 0,
    amtEducation = 0,
    amtTotal = 0;

  const [expenseSoFar, setExpenseSoFar] = useState(0);
  const [incomeSoFar, setIncomeSoFar] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [lists, setLists] = useState();
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const isFocused = useIsFocused();

  const [requests, setRequests] = useState('');

  useEffect(() => {
    getData();
  }, [isFocused]);

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

  let inc = 0,
    exp = 0;
  const getData = async () => {
    await AsyncStorage.getItem('storedLists')
      .then(data => {
        if (data !== null) {
          // setRefreshing(true);
          //console.log("expense " + data[0]);
          setLists(JSON.parse(data));
          filterChartData();
          console.log('lists: ', lists);
        }
      })
      .catch(error => console.log(error));

    await AsyncStorage.getItem('storedIncome')
      .then(data => {
        if (data !== null) {
          setIncomeSoFar(JSON.parse(data));
          inc = incomeSoFar;
        }
      })
      .catch(error => console.log(error));

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
  };

  const filterChartData = () => {
    console.log('in filterdataa ');

    lists.map(item => {
      let category = item.category;
      let expense = parseInt(item.amount);
      console.log('in map ', category);

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

  const Item = ({lists}) => (
    <View
      style={{
        marginVertical: 5,
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 23,
        // borderColor: lists.color,
        // borderWidth: 1,
        paddingLeft: 25,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            backgroundColor: lists.color,
            marginVertical: 12,
           alignItems:"center",
            borderRadius: 10,
            marginRight: 10,
            flex: 1,
          }}>
          <Image
            style={{height: 25, width: 25, margin: 5,tintColor:"white"}}
            source={lists.img}
          />
        </View>
        <View style={{flex: 4,justifyContent:"center"}}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 18,
              // marginTop: 5,
              color: 'black',
            }}>
            {lists.category}
          </Text>
          <Text style={{fontSize: 14,
            // backgroundColor:"red",
            marginBottom: 5}}>{lists.note}</Text>
        </View>
        <Text
          style={{
            fontWeight: '600',
            fontSize: 20,
            color: '#ea6371',
            flex: 3,
            alignSelf: 'center',
          }}>
          Rs. {lists.amount}
        </Text>
      </View>
    </View>
  );

  const renderItem = ({item}) => <Item lists={item} />;

  const CardBlack = ({text, icon, press, color, bg,subText}) => {
    return (
      <TouchableOpacity style={{...styles.cardBlack, margin:3}} onPress={press}>
        <View style={{ 
         backgroundColor: bg,
          borderRadius:10, 
          alignSelf:"flex-start",
          padding:3, 
          marginBottom:3
          }}>
          <Image source={icon} style={{...styles.iconStyle,
             tintColor: color
          }} />
        </View>
        <Text style={styles.cardTextBlack}>{text}</Text>
        <Text
          style={{
            // flex: 2,
            fontSize: 14,
            color: '#898989',
            // alignSelf:"center"
            // fontWeight: '600',
          }}>
          {subText}
        </Text>
      </TouchableOpacity>
    );
  };
  const CardBlack2 = ({text, icon, press, color,bg}) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          borderRadius: 23,
          flexDirection: 'row',
          alignSelf:"center",
          width: '100%',
          borderColor: '#bdbdbd',
          margin:3,
          marginVertical: 5,
    padding: 16,
    borderWidth: 1,
        }}
        onPress={press}>
        <View style={{
          // flex: 1,
          //  alignItems: 'flex-end',
            marginRight: 10, backgroundColor:bg,
          borderRadius:10, 
justifyContent:"center",
          padding:3,
          paddingHorizontal:8,
          }}>
          <Image
            source={icon}
            style={{
              ...styles.iconStyle,
               tintColor: color,
              height: 20,
              width: 20,
            }}
          />
        </View>
        <View style={{
          // flexDirection:"row"
        }}>
          <Text
          style={{
            ...styles.cardTextBlack,
            // flex: 2,
            fontSize: 18,
            color: '#0F172A',
            // alignSelf:"center"
            // fontWeight: '600',
          }}>
          {text}
        </Text>
        <Text
          style={{
            // flex: 2,
            fontSize: 14,
            color: '#898989',
            alignSelf:"center"
            // fontWeight: '600',
          }}>
          View all your past records
        </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#E2E8F0',
      }}>
      {/* <View
        style={{
          //   justifyContent: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          marginBottom: '5%',
          //   backgroundColor: 'pink',
        }}>
       <View style={{
        backgroundColor:"beige",
        }}>
         <Text
          style={{
            //    marginTop: '8%',
            fontSize: 20,
            fontWeight: '400',
            color: '#0F172A',
            letterSpacing:1.5,
          }}>
          Welcome Back
        </Text>
         <Text
          style={{
            //    marginTop: '8%',
            fontSize: 25,
            fontWeight: '700',
            color: '#0F172A',
            letterSpacing:1.5,
          }}>
          Ayushi
        </Text>
       </View>
        <Image
          source={require('../assets/plannerTopLogo2.png')}
          style={{
            width: 150,
            height: 50,
            // backgroundColor:"blue",
            // resizeMode: 'contain',
          }}
        />
      </View> */}

      {/* <View
        style={{
          backgroundColor: '#1D9E75',
          height: 150,
          borderRadius: 23,
        //   margin: 15,
        //   elevation: 10,
          padding: 15,
        //   borderWidth: 1,
    //    borderColor: '#64748B',
        }}>

            <View
          style={{
            flex: 1,
            // borderWidth: 1,
            // borderColor: '#F8FAFC',
            // borderTopColor: '#0F172A',
          }}>
          <Text
            style={{
            //   textAlign: 'center',
              fontSize: 15,
              color: '#fff',
              
            }}>
            TOTAL BALANCE
          </Text>
          <Text
            style={{
            //   textAlign: 'center',
              fontSize: 25,
              margin: 5,
              color: '#fff',
            }}>
            ${totalBalance}
          </Text>
        </View>


        <View style={{flexDirection: 'row', flex: 1,marginTop: 6,}}>
          <View
            style={{
              flex: 1,margin:2,
            //   borderWidth: 1,
            //   borderColor: '#F8FAFC',
            //   borderEndColor: '#0F172A',
              borderRadius:15,
              backgroundColor:'rgba(255,255,255,0.15)'
            }}>
            <Text style={{textAlign: 'center', fontSize: 13,    color: '#fff',
                
                }}>
              EXPENSES SO FAR
            </Text>

            <Text
              style={{
                textAlign: 'center',
                fontSize: 23,
                margin: 5,
                color: '#ffcdd2',
              }}>
              {expenseSoFar}
            </Text>
          </View>
          <View style={{flex: 1,backgroundColor:'rgba(255,255,255,0.15)', borderRadius:15,margin:2}}>
            <Text style={{textAlign: 'center', fontSize: 13,    color: '#fff',}}>
              BUDGET SO FAR
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 23,
                margin: 5,
                color: '#c8f7e4',
              }}>
              {incomeSoFar}
            </Text>
          </View>
        </View>

        
      </View> */}

      <View
        style={{
          backgroundColor: 'rgba(8, 171, 117, 0.98)',
          // backgroundColor: '#34D399',
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.12)',
          // borderRadius: 23,
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}>
        <View style={{flexDirection: 'row', 
          // backgroundColor:"pink", 
          marginBottom:20,
          }}>
          <Image
            source={require('../assets/plannerLogo.png')}
            style={{
              width: 60,
              height: 60,
              // tintColor: '#FFF',
              alignSelf:"center",
              borderRadius:30,
              // backgroundColor: 'white',
              resizeMode: 'contain',
            }}
          />
          <View
            style={
              {
                // backgroundColor:"blue",
                marginLeft:15,
              }
            }>
            <Text
              style={{
                //    marginTop: '8%',
                fontSize: 20,
                fontWeight: '400',
                color: '#d7dcd8',
                letterSpacing: 1,
              }}>
              Welcome Back
            </Text>

            <Text
              style={{
                //    marginTop: '8%',
                fontSize: 22,
                fontWeight: '700',
                color: '#ffffff',
                letterSpacing: 1.5,
              }}>
              Ayushi
            </Text>

          </View>
         {/* <Image
            source={require('../assets/menu.png')}
            style={{
              width: 35,
              height: 40,
              tintColor: '#FFF',
              // alignSelf:"center",
              // right:0,
              justifyContent:"flex-end",
              // backgroundColor: 'pink',
              resizeMode: 'contain',
            }}
          /> */}
        </View>
        {/* Total Balance */}
        <View style={{marginBottom: 10}}>
          <Text
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.8)',
              letterSpacing: 1,
            }}>
            Total Balance
          </Text>

          <Text
            style={{
              fontSize: 34,
              fontWeight: '500',
              color: '#fff', // was #0F172A — fix this
              marginTop: 2,
              marginHorizontal: 5,
            }}>
            <Image
              source={require('../assets/rupee_indian.png')}
              style={{
                width: 25,
                height: 25,
                tintColor: '#fff',
                // backgroundColor:"blue",
                resizeMode: 'contain',
              }}
            />
            {totalBalance}
          </Text>
        </View>

        {/* Pills Row */}
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: 12,
              padding: 10,
              margin: 5,
            }}>
            <Text
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.8)',
                letterSpacing: 1,
              }}>
              Expenses So Far
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '500',
                color: '#efb9be',
                marginTop: 2,
              }}>
              <Image
                source={require('../assets/rupee_indian.png')}
                style={{
                  width: 15,
                  height: 15,
                  tintColor: '#efb9be',
                  // backgroundColor:"blue",
                  resizeMode: 'contain',
                }}
              />
              {expenseSoFar}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: 12,
              padding: 10,
              margin: 5,
            }}>
            <Text
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.8)',
                letterSpacing: 1,
              }}>
              Budget So Far
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '500',
                color: '#94ffd4',
                marginTop: 2,
              }}>
              <Image
                source={require('../assets/rupee_indian.png')}
                style={{
                  width: 15,
                  height: 15,
                  tintColor: '#94ffd4',
                  // backgroundColor:"blue",
                  resizeMode: 'contain',
                }}
              />
              {incomeSoFar}
            </Text>
          </View>
        </View>
      </View>

      <Text
        style={{
          fontSize: 16,
          fontWeight:'600',
          color: '#817f7f',
          margin: 5,
          marginTop: 15,
          paddingHorizontal: 15,
        }}>
        QUICK ACTIONS
      </Text>
      <View
        style={{
          
          paddingHorizontal: 15,
          // paddingVertical: 15,
          //  backgroundColor:"blue"
        }}>
        <View style={{flexDirection: 'row', }}>
          <CardBlack
          subText={"Set your limit"}
          bg={"#b2dfff"}
          color={"#219bf3"}
            text={'Add Budget'}
            icon={require('../assets/budget.png')}
            press={() => navigation.navigate('BudgetScreen')}
          />
          <CardBlack
          subText={"Log spending"}
          bg={"#ffd2b2"}
          color={"#ef8031"}
            text={'Add expense'}
            icon={require('../assets/property.png')}
            press={() => navigation.navigate('AddScreen')}
          />
        </View>
        <View style={{flexDirection: 'row', }}>
          <CardBlack2
          bg={"#d2ffd0"}
          color={"#60e659"}
            text={'Expense History'}
            icon={require('../assets/history.png')}
            press={() => navigation.navigate('ExpenseHistoryScreen')}
          />
        </View>
      </View>

      <Text
        style={{
          fontSize: 16,
          fontWeight:'600',
          color: '#817f7f',
          margin: 5,
          marginTop: 15,
          paddingHorizontal: 15,
        }}>
        RECENT EXPENSES
      </Text>
      <View style={{flex: 1,
      paddingHorizontal: 15,
          // paddingVertical: 15,
          }}>
        <FlatList
          data={lists}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          enableEmptySections={true}
          onRefresh={onRefresh}
          refreshing={isFetching}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardBlack: {
    marginVertical: 5,
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 23,
    padding: 16,
    borderWidth: 1,
    borderColor: '#bdbdbd',
  },
  iconStyle: {
    height: 15,
    width: 15,
    // backgroundColor:"#cdfaeb",
    // borderRadius:10,
   
    resizeMode: 'contain',
    margin:5,
  },

  cardTextBlack: {
    fontSize: 18,
    // fontWeight: '600',
    letterSpacing:0.5,
    color: '#0F172A',
    // flex: 2,
  },
});
export default MainScreen;
