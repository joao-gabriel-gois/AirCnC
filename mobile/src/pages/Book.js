import React, { useState } from 'react';
import { SafeAreaView, Alert, Text, Image, StyleSheet, AsyncStorage } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function Book({ navigation }) {
  const [date, setDate] = useState('');
  const id = navigation.getParam('id');
  async function handleSubmit() {
    const user_id = await AsyncStorage.getItem('user');
    api.post(`/spots/${id}/bookings`, {
      date
    }, {
      headers: { user_id }
    });
    Alert.alert('Solicitação de reserva enviada com sucesso.');
    navigation.navigate('UserSession');
  };
  function handleCancel() {
    navigation.navigate('UserSession');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo}/>
      <Text style={styles.label}>DATA DE INTERESSE*</Text>
      <TextInput
        style={styles.input}
        placeholder="Qual data você quer reservar?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 32
  },
  container: {
    margin: 30,
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
  cancelButton: {
    backgroundColor: '#CCC',
    marginTop: 10
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }
});