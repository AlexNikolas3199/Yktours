import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import PassengerRegBox from '../../components/PassengerRegBox';
import I18n from '../../languages/i18n';
import Header from '../../components/Header';
import MainButton from '../../components/MainButton';
import InputRange from '../../components/InputRange';
import {FIND_MANY_ROUTE} from '../../gql/tours/query';
import {useQuery} from '@apollo/client';
import LoadingIndicator from '../../components/LoadingIndicator';

const PassengerReg = ({navigation, route}) => {
  const [count, setCount] = useState(0);
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [children, setChildren] = useState(0);
  const [isBooked, setIsBooked] = useState(true);
  const {id, price, deck, number, max} = route.params;

  const {data, loading} = useQuery(FIND_MANY_ROUTE, {
    fetchPolicy: 'network-only',
    variables: {
      where: {id: {equals: id}},
    },
  });

  const routeTur = data?.findManyRoute[0];
  useEffect(() => {
    if (!loading) {
      const isBookedR = routeTur?.ticket.find(
        item => item.room === `${number}`,
      );
      const isBookedAdmin = routeTur?.bookedRoom.find(
        item => item.room === `${number}`,
      );
      if (isBookedR || isBookedAdmin) {
        Alert.alert(I18n.t('error'), I18n.t('error2'), [
          {
            text: 'OK',
            onPress: () => {
              navigation.reset({index: 0, routes: [{name: 'MyTabs'}]});
            },
          },
        ]);
      } else setIsBooked(false);
    }
  }, [loading]);

  const addCount = w => {
    if (count < max) {
      if (w === 'adult') setAdult(adult + 1);
      if (w === 'child') setChild(child + 1);
      setCount(count + 1);
    }
  };

  const removeCount = w => {
    if (count > 0) {
      if (w === 'adult') {
        if (adult > 0) {
          setAdult(adult - 1);
          setCount(count - 1);
        }
      } else if (w === 'child') {
        if (child > 0) {
          setChild(child - 1);
          setCount(count - 1);
        }
      }
    }
  };

  if (loading || isBooked) return <LoadingIndicator />;

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} height={120} />
      <View style={styles.wrapper}>
        <ScrollView>
          <Text style={styles.pretitle}>{I18n.t('passengerReg')}</Text>
          <Text style={styles.title}>{I18n.t('room')}</Text>
          <PassengerRegBox
            text={I18n.t('deckAndCabin')}
            textSelect={deck + ', ' + number}
            marginBtm={8}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>{I18n.t('passengers')}</Text>
            <Text>{'*' + I18n.t('capacity') + ': ' + max}</Text>
          </View>
          <InputRange
            personType={adult}
            onMinus={() => removeCount('adult')}
            onPlus={() => addCount('adult')}
            title={I18n.t('adult')}
          />
          <InputRange
            personType={child}
            onMinus={() => removeCount('child')}
            onPlus={() => addCount('child')}
            title={I18n.t('child')}
          />
          <InputRange
            personType={children}
            onMinus={() => (children !== 0 ? setChildren(children - 1) : null)}
            onPlus={() => setChildren(children + 1)}
            title={I18n.t('children')}
          />
        </ScrollView>
        <View style={{paddingVertical: 7.5}}>
          <MainButton
            onPress={() =>
              adult &&
              navigation.navigate('Passenger', {
                adult,
                child,
                children,
                id,
                price,
                food: routeTur.food,
                foodKids: routeTur.foodKids,
                number,
              })
            }
            title={I18n.t('nextStep')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  pretitle: {
    fontWeight: 'bold',
    fontSize: 27,
    lineHeight: 39,
    color: '#003C8D',
    marginBottom: 19,
  },
  title: {
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 29,
    color: '#000000',
    marginBottom: 4,
  },
});

export default PassengerReg;
