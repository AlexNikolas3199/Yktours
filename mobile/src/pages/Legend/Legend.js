import React from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import MainButton from '../../components/MainButton';
import I18n from '../../languages/i18n';
import {rooms} from '../../utils/rooms';

const Legend = ({navigation, route}) => {
  const routeTur = route.params.routeTur;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.box}>
        <Text style={{margin: 15, fontWeight: 'bold'}}>
          {I18n.t('vessel') + ': '}
          {routeTur.ship === 1 ? I18n.t('misha') : I18n.t('bedni')}
        </Text>
        {rooms.map(item => {
          return (routeTur.ship === 1 && item.color !== '#27E3C2') ||
            (routeTur.ship === 2 && item.color !== '#F1C84C') ? (
            <View key={item.color} style={styles.wrapper}>
              <View style={[styles.round, {backgroundColor: item.color}]} />
              <View style={styles.def}>
                <Text style={styles.h}>{I18n.t(item.h)}</Text>
                <Text style={styles.h}>
                  {item.indx >= 0 ? routeTur.Pricing[item.indx] + ' ₽' : null}
                </Text>
                {item.p ? <Text style={styles.p}>*{I18n.t(item.p)}</Text> : null}
              </View>
            </View>
          ) : null;
        })}
      </ScrollView>
      <View style={{paddingHorizontal: 15, paddingVertical: 7.5}}>
        <MainButton
          title={I18n.t('Understood')}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  box: {
    paddingVertical: 15,
  },
  wrapper: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  def: {
    flex: 1,
  },
  round: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 15,
    backgroundColor: 'gray',
  },
  h: {fontWeight: 'bold', fontSize: 16},
});

export default Legend;
