import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import I18n from '../../languages/i18n';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/Header';
import Circle from '../../components/Circle';

const PayRules = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Header navigation={navigation} title={I18n.t('paymentRulesEtc')} />
        <View style={styles.wrapper}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: 15,
    paddingBottom: 15,
  },
  circleBox: {flexDirection: 'row', paddingRight: 15, paddingBottom: 5},
  text: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 20,
    color: '#000000',
  },
});

export default PayRules;
