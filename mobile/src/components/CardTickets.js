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
import CircleText from './CircleText';
import months from '../utils/months';
const Card = ({
  navigation,
  ticketData,
  img,
  areas,
  room,
  users,
  date,
  time,
}) => {
  const myDate =
    new Date(date).getDate() + ' ' + I18n.t(months[new Date(date).getMonth()]);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Ticket', {ticketData, date, time})}>
      <ImageBackground
        style={{
          height: 192,
          borderRadius: 6,
          overflow: 'hidden',
          opacity: Date.now() > Date.parse(date) ? 0.7 : 1,
        }}
        source={{uri: img}}
        resizeMode="cover">
        <View style={styles.darkLayer}>
          <View style={styles.top}>
            {areas.map((f, index) => (
              <CircleText key={`${index}`} t={f} />
            ))}
            <Text style={[styles.text, {marginTop: 5}]}>
              {I18n.t('room')}: {room}
            </Text>
            <View style={styles.rightTop}>
              {Date.now() < Date.parse(date) ? (
                <>
                  <Text style={styles.text}>{users}</Text>
                  <FontAwesome5
                    style={{marginLeft: 6}}
                    name="male"
                    color={'white'}
                    size={20}
                  />
                </>
              ) : (
                <FontAwesome5
                  style={{marginLeft: 6}}
                  name="check-circle"
                  color={'white'}
                  size={30}
                />
              )}
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.right}>
              <Text style={styles.text}>{myDate}</Text>
            </View>
            <View style={styles.left}>
              <Text style={styles.text}>{time}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
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
  box: {
    flex: 1,
    opacity: 0.7,
    padding: 8,
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
