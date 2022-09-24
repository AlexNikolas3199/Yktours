import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import MainButton from './MainButton';
import I18n from '../languages/i18n';
import {THEME} from '../utils/theme';
const CodeInputModal = ({
  modalVisible,
  code = '',
  setInCode,
  inputEl,
  toggleModal,
  onSubmit,
}) => {
  return (
    <Modal
      isVisible={modalVisible}
      backdropOpacity={0.5}
      useNativeDriver={true}>
      <View style={styles.modal}>
        <Text style={styles.modText}>{I18n.t('getCode') + code}</Text>
        <TextInput
          onChangeText={p => setInCode(p)}
          style={styles.input}
          ref={inputEl}
          keyboardType="numeric"
        />
        <View style={styles.buttons}>
          <MainButton
            title={I18n.t('cancel')}
            myTextStyle={{width: 60}}
            onPress={toggleModal}
          />
          <MainButton
            isGray
            title={I18n.t('ok')}
            onPress={onSubmit}
            myStyle={{marginLeft: 15}}
            myTextStyle={{width: 60}}
          />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#fff',
    borderRadius: 2,
    marginHorizontal: 5,
  },
  modText: {
    fontSize: 18,
    padding: 15,
  },
  input: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: THEME.GREY_COLOR,
    marginHorizontal: 15,
  },
  buttons: {
    paddingVertical: 7.5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
});
export default CodeInputModal;
