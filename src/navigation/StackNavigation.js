import React from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import TabNavigation from '../navigation/TabNavigation';
import SignUpScreen from '../screens/SignUpScreen';
import AddScreen from '../screens/AddScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ExpenseHistoryScreen from '../screens/ExpenseHistoryScreen';
import MainScreen from '../screens/MainScreen';
import BudgetScreen from '../screens/BudgetScreen';

const Stack = createStackNavigator();

const StackNavigation = () => {
    // console.log("In Stack navigation");
    return (

        <Stack.Navigator initialRouteName="HomeScreen"
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='MainScreen' component={MainScreen} />
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
            {/* <Stack.Screen name='TabNavigation' component={TabNavigation} /> */}
            <Stack.Screen name='AddScreen' component={AddScreen} />
            <Stack.Screen name='ExpenseHistoryScreen' component={ExpenseHistoryScreen} />
            <Stack.Screen name='CategoriesScreen' component={CategoriesScreen} />
            <Stack.Screen name='BudgetScreen' component={BudgetScreen} />


        </Stack.Navigator>
    );
}

export default StackNavigation

