import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, ScrollView, StyleSheet, Image, Alert, AsyncStorage} from 'react-native';
import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function UserSession() {
  const [userTechInterest, setUserTechInterest] = useState([]);

	useEffect(() => {
		AsyncStorage.getItem('user').then(user_id => {
			const socket = socketio('http://192.168.1.121:3333', {
				query: {user_id}
			});

			socket.on('booking_response', booking => {
				Alert.alert(`Sua reserva em ${booking.spot.company} no dia ${booking.date} foi ${booking.approved ? 'aprovada' : 'rejeitada'}`);
			});
		})
	}, []);

  useEffect(() => {
	 AsyncStorage.getItem('techs').then(storagedUserTechInterest => {
		const userTechInterestArray = storagedUserTechInterest.split(',').map(tech => tech.trim());
		setUserTechInterest(userTechInterestArray);// in this component, from the first launch, userTechInterest is an array
	 });
  }, []);

  return (
	 <SafeAreaView style={styles.container}>
		<Image style={styles.logo} source={logo} />
		<ScrollView>
		  {userTechInterest.map(technology => <SpotList key={technology}  tech={technology} />)}
		</ScrollView>
	 </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
	 marginTop: 24,
	 flex: 1,
  },
  logo: {
	 height: 32,
	 resizeMode: 'contain',
	 alignSelf: 'center',
	 marginTop: 10 
  },
})