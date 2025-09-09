import React, { useContext, useState, useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, ScrollView, Text, TouchableOpacity, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './StackNavigation';
import AppStack from './AppStack'
import { AuthContext } from './AuthProvider';
import auth from '@react-native-firebase/auth';

const Route = () => {
    console.log("Routes");

    const { user } = useContext(AuthContext);
    const { setUser } = useContext(AuthContext);

    // const [user, setUser] = useState();
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) {
            setInitializing(false);
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    return (
        <NavigationContainer>
            {/* {user ? <AppStack /> : <StackNavigation />} */}
            <StackNavigation />
        </NavigationContainer>
    );
}

export default Route;