import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import I18n from '../../languages/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SIGN_IN, SIGN_UP} from '../../gql/sign/mutation';
import {useMutation} from '@apollo/client';

const headImg = require('../../img/head.png');
const downImg = require('../../img/down.png');
const Login = ({navigation}) => {
  const [number, setNumber] = useState('');

  const [sign_ups] = useMutation(SIGN_UP);
  const [sign] = useMutation(SIGN_IN);

  const onClick = () => {
    if (number.length > 10) {
      sign_ups({
        variables: {
          data: {
            email: number,
          },
        },
        onCompleted: data => {
          navigation.navigate('Сonfirmation_sign_up', {
            tokenUp: data?.signUp,
            number: number,
          });
        },
        onError: () => {
          sign({
            variables: {
              data: {
                email: number,
              },
            },
            onCompleted: data => {
              navigation.navigate('Сonfirmation_sign_in', {
                tokenIn: data?.signIn?.token,
                number: number,
              });
            },
            onError: message => {
              console.log(message);
            },
          });
        },
      });
    } else {
      Alert.alert(I18n.t('wrongEmail'), I18n.t('enterEmailCorrect'));
    }
  };

  const [q, setq] = useState(true);
  const [imgq, setImgq] = useState(require('../../img/ru.png'));
  useEffect(async () => {
    const LanChecker = await AsyncStorage.getItem('language');
    if (LanChecker === 'en') {
      I18n.locale = 'en';
      setImgq(require('../../img/en.png'));
      setq(false);
    } else {
      I18n.locale = 'ru';
      setImgq(require('../../img/ru.png'));
      setq(true);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false}>
        <View style={styles.flexbox}>
          <ImageBackground
            source={headImg}
            resizeMode="stretch"
            style={styles.headImage}>
            <TouchableOpacity
              onPress={async () => {
                if (q) {
                  I18n.locale = 'en';
                  await AsyncStorage.setItem('language', 'en');
                  setImgq(require('../../img/en.png'));
                  setq(!q);
                } else {
                  I18n.locale = 'ru';
                  await AsyncStorage.setItem('language', 'ru');
                  setImgq(require('../../img/ru.png'));
                  setq(!q);
                }
              }}>
              <Image
                source={imgq}
                style={{width: 48, height: 32, marginLeft: 15, marginTop: 32}}
              />
            </TouchableOpacity>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              <Text style={styles.title}>{I18n.t('signIn')}</Text>
            </View>
          </ImageBackground>
          <View style={styles.wrapper}>
            <Text style={styles.inputTitle}>{I18n.t('phoneNumber')}</Text>
            <TextInput
              value={number}
              style={styles.input}
              placeholder="order@mail.com"
              onChangeText={text => setNumber(text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.bottom}>
            <ImageBackground
              source={downImg}
              resizeMode="stretch"
              style={styles.downImage}>
              <View style={styles.bottomFlex}>
                <TouchableOpacity onPress={onClick}>
                  <View style={styles.button}>
                    <Text style={styles.button__text}>{I18n.t('enter')}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    marginHorizontal: 15,
  },
  flexbox: {
    // paddingTop
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginRight: 20,
  },
  button__text: {
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 22,
    color: '#000000',
    opacity: 0.8,
  },
  bottomFlex: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    fontSize: 27,
    lineHeight: 32,
    color: '#003C8D',
    marginLeft: 15,
    marginBottom: 22,
  },
  inputTitle: {
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 18,
    color: '#000000',
  },
  input: {
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    marginVertical: 12,
    fontSize: Platform.OS == 'ios' ? 17 : 15,
    paddingVertical: Platform.OS == 'ios' ? 8 : 5,
    paddingHorizontal: 8,
  },
  headImage: {
    height: 233,
    width: '100%',
  },
  downImage: {
    width: '100%',
    height: 95,
    justifyContent: 'flex-end',
  },
  bottom: {
    width: '100%',
    justifyContent: 'flex-end',
  },
});

export default Login;
