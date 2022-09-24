import React from 'react';
import {StyleSheet, View, ScrollView, ImageBackground} from 'react-native';
import I18n from '../languages/i18n';
import {PlaceBtn} from './PlaceBtn';

const TopPlace = ({navigation, route}) => {
  const routeTur = route.params.routeTur;
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      <View style={styles.box}>
        <ImageBackground
          style={styles.bg}
          source={require('../img/sundeck.png')}
          resizeMode="stretch">
          <View style={styles.abs}>
            <PlaceBtn
              number={308}
              deck={I18n.t('top')}
              color="#FF5757"
              isBorderBt
              isBooked={
                routeTur.ticket.find(item => item.room === `${308}`) ||
                routeTur.bookedRoom.find(item => item.room === `${308}`)
              }
              navigation={navigation}
              routeTur={routeTur}
            />
          </View>
        </ImageBackground>
      </View>
      <View style={{marginTop: 15}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
  },
  bg: {
    width: 175,
    height: 980.53,
    resizeMode: 'contain',
  },
  abs: {
    position: 'absolute',
    top: '31.7%',
    right: 32,
    backgroundColor: '#fff',
  },
});

export default TopPlace;
