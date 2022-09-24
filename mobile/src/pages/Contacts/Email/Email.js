import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import I18n from '../../../languages/i18n';
import {SEND_EMAIL_VERIFY, UPDATE_ONE_USER} from '../../../gql/sign/mutation';
import {ME} from '../../../gql/sign/query';
import {useMutation, useQuery} from '@apollo/client';
import Header from '../../../components/Header';
import DarkLoadingIndicator from '../../../components/DarkLoadingIndicator';
import {THEME} from '../../../utils/theme';
import ContactButton from '../../../components/ContactButton';
import EmailVerifyButton from '../../../components/EmailVerifyButton';
import LoadingIndicator from '../../../components/LoadingIndicator';
const downImg = require('../../../img/down.png');
const {height} = Dimensions.get('window');

const Email = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {data, loading} = useQuery(ME, {
    fetchPolicy: 'network-only',
    onCompleted: ({me}) => {
      setEmail(me?.email);
    },
  });
  const [sendEmailVerify] = useMutation(SEND_EMAIL_VERIFY, {
    onError: ({message}) => {
      setIsLoading(false);
      console.log(message);
      Alert.alert(I18n.t('error'), I18n.t('error2'));
    },
  });

  const [updateOneUser] = useMutation(UPDATE_ONE_USER, {
    onCompleted: () => {
      setIsLoading(false);
      Alert.alert(I18n.t('changeContacts'), I18n.t('savedChanges'));
    },
    onError: ({message}) => {
      setIsLoading(false);
      console.log(message);
      Alert.alert(I18n.t('error'), I18n.t('error2'));
    },
  });

  const isChange = (cont, meCont) => {
    if (cont !== data?.me[meCont] && cont !== '') {
      return true;
    } else return false;
  };

  const onChange = (cont, meCont) => {
    if (isChange(cont, meCont)) {
      Alert.alert(I18n.t('changeContacts'), I18n.t('saveChanges'), [
        {
          text: I18n.t('cancel'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setIsLoading(true);
            sendEmailVerify({
              variables: {
                data: {
                  id: data?.me?.id,
                  email,
                },
              },
            });
            updateOneUser({
              variables: {
                data: {
                  [meCont]: {
                    set: cont,
                  },
                  emailVerification: {set: false},
                },
                where: {
                  id: data?.me?.id,
                },
              },
            });
          },
        },
      ]);
    }
  };

  const sendVerify = () => {
    setIsLoading(true);
    sendEmailVerify({
      variables: {
        data: {
          id: data?.me?.id,
          email,
        },
      },
      onCompleted: () => {
        setIsLoading(false);
      },
    });
  };

  useEffect(() => {
    if (data?.me?.emailVerification == false) {
      setIsLoading(true);
      sendEmailVerify({
        variables: {
          data: {
            id: data?.me?.id,
            email,
          },
        },
        onCompleted: () => {
          setIsLoading(false);
        },
      });
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <DarkLoadingIndicator isVisible={isLoading} />
        <View style={styles.flexbox}>
          <View>
            <Header navigation={navigation} title={I18n.t('Contacts')} />

            {loading ? (
              <LoadingIndicator />
            ) : (
              <View style={styles.wrapper}>
                <Text style={styles.inputTitle}>{I18n.t('enterEmail')}</Text>
                {!data?.me?.emailVerification && data?.me?.email ? (
                  <Text style={{color: THEME.DANGER_COLOR, fontSize: 12}}>
                    *{I18n.t('verify')}
                  </Text>
                ) : null}
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    defaultValue={data?.me?.email}
                    onChangeText={text => setEmail(text)}
                    keyboardType="email-address"
                    autoCompleteType="email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="email@example.com"
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  }}>
                  {data?.me?.emailVerification ? (
                    <View></View>
                  ) : (
                    <EmailVerifyButton
                      onChange={() => sendVerify(email, 'email')}
                      cont={email}
                      meCont="email"
                    />
                  )}
                  <ContactButton
                    onChange={() => onChange(email, 'email')}
                    isChange={isChange}
                    cont={email}
                    meCont="email"
                  />
                </View>
              </View>
            )}
          </View>
          <View>
            <ImageBackground
              source={downImg}
              resizeMode="stretch"
              style={styles.downImage}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 18,
    color: '#000000',
  },
  container: {
    flex: 1,
  },
  flexbox: {
    height: height / 1.05,
    flex: 1,
    justifyContent: 'space-between',
  },
  wrapper: {
    paddingHorizontal: 15,
  },
  inputWrapper: {
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    marginTop: 7.5,
    marginBottom: 15,
  },
  input: {
    color: 'black',
    fontSize: 15,
    padding: 7.5,
  },
  downImage: {
    height: 95,
  },
});

export default Email;
