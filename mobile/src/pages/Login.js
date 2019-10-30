import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Image, Text, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
//import { Platform } from '@unimodules/core'; -> Now Android also needs to enable the KeyboardAvoidingView

import api from '../services/api';
import logo from '../assets/logo.png'; 

export default function Login({ navigation }) {// we use this in react native in place of history 
  const [email, setEmail] = useState('');
  const [userTechInterest, setUserTechInterest] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {//If user is logged in, it goes directly to SpotLists screen: UserSession
        navigation.navigate('UserSession');
      }
    })
  }, []);

  async function handleSubmit() {
    const response = await api.post('/sessions', { email });
    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', userTechInterest);
    navigation.navigate('UserSession');
  };

  return (
    <KeyboardAvoidingView enabled={true} behavior="padding" style={styles.container}>
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>Insira um Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={text => setEmail(text)}//shortcut used in next example
        />

        <Text style={styles.label}>Tencologias * </Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnologias de seu interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={userTechInterest}
          onChangeText={setUserTechInterest}//react-native autmatically recognizes this as the same used for email
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Encontrar Spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 30,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }
});
