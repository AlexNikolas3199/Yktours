import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import I18n from '../../languages/i18n';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {THEME} from '../../utils/theme';

const Settings = ({navigation}) => {
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
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Header navigation={navigation} title={I18n.t('settings')} />
        <View style={styles.wrapper}>
          <Text style={styles.text}>{I18n.t('changeLan')}</Text>
          <TouchableOpacity
            style={styles.headImage}
            onPress={async () => {
              if (q) {
                I18n.locale = 'en';
                AsyncStorage.setItem('language', 'en');
                setImgq(require('../../img/en.png'));
                setq(!q);
              } else {
                I18n.locale = 'ru';
                AsyncStorage.setItem('language', 'ru');
                setImgq(require('../../img/ru.png'));
                setq(!q);
              }
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'MyTabs',
                    params: {screen: I18n.t('profile')},
                  },
                ],
              });
            }}>
            <Image source={imgq} style={{width: 48, height: 32}} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    fontSize: 27,
    lineHeight: 32,
    color: '#003C8D',
    marginLeft: 15,
    marginBottom: 22,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  headImage: {
    backgroundColor: THEME.MAIN_COLOR,
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export default Settings;
