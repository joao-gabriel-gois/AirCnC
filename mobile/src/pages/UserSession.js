import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image,  AsyncStorage} from 'react-native';
import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function UserSession() {
  const [userTechInterest, setUserTechInterest] = useState([]);

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
        {userTechInterest.map(technology  => <SpotList key={technology}  tech={technology} />)}
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