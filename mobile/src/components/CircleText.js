import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const circleImg = require('../img/circle.png');

const CircleText = ({t, fs}) => {
  return (
    <View style={styles.flex}>
      <View style={styles.circleWrapper}>
        <Image source={circleImg} style={styles.circle} />
      </View>
      <Text style={{...styles.text, fontSize: fs ? fs : 15}}>{t}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
  },
  circle: {
    height: 8,
    width: 8,
  },
  circleWrapper: {
    justifyContent: 'center',
    marginRight: 8,
  },
  text: {
    fontWeight: '500',
    lineHeight: 20,
    color: '#FFFFFF',
  },
});
export default CircleText;
