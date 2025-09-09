import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children, navigation }) => {

    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password, navigation, id) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password).then(() => navigation.navigate('MainScreen'));
                    }
                    catch (e) {
                        alert(e);
                        console.log(e);
                    }
                },
                register: async (email, password, navigation) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password).then(() => navigation.navigate('LoginScreen'));
                    }
                    catch (e) {
                        alert(e);
                        console.log(e);
                    }
                },
                logout: async (navigation) => {
                    try {
                        await auth().signOut().then(() => navigation.push('LoginScreen'));
                    }
                    catch (e) {
                        alert(e);
                        console.log(e);
                    }
                }
            }}
        >{children}</AuthContext.Provider>
    );
}