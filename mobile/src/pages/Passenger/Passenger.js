import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  Alert,
  Linking,
} from 'react-native';
import I18n from '../../languages/i18n';
import MainButton from '../../components/MainButton';
import Header from '../../components/Header';
import PassengerInputs from '../../components/PassengerInputs';
import {useQuery, useMutation} from '@apollo/client';
import {ME} from '../../gql/sign/query';
import {CREATE_ONE_PURCHASE} from '../../gql/ticket/mutation';
import client from '../../utils/apollo';
import DarkLoadingIndicator from '../../components/DarkLoadingIndicator';
import LoadingIndicator from '../../components/LoadingIndicator';
import {FIND_MANY_ROUTE} from '../../gql/tours/query';

const Passenger = ({navigation, route}) => {
  const {adult, child, children, id, number, price, food, foodKids} =
    route.params;

  // создание пустых форм
  const content = [];
  for (let i = 0; i < adult + child + children; i++) content.push({id: `${i}`});

  const [isLoading, setIsLoading] = useState(false);
  const [passengers, setPassengers] = useState(content);
  const [totalPrice, setTotalPrice] = useState(price);
  const [isError, setIsError] = useState(false);
  const [isBooked, setIsBooked] = useState(true);

  //получение данных о пользователе
  const {data: datame} = useQuery(ME, {
    fetchPolicy: 'network-only',
  });

  const {data, loading} = useQuery(FIND_MANY_ROUTE, {
    fetchPolicy: 'network-only',
    variables: {
      where: {id: {equals: id}},
    },
  });
  const checkRoomBooked = () => {
    const routeTur = data?.findManyRoute[0];
    const isBookedR = routeTur?.ticket.find(item => item.room === `${number}`);
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
  };

  useEffect(() => {
    if (!loading) checkRoomBooked();
  }, [loading]);

  const refreshQueries = async () =>
    await client.refetchQueries({
      include: 'active',
    });

  // функция создания purchase
  const [create_purchase] = useMutation(CREATE_ONE_PURCHASE, {
    onCompleted: data => {
      Linking.openURL(data.createOnePurchase.url);
      refreshQueries();
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'MyTabs',
            params: {screen: I18n.t('tickets')},
          },
        ],
      });
    },
  });
  // вызов функции create_purchase
  const payHandler = () => {
    //проверка на ошибки ввода
    if (isError) {
      Alert.alert(I18n.t('correctData'), I18n.t('correctData2'));
      return null;
    }
    //проверка заполения форм
    for (let item of passengers) {
      if (!item.isReady) {
        Alert.alert(I18n.t('alert1'), I18n.t('alert2'));
        return null;
      }
    }
    //создание заказа
    setIsLoading(true);
    const guys = [...passengers];
    guys.forEach(item => {
      delete item.isReady;
      delete item.id;
    });
    create_purchase({
      variables: {
        data: {
          amount: `${totalPrice * 100}`,
          ticketInfo: {
            room: `${number}`,
            passengers: guys,
            userId: datame?.me.id,
            routeId: id,
          },
        },
      },
    });
  };

  if (loading || isBooked) return <LoadingIndicator />;
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.wrapper}>
        <View style={{position: 'absolute', width: '100%', zIndex: 1}}>
          <Header navigation={navigation} height={120} />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={passengers}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({index}) => (
            <PassengerInputs
              id={index}
              foods={food}
              foodKids={foodKids}
              setPassengers={setPassengers}
              setTotalPrice={setTotalPrice}
              price={totalPrice}
              passengers={passengers}
              setIsError={setIsError}
              adult={adult}
              child={child}
            />
          )}
          ListHeaderComponent={() => <View style={{height: 120}} />}
          ListFooterComponent={() => (
            <View style={styles.button}>
              <MainButton
                onPress={payHandler}
                title={I18n.t('pay') + ` ${totalPrice} ₽`}
              />
            </View>
          )}
        />
        <DarkLoadingIndicator isVisible={isLoading} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  container: {
    marginVertical: 20,
    marginHorizontal: 7.5,
    paddingHorizontal: 7.5,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    elevation: 15,
  },
  button: {
    padding: 7.5,
    marginHorizontal: 7.5,
    marginBottom: 15,
    shadowColor: '#000',
    elevation: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});

export default Passenger;
