import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import I18n from '../../languages/i18n';

import {ME} from '../../gql/sign/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from '@apollo/client';
import LoadingIndicator from '../../components/LoadingIndicator';

const headImg = require('../../img/head.png');
const profileImg = require('../../img/profile_img.png');

const Profile = ({navigation}) => {
  const {data: datame, loading, refetch} = useQuery(ME, {
    fetchPolicy: 'network-only',
  });

  console.log(datame, 'ME');

  const exit = () => {
    Alert.alert(I18n.t('exit'), I18n.t('exitSure'), [
      {
        text: I18n.t('cancel'),
        style: 'cancel',
      },
      {
        text: I18n.t('ok'),
        onPress: async () => {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('number');
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        },
      },
    ]);
  };
  if (loading) return <LoadingIndicator />;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} />
          }
          showsVerticalScrollIndicator={false}
          style={styles.scroll}>
          <ImageBackground
            source={headImg}
            resizeMode="stretch"
            style={styles.headImage}
          />
          <View style={styles.wrapper}>
            <View style={styles.head}>
              <Text style={styles.headText}>{datame?.me?.email}</Text>
              <Image style={styles.img} source={profileImg}></Image>
            </View>
            <View style={styles.top}>
              <View style={styles.profileIcon}>
                <Image
                  source={require('../../img/profile_icon.png')}
                  resizeMode="stretch"
                  style={{width: 14, height: 11}}
                />
              </View>
              <View>
                <Text style={styles.title}>{I18n.t('profile')}</Text>
                <Text style={styles.aftertitle}>
                  {I18n.t('profileSettings')}
                </Text>
              </View>
            </View>
            <View style={styles.contact}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Email')}
                style={styles.userNumber}>
                <View style={styles.userNumberBox}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={styles.userNumberImg} source={profileImg} />
                    <Text style={styles.numberText}>{datame?.me?.email}</Text>
                  </View>
                  <View style={styles.arrow}>
                    <FontAwesome5
                      style={{paddingRight: 0}}
                      name="chevron-right"
                      color={'#000000'}
                      size={20}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.top}>
              <FontAwesome5
                style={{
                  backgroundColor: '#0085FF',
                  padding: 5,
                  borderRadius: 4,
                  marginRight: 8,
                }}
                name="envelope"
                color={'white'}
                size={20}
              />
              <View>
                <Text style={styles.title}>{I18n.t('information')}</Text>
                <Text style={styles.aftertitle}>
                  {I18n.t('rulesAndContacts')}
                </Text>
              </View>
            </View>
            <View style={styles.rules}>
              <TouchableOpacity
                style={styles.rulesBox}
                onPress={() => navigation.navigate('PayRules')}>
                <Text style={styles.mailText}>{I18n.t('paymentRules')}</Text>
                <View style={styles.arrow}>
                  <FontAwesome5
                    name="chevron-right"
                    color={'#000000'}
                    size={20}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.border} />
              <TouchableOpacity
                style={styles.rulesBox}
                onPress={() => navigation.navigate('Return')}>
                <Text style={styles.mailText}>{I18n.t('returnPolicy')}</Text>
                <View style={styles.arrow}>
                  <FontAwesome5
                    name="chevron-right"
                    color={'#000000'}
                    size={20}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.border} />
              <TouchableOpacity
                onPress={() => navigation.navigate('ContactInfo')}
                style={styles.ruleItem}>
                <Text style={styles.mailText}>
                  {I18n.t('contactInformation')}
                </Text>
                <View style={styles.arrow}>
                  <FontAwesome5
                    name="chevron-right"
                    color={'#000000'}
                    size={20}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.border} />
              <TouchableOpacity
                onPress={() => navigation.navigate('Settings')}
                style={styles.ruleItem}>
                <Text style={styles.mailText}>{I18n.t('settings')}</Text>
                <View style={styles.arrow}>
                  <FontAwesome5 name="cog" color={'#000000'} size={20} />
                </View>
              </TouchableOpacity>
              <View style={styles.border} />
              <TouchableOpacity onPress={exit} style={styles.ruleItem}>
                <Text style={[styles.mailText, {color: 'red'}]}>
                  {I18n.t('exit')}
                </Text>
                <View style={styles.arrow}>
                  <FontAwesome5
                    name="sign-out-alt"
                    color={'#000000'}
                    size={20}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  rulesBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
  },
  profileIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#0085FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginRight: 8,
  },
  arrow: {
    width: 37,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    marginBottom: 15,
    borderTopWidth: 1,
    borderColor: '#C4C4C4',
  },
  rules: {
    width: '100%',
    backgroundColor: '#e9e9e9',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  ruleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 16,
  },
  number: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  mailText: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 20,
    color: '#000000',
    opacity: 0.9,
    maxWidth: 223,
  },
  mailTitle: {
    fontWeight: 'bold',
    fontSize: 10,
    lineHeight: 14,
    color: '#000000',
    opacity: 0.5,
  },
  userNumberBox: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numberText: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 20,
    color: '#000000',
    opacity: 0.9,
  },
  userNumberImg: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: 8,
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  wrapper: {
    flex: 1,
    width: '100%',
    padding: 15,
    paddingTop: 50,
  },
  content: {
    flex: 1,
    width: '100%',
  },
  contact: {
    width: '100%',
    backgroundColor: '#e9e9e9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  head: {
    width: '100%',
    height: 115,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  headText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#000000',
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 20,
    color: '#000000',
  },
  aftertitle: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 17,
    color: '#000000',
    opacity: 0.5,
  },
  img: {
    width: 75,
    height: 75,
  },
  miniImg: {
    width: 40,
    height: 40,
  },
  headImage: {
    height: 233,
    width: '100%',
    position: 'absolute',
    zIndex: -1,
  },
});

export default Profile;
