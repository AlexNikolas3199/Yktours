import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {THEME} from '../utils/theme';
import Modal from 'react-native-modal';
import I18n from '../languages/i18n';
import DatePicker from 'react-native-date-picker';
import TodayDate from './TodayDate';
const PickerWrap = ({selectedData, setSelected, data, date}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!modalVisible);
  return (
    <View style={styles.pickerWrapper}>
      <TouchableOpacity onPress={toggleModal} style={styles.picker}>
        <Text style={styles.value}>
          {date
            ? I18n.locale == 'en'
              ? selectedData.toLocaleDateString()
              : TodayDate(selectedData, true)
            : selectedData.name}
        </Text>
        <View style={styles.arrow}>
          <FontAwesome5
            name="chevron-down"
            size={20}
            color={THEME.MAIN_COLOR}
          />
        </View>
      </TouchableOpacity>
      {date ? (
        <DatePicker
          modal
          open={modalVisible}
          date={selectedData}
          mode="date"
          locale={I18n.t('lang')}
          maximumDate={new Date()}
          title={I18n.t('selectDate')}
          confirmText={I18n.t('ok')}
          cancelText={I18n.t('cancel')}
          onConfirm={date => {
            setSelected(date);
            toggleModal();
          }}
          onCancel={toggleModal}
        />
      ) : (
        <Modal
          isVisible={modalVisible}
          backdropOpacity={0.5}
          useNativeDriver={true}
          onBackdropPress={toggleModal}
          onBackButtonPress={toggleModal}>
          <View style={{backgroundColor: '#fff', borderRadius: 3}}>
            {data.map((item, index) => (
              <View key={item.name}>
                <TouchableOpacity
                  style={{padding: 20}}
                  onPress={() => {
                    toggleModal();
                    setSelected(item);
                  }}>
                  <Text
                    style={{
                      fontWeight:
                        selectedData.name === item.name ? 'bold' : 'normal',
                    }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
                {index !== data.length - 1 && <View style={styles.border} />}
              </View>
            ))}
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pickerWrapper: {
    borderRadius: 4,
    justifyContent: 'center',
  },
  value: {fontSize: 15, color: '#000', width: '93%'},
  border: {
    borderBottomWidth: 1,
    marginHorizontal: 20,
    borderColor: '#ddd',
  },
  arrow: {
    width: '7%',
    alignItems: 'flex-end',
  },
  picker: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E5E5E5',
    opacity: 0.5,
    padding: 7.5,
    borderRadius: 7,
  },
});

export default PickerWrap;
