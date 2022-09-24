import React from 'react';
import {StyleSheet, View, ScrollView, ImageBackground} from 'react-native';
import I18n from '../languages/i18n';
import {PlaceBtn} from './PlaceBtn';

const MidPlace = ({navigation, route}) => {
  const routeTur = route.params.routeTur;
  const SpecialColor = routeTur.ship === 1 ? '#F1C84C' : '#7FFF6A';
  const GetPlaceBtns = (a, b) => {
    let content = [];
    for (let i = a; i <= b; i++) {
      content.push(
        <PlaceBtn
          key={`${i}`}
          number={i}
          deck={I18n.t('mid')}
          color={
            routeTur.ship === 1 && i === 209
              ? '#8BF8FF'
              : routeTur.ship === 2 && i === 209
              ? '#27E3C2'
              : i > 201 && i < 211
              ? SpecialColor
              : i > 210
              ? '#8BF8FF'
              : '#FF5757'
          }
          isBorderBt={i === 209 || i === 210 || i === 234 || i === 233}
          isBooked={
            routeTur.ticket.find(item => item.room === `${i}`) ||
            routeTur.bookedRoom.find(item => item.room === `${i}`)
          }
          navigation={navigation}
          routeTur={routeTur}
        />,
      );
      if (i === 210)
        content.push(<View key={2100} style={{width: 120, paddingTop: 30}} />);
    }
    return content;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      <View style={styles.box}>
        <ImageBackground
          style={styles.bg}
          source={require('../img/middeck.png')}
          resizeMode="stretch">
          <View style={styles.ship}>
            <View style={styles.shipWrap1}>{GetPlaceBtns(200, 210)}</View>
            <View style={styles.shipWrap2}>{GetPlaceBtns(211, 234)}</View>
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
    width: 155,
    height: 1110,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  ship: {
    marginTop: 260,
    marginRight: 2,
    width: 122,
    flex: 1,
    paddingBottom: 50,
  },
  shipWrap1: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 11,
  },
  shipWrap2: {
    paddingHorizontal: 11,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default MidPlace;
