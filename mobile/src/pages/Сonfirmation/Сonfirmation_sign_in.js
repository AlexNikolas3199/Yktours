import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import I18n from '../../languages/i18n';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {SIGN_IN_VERIFY} from '../../gql/sign/mutation';
import {useMutation} from '@apollo/client';
import Header from '../../components/Header';

const downImg = require('../../img/down.png');

const Сonfirmation = ({navigation, route}) => {
  const CELL_COUNT = 6;

  const [value, setValue] = useState('');

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [sign_in_verify] = useMutation(SIGN_IN_VERIFY, {
    onError: message => {
      console.log(message);
      Alert.alert(I18n.t('incorrectСode'), I18n.t('incorrectСode2'));
    },
    onCompleted: data => {
      AsyncStorage.setItem('token', data?.signInVerify?.token);
      navigation.reset({
        index: 0,
        routes: [{name: 'MyTabs'}],
      });
    },
  });

  const onClick = () => {
    sign_in_verify({
      variables: {
        token: route.params.tokenIn,
        code: value,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexbox}>
        <Header navigation={navigation} title={I18n.t('confirmation')} />
        <View style={styles.wrapper}>
          <Text style={styles.text}>{route.params.number}</Text>
          <View style={styles.inputFlex}>
            <View style={styles.root}>
              <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
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
            </View>
          </View>
        </View>
        <View>
          <View style={styles.bottom}>
            <ImageBackground
              source={downImg}
              resizeMode="stretch"
              style={styles.downImage}>
              <TouchableOpacity onPress={onClick}>
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
  text: {
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
  link: {
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 22,
    color: '#000000',
    opacity: 0.5,
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
  headImage: {
    height: 233,
    width: '100%',
    justifyContent: 'flex-end',
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
