import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import I18n from '../../languages/i18n';
import CircleText from '../../components/CircleText';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MainButton from '../../components/MainButton';
import TodayDate from '../../components/TodayDate';
const width = Dimensions.get('window').width;

const Description = ({navigation, route}) => {
  const routeTur = route.params.routeTur;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgWrapper}>
        <ImageBackground
          style={styles.imgHeader}
          imageStyle={{resizeMode: 'cover'}}
          source={{uri: routeTur.image}}
          resizeMode="stretch">
          <TouchableOpacity
            style={styles.goBack}
            onPress={() => navigation.goBack()}>
            <FontAwesome5 name="chevron-left" size={32} color={'#FFFFFF'} />
            <Text style={styles.textBack}>{I18n.t('back')}</Text>
          </TouchableOpacity>
          <View style={styles.darkLayer}>
            <View style={styles.top}>
              {routeTur[I18n.t('route')].map((f, index) => (
                <CircleText fs={18} key={`${index}`} t={f} />
              ))}
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.info}>
        <ScrollView>
          <View style={{paddingHorizontal: 15, paddingTop: 15}}>
            <Text>
              {I18n.t('vessel') + ': '}
              {routeTur.ship === 1 ? I18n.t('misha') : I18n.t('bedni')}
            </Text>
            <Text>
              {I18n.t('dateGo')}: {TodayDate(new Date(routeTur.date))}
            </Text>
            <Text>
              {I18n.t('duration')}: {routeTur.duration + I18n.t('hour')}
            </Text>
            <Text style={styles.h2}>{I18n.t('description')}</Text>
            <View style={{marginBottom: 15}}>
              <Text>{routeTur[I18n.t('desc')]}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{marginHorizontal: 15, marginBottom: 7.5}}>
        <MainButton
          title={I18n.t('choose')}
          onPress={() => navigation.navigate('TopTabs', {id: routeTur.id})}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgWrapper: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: 'hidden',
  },
  imgHeader: {
    width: '100%',
    height: width * 0.6,
  },
  goBack: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    position: 'absolute',
    zIndex: 1,
  },
  textBack: {color: '#fff', fontWeight: 'bold', marginLeft: 5},
  darkLayer: {
    backgroundColor: 'rgba(0,0,0,0.22)',
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  info: {
    marginHorizontal: 15,
    marginVertical: 7.5,
    borderRadius: 10,
    backgroundColor: '#e9e9e9',
    flex: 1,
  },
  h2: {fontSize: 18, paddingTop: 15, paddingBottom: 7.5},
});

export default Description;
