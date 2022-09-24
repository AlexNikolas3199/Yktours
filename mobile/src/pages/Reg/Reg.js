import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import I18n from '../../languages/i18n';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const headImg = require('../../img/head.png');
const downImg = require('../../img/down.png');

const Reg = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexbox}>
        <View>
          <ImageBackground source={headImg} resizeMode='stretch' style={styles.headImage}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <FontAwesome5 style={{ marginLeft: 15, marginTop: 20 }} name='less-than' size={32} color={'#FFFFFF'} />
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Text style={styles.title}>{I18n.t('registration')}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.inputTitle}>{I18n.t('phoneNumber')}</Text>
          <View style={styles.inputWrapper}>
            <TextInput style={styles.input} placeholder='+7 999 999 99 99' keyboardType="numeric"></TextInput>
          </View>
        </View>
        <View>
          <View style={styles.bottom}>
            <ImageBackground source={downImg} resizeMode='stretch' style={styles.downImage}>
              <TouchableOpacity onPress={() => navigation.navigate('Confirmation')}>
                <View style={styles.button}>
                  <Text style={styles.button__text}>{I18n.t('nextStep')}</Text>
                </View>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottom: {
    width: '100%',
    height: 233,
    justifyContent: 'flex-end',
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginRight: 20,
    marginBottom: 16
  },
  button__text: {
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 22,
    color: '#000000',
    opacity: 0.8
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    fontSize: 27,
    lineHeight: 32,
    color: '#003C8D',
    marginLeft: 15,
    marginBottom: 22
  },
  inputTitle: {
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 18,
    color: '#000000'
  },
  container: {
    flex: 1,
  },
  flexbox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  wrapper: {
    marginLeft: 15,
  },
  inputWrapper: {
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    height: 32,
    width: '95%',
    marginBottom: 24
  },
  input: {
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 18,
    opacity: 0.2,
    padding: 0,
    margin: 0,
    borderWidth: 0,
    paddingLeft: 8,
  },
  headImage: {
    height: 233,
    width: '100%',
  },
  downImage: {
    width: '100%',
    height: 95,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
});

export default Reg;