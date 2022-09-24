import React from 'react';
import {StyleSheet, View, ScrollView, ImageBackground} from 'react-native';
import {PlaceBtn} from './PlaceBtn';
import I18n from '../languages/i18n';

const BotPlace = ({navigation, route}) => {
  const routeTur = route.params.routeTur;
  const GetPlaceBtns = (a, b) => {
    let content = [];
    for (let i = a; i <= b; i++) {
      content.push(
        <PlaceBtn
          key={`${i}`}
          number={i}
          deck={I18n.t('bot')}
          isBorderBt={i === 112 || i === 113 || i === 137 || i === 132}
          isNone={i === 134 || i === 136}
          isBooked={
            routeTur.ticket.find(item => item.room === `${i}`) ||
            routeTur.bookedRoom.find(item => item.room === `${i}`)
          }
          navigation={navigation}
          color={
            routeTur.ship === 2 && (i === 110 || i === 112)
              ? '#27E3C2'
              : i > 105 && i < 114
              ? '#7FFF6A'
              : i > 113
              ? '#ffa500'
              : '#eec1ee'
          }
          routeTur={routeTur}
        />,
      );
      if (i === 113)
        content.push(<View key={'z'} style={{width: 120, paddingTop: 51}} />);
    }
    return content;
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
      <View style={styles.box}>
        <ImageBackground
          style={styles.bg}
          source={require('../img/botdeck.png')}
          resizeMode="stretch">
          <View style={styles.ship}>
            <View style={styles.shipWrap}>{GetPlaceBtns(100, 113)}</View>
            <View
              style={[
                styles.shipWrap,
                {marginHorizontal: -5, marginLeft: -5.7},
              ]}>
              {GetPlaceBtns(114, 137)}
            </View>
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
    width: 143,
    height: 1245,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  ship: {
    marginTop: 238,
    paddingRight: 8,
    paddingLeft: 6.22,
    width: 122,
    flex: 1,
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  shipWrap: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default BotPlace;
