import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import CircleText from './CircleText';
import I18n from '../languages/i18n';
import months from '../utils/months';
const Card = ({onPress, areas, price, date, time, img, isBig}) => {
  return (
    <View style={{marginRight: isBig ? 0 : 15}}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <ImageBackground
          style={{
            width: isBig ? '100%' : 220,
            height: isBig ? 192 : 140,
            borderRadius: 6,
            overflow: 'hidden',
          }}
          source={{uri: img}}
          resizeMode="cover">
          <View style={styles.darkLayer}>
            <View style={styles.top}>
              {areas.map((f, index) => (
                <CircleText key={`${index}`} t={f} />
              ))}
              <View style={styles.rightTop}>
                <Text style={styles.text}>{price}</Text>
              </View>
            </View>
            <View style={styles.bottom}>
              <View style={styles.right}>
                <Text style={styles.text}>
                  {new Date(date).getDate() +
                    ' ' +
                    I18n.t(months[new Date(date).getMonth()])}
                </Text>
              </View>
              <View style={styles.left}>
                <Text style={styles.text}>{time}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  darkLayer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    padding: 8,
  },
  text: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  right: {
    position: 'relative',
    top: 20,
    right: 0,
  },
  rightTop: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
  },
  left: {
    alignItems: 'flex-end',
  },
});

export default Card;
