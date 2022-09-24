import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import I18n from '../../languages/i18n';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/Header';

const ContactInfo = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Header navigation={navigation} title={I18n.t('contactInformation')} />
        <View style={styles.wrapper}>
          <Text style={styles.text}>{I18n.t('contactInfoText')}</Text>
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
    marginHorizontal: 15,
    paddingBottom: 15,
  },
  headImage: {
    flex: 1,
  },
  text: {
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 20,
    color: '#000000',
  },
});

export default ContactInfo;
