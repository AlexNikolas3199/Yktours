import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const PassengerRegBox = ({onPress, marginBtm, text, textSelect}) => {
  const styles = StyleSheet.create({
    box: {
      flexDirection: 'row',
      marginLeft: 8,
      marginRight: 8,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: marginBtm,
    },
    boxSelect: {
      fontWeight: 'bold',
      fontSize: 15,
      lineHeight: 22,
      color: '#2F80ED',
    },
    boxText: {
      fontWeight: 'normal',
      fontSize: 15,
      lineHeight: 22,
      color: '#000000',
    },
  });
  return (
    <View style={styles.box}>
      <Text style={styles.boxText}>{text}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.boxSelect}>{textSelect}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PassengerRegBox;
