import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {THEME} from '../utils/theme';

const InputRange = ({personType, title, onMinus, onPlus}) => {
  return (
    <View style={{marginVertical: 7.5}}>
      <Text style={styles.inputTitle}>{title}</Text>
      <View style={styles.input}>
        <TouchableOpacity
          style={[styles.box, styles.boxLeft]}
          onPress={onMinus}>
          <FontAwesome5 name="minus" size={15} color={THEME.MAIN_COLOR} />
        </TouchableOpacity>
        <View style={styles.number}>
          <Text style={styles.numberText}>{personType}</Text>
        </View>
        <TouchableOpacity
          style={[styles.box, styles.boxRight]}
          onPress={onPlus}>
          <FontAwesome5 name="plus" size={15} color={THEME.MAIN_COLOR} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputTitle: {
    fontSize: 15,
    color: '#000',
    marginBottom: 5,
  },
  numberText: {
    fontSize: 15,
    color: '#000',
  },
  input: {
    flexDirection: 'row',
  },
  box: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: THEME.MAIN_COLOR,
  },
  boxLeft: {
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  boxRight: {
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  number: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: THEME.GREY_COLOR,
    backgroundColor: '#fff',
  },
});

export default InputRange;
