import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {THEME} from '../utils/theme';
import I18n from '../languages/i18n';

const ContactButton = ({cont, meCont, onChange, isChange}) => {
  return (
    <TouchableOpacity
      onPress={onChange}
      activeOpacity={isChange(cont, meCont) ? 0.7 : 1}
      title="Change">
      <View
        style={[styles.button, {opacity: isChange(cont, meCont) ? 1 : 0.7}]}>
        <Text style={styles.button__text}>{I18n.t('apply')}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: THEME.MAIN_COLOR,
    borderRadius: 8,
    marginBottom: 15,
  },
  button__text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 22,
    color: '#fff',
    opacity: 0.8,
  },
});
export default ContactButton;
