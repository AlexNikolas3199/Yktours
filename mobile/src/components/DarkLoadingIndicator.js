import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {THEME} from '../utils/theme';
import Modal from 'react-native-modal';

const DarkLoadingIndicator = ({isVisible}) => {
  return (
    <Modal
      style={styles.container}
      isVisible={isVisible}
      backdropOpacity={0.5}
      useNativeDriver={true}>
      <View style={styles.white} >
        <ActivityIndicator size="large" color={THEME.MAIN_COLOR} />
      </View>
    </Modal>
  );
};

export default DarkLoadingIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  white:{
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5
  }
});
