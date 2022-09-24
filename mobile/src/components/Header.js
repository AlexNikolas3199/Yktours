import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import I18n from '../languages/i18n';

const headImg = require('../img/head.png');
const Header = ({navigation, title, height}) => {
  return (
    <View>
      <ImageBackground
        source={headImg}
        resizeMode="stretch"
        style={{width: '100%', height: height ? height : 233}}>
        <View style={{alignItems: 'flex-start'}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 15,
            }}
            onPress={() => navigation.goBack()}>
            <FontAwesome5 name="chevron-left" size={32} color={'#FFFFFF'} />
            <Text style={{color: '#fff', fontWeight: 'bold', marginLeft: 5}}>
              {I18n.t('back')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    fontSize: 27,
    lineHeight: 32,
    color: '#003C8D',
    marginLeft: 15,
    marginBottom: 22,
  },
});

export default Header;
