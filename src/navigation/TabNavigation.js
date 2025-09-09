import React, { useContext, useState } from 'react';
import { View, Image, StyleSheet, SafeAreaView, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Dimensions, FlatList, Modal } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
// import TabNavigation from '../navigation/TabNavigation';
import SignUpScreen from '../screens/SignUpScreen';
import AddScreen from '../screens/AddScreen';
import BudgetScreen from '../screens/BudgetScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ExpenseHistoryScreen from '../screens/ExpenseHistoryScreen';
import MainScreen from '../screens/MainScreen';
import { AuthContext } from '../navigation/AuthProvider';

const Tab = createBottomTabNavigator();

const TabNavigation = ({ navigation, route }) => {


    console.log("Tab Navigation");
    return (

        <Tab.Navigator
            screenOptions={{
                activeTintColor: 'black',
                headerShown: false,
                tabBarActiveTintColor: "black",
            }}
        >
            <Tab.Screen name="MainScreen" component={MainScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={
                                focused
                                    ? require('../assets/home.png')
                                    : require('../assets/home_grey.png')
                            }
                            style={{
                                width: size,
                                height: size,
                            }}
                        />
                    ),
                }}

            />

            <Tab.Screen name="Add Expense" component={AddScreen}
                options={{
                    tabBarLabel: 'Add Expense',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={
                                focused
                                    ? require('../assets/property.png')
                                    : require('../assets/property_grey.png')
                            }
                            style={{
                                width: size,
                                height: size,
                                // borderRadius: size,
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen name="BudgetScreen" component={BudgetScreen}
                options={{
                    tabBarLabel: 'Add Budget',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={
                                focused
                                    ? require('../assets/budget.png')
                                    : require('../assets/budget_grey.png')
                            }
                            style={{
                                width: size,
                                height: size,
                                // borderRadius: size,
                            }}
                        />
                    ),
                }}
            />
            <Tab.Screen name="ExpenseHistoryScreen" component={ExpenseHistoryScreen}

                options={{
                    tabBarLabel: 'History',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={
                                focused
                                    ? require('../assets/history.png')
                                    : require('../assets/history_grey.png')
                            }
                            style={{
                                width: size,
                                height: size,
                                // borderRadius: size,
                            }}
                        />
                    ),
                }}
            />
            {/* 
            <Tab.Screen name="HelpScreen" component={HelpScreen}
                options={{
                    tabBarLabel: 'help',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={
                                focused
                                    ? require('../assets/Profile.png')
                                    : require('../assets/bill-pay-card.png')
                            }
                            style={{
                                width: size,
                                height: size,
                                borderRadius: size,
                            }}
                        />
                    ),
                }}
            /> */}
        </Tab.Navigator>
    )
}
export default TabNavigation;

