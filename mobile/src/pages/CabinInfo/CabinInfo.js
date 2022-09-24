import {useQuery} from '@apollo/client';
import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  Dimensions,
  Alert,
  SafeAreaView,
} from 'react-native';
import MainButton from '../../components/MainButton';
import {ME} from '../../gql/sign/query';
import I18n from '../../languages/i18n';
import {rooms} from '../../utils/rooms';
const width = Dimensions.get('window').width;

const img308 = [
  require('../../img/cabins/luxe3081.jpg'),
  require('../../img/cabins/luxe308.jpg'),
];
const CabinInfo = ({navigation, route}) => {
  const {color, deck, number, routeTur} = route.params;
  const cabin = rooms.find(item => item.color === color);
  let images = cabin.imgs;
  if (number === 308) images = [...img308, ...images];

  const {data, loading} = useQuery(ME, {
    fetchPolicy: 'network-only',
  });

  const navhandler = () => {
    if (!loading) {
      if (data?.me?.emailVerification) {
        navigation.navigate('PassengerReg', {
          number,
          deck,
          id: routeTur.id,
          price: routeTur.Pricing[cabin.indx],
          max: cabin.max,
        });
      } else Alert.alert(I18n.t('confirmation'), I18n.t('confirmContact'));
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <ScrollView style={styles.box}>
          {cabin.imgs
            ? images.map(item => (
                <View
                  style={[styles.imageWrapper, {borderColor: cabin.color}]}
                  key={item}>
                  <Image style={styles.img} source={item} />
                </View>
              ))
            : null}
        </ScrollView>
        <View style={[styles.buttonWrap, {borderColor: cabin.color}]}>
          <View style={styles.wrapper}>
            <View style={[styles.round, {backgroundColor: cabin.color}]} />
            <View style={styles.def}>
              <Text style={styles.h}>{I18n.t(cabin.h)}</Text>
              <Text style={styles.h}>
                <Text style={styles.fontNorm}>{I18n.t('cabin')}</Text>
                {': ' + number}
              </Text>
              <Text style={styles.h}>
                <Text style={styles.fontNorm}>{I18n.t('deck')}</Text>
                {': ' + deck}
              </Text>
              <Text style={styles.h}>
                <Text style={styles.fontNorm}>{I18n.t('capacity')}</Text>
                {': ' + cabin.max}
              </Text>
              <Text style={styles.h}>
                <Text style={styles.fontNorm}>{I18n.t('price')}</Text>
                {': ' + routeTur.Pricing[cabin.indx] + ' ₽'}
              </Text>
              {cabin.p ? (
                <Text style={styles.p}>*{I18n.t(cabin.p)}</Text>
              ) : null}
            </View>
          </View>
          <MainButton onPress={navhandler} title={I18n.t('choose')} />
          <MainButton
            isGray
            title={I18n.t('cancel')}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    borderTopWidth: 2,
    height: width - 120,
  },
  img: {resizeMode: 'cover', flex: 1, width: '100%'},
  box: {
    paddingVertical: 0,
  },
  wrapper: {
    flexDirection: 'row',
    marginVertical: 7.5,
  },
  def: {
    flex: 1,
  },
  round: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 15,
    backgroundColor: 'gray',
  },
  h: {fontWeight: 'bold', fontSize: 16},
  fontNorm: {fontWeight: 'normal'},
  buttonWrap: {
    paddingHorizontal: 15,
    paddingVertical: 7.5,
    borderTopWidth: 2,
  },
});

export default CabinInfo;
