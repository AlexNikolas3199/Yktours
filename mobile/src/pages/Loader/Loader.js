import React, {useEffect} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from '../../languages/i18n';
const Loader = ({navigation}) => {
  let token;
  const getToken = async () => {
    token = await AsyncStorage.getItem('token');
  };
  getToken();
  const checkIsFirstStart = () => {
    if (!token) navigation.replace('Login');
    else {
      navigation.replace('MyTabs');
    }
  };
  setTimeout(checkIsFirstStart, 1000);
  useEffect(async () => {
    const language = await AsyncStorage.getItem('language');
    if (language) I18n.locale = language;
  }, []);
  return (
    <SafeAreaView style={styles.wrapper}>
      <Image style={styles.imageBack} source={require('../../img/head.png')} />
      <Text style={{fontSize: 45, color: '#003C8D', fontWeight: 'bold'}}>
        Yktours
      </Text>
      <View style={styles.imageDown}>
        <Image
          style={{resizeMode: 'stretch', width: '100%', height: '33%'}}
          source={require('../../img/down.png')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBack: {
    flex: 1,
    width: '100%',
  },
  imageDown: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
});

export default Loader;
