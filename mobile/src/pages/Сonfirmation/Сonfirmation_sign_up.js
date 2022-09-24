import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Modal from 'react-native-modal';
import I18n from '../../languages/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SIGN_UP_VERIFY} from '../../gql/sign/mutation';
import {useMutation} from '@apollo/client';
import Header from '../../components/Header';
import MainButton from '../../components/MainButton';
import Circle from '../../components/Circle';

const downImg = require('../../img/down.png');

const Сonfirmation = ({navigation, route}) => {
  const CELL_COUNT = 6;

  const [value, setValue] = useState('');
  const [modalVisible, setModalVisible] = useState(true);

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [sign_up_verify] = useMutation(SIGN_UP_VERIFY, {
    onError: message => {
      console.log(message);
      Alert.alert(I18n.t('incorrectСode'), I18n.t('incorrectСode2'));
    },
    onCompleted: async data => {
      await AsyncStorage.setItem('token', data?.signUpVerify?.token);
      navigation.reset({
        index: 0,
        routes: [{name: 'MyTabs'}],
      });
    },
  });

  const onClicke = () => {
    sign_up_verify({
      variables: {
        token: route.params.tokenUp,
        code: value,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal isVisible={modalVisible} backdropOpacity={0.5} useNativeDriver>
        <View style={styles.modal}>
          <ScrollView style={styles.wrapper}>
            <View style={{paddingTop: 15}} />
            <Text style={styles.text}>{I18n.t('paymentRules0')}</Text>
            <Text style={styles.text}>{I18n.t('paymentRules1')}</Text>
            <View style={styles.circleBox}>
              <Circle />
              <Text style={styles.text}>{I18n.t('paymentRules2')}</Text>
            </View>
            <View style={styles.circleBox}>
              <Circle />
              <Text style={styles.text}>{I18n.t('paymentRules3')}</Text>
            </View>
            <View style={styles.circleBox}>
              <Circle />
              <Text style={styles.text}>{I18n.t('paymentRules4')}</Text>
            </View>
            <View style={styles.circleBox}>
              <Circle />
              <Text style={styles.text}>{I18n.t('paymentRules5')}</Text>
            </View>
            <Text style={styles.text}>{I18n.t('paymentRules6')}</Text>
          </ScrollView>
          <View style={styles.buttons}>
            <MainButton
              title={I18n.t('ok')}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.flexbox}>
        <Header navigation={navigation} title={I18n.t('confirmation')} />
        <View style={styles.wrapper1}>
          <Text style={styles.emailText}>{route.params.number}</Text>
          <View style={styles.inputFlex}>
            <SafeAreaView style={styles.root}>
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            </SafeAreaView>
          </View>
        </View>
        <View>
          <View style={styles.bottom}>
            <ImageBackground
              source={downImg}
              resizeMode="stretch"
              style={styles.downImage}>
              <TouchableOpacity onPress={onClicke}>
                <View style={styles.button}>
                  <Text style={styles.button__text}>{I18n.t('complete')}</Text>
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
  container: {
    flex: 1,
  },
  flexbox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  wrapper1: {
    marginLeft: 15,
  },
  modal: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
  },
  buttons: {
    paddingVertical: 7.5,
    paddingHorizontal: 15,
  },
  circleBox: {flexDirection: 'row', paddingRight: 15, paddingBottom: 5},
  text: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 20,
    color: '#000000',
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginRight: 20,
    marginBottom: 16,
  },
  button__text: {
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 22,
    color: '#000000',
    opacity: 0.8,
  },
  emailText: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 23,
    color: '#000000',
    paddingBottom: 25,
  },
  inputFlex: {
    height: 57,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 15,
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
  downImage: {
    width: '100%',
    height: 95,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  bottom: {
    width: '100%',
    height: 233,
    justifyContent: 'flex-end',
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  root: {flex: 1},
});

export default Сonfirmation;
