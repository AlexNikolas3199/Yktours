import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
const PlaceBtn = ({
  color,
  number,
  navigation,
  isBorderBt,
  isNone,
  deck,
  isBooked,
  routeTur,
}) => {
  return (
    <TouchableOpacity
      onPress={
        isNone || isBooked
          ? null
          : () =>
              navigation.navigate('CabinInfo', {
                number,
                deck,
                color,
                routeTur,
              })
      }
      activeOpacity={isNone ? 0 : isBooked ? 1 : 0.5}
      style={{
        backgroundColor: isBooked ? 'gray' : color,
        height: 30,
        width: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderBottomWidth: isBorderBt ? 1 : 0,
        opacity: isNone ? 0 : 1,
      }}>
      <Text style={styles.button__text}>{number}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2F80ED',
  },
  button__text: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 17,
    color: '#FFFFFF',
  },
});

export {PlaceBtn};
