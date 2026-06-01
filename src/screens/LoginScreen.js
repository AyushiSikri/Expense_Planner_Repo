import React, {useContext, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {AuthContext} from '../navigation/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <SafeAreaView style={{flex: 1,
        backgroundColor: '#E2E8F0',
        }}>
    <ScrollView
      style={{
        paddingHorizontal: 18,
        paddingVertical: 15,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
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
        <Image
          source={require('../assets/plannerLogoNew.png')}
          style={{
            width: 150,
            height: 50,
            // backgroundColor:"blue",
            // resizeMode: 'contain',
          }}
        />
      </View>

      <View
        style={{
          //  marginHorizontal: "5%",
          marginTop: '8%',
          
        }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: '700',
            // marginHorizontal: '2%',
            marginBottom: '5%',
            // alignSelf: 'center',
            //  backgroundColor:"yellow",
            
            color: '#0F172A',
          }}>
          Login
        </Text>
        <TextInput
          label="Username"
          theme={{
            colors: {
              placeholder: '#64748B',
            },
            roundness: 10,
          }}
          left={
            <TextInput.Icon
              color={'#0F172A'}
              name={require('../assets/email.png')}
            />
          }
          mode="outlined"
          onChangeText={text => setEmail(text)}
          outlineColor="#64748B"
          activeOutlineColor="#0F172A"
          style={{marginBottom: '3%', backgroundColor:"#E2E8F0"}}
          autoCorrect={false}
        />
        <TextInput
          label="Password"
          theme={{
            colors: {
              placeholder: '#64748B',
            },
            roundness: 10,
          }}
          left={
            <TextInput.Icon
              color={'#0F172A'}
              name={require('../assets/key.png')}
            />
          }
          onChangeText={text => setPassword(text)}
          mode="outlined"
          outlineColor="#64748B"
          // error
          activeOutlineColor="#0F172A"
          style={{marginBottom: '8%', backgroundColor:"#E2E8F0"}}
          secureTextEntry
          autoCorrect={false}
        />

        <TouchableOpacity
          style={{borderRadius: 23, backgroundColor: '#10B981'}}
          onPress={() => login(email, password, navigation)}>
          <Text
            style={{
              textAlign: 'center',
              color: '#0F172A',
              fontSize: 22,
              padding: 20,
              fontWeight: '600',
            }}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.push('SignUpScreen')}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
              color: '#64748B',
              marginTop: '5%',
            }}>
            Don't have an account? Create here
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};
export default LoginScreen;
