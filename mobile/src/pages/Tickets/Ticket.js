import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import I18n from '../../languages/i18n';
import CircleText from '../../components/CircleText';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useMutation} from '@apollo/client';
import {DELETE_ONE_TICKET, REFUND_INPUT} from '../../gql/ticket/mutation';
import client from '../../utils/apollo';
import DarkLoadingIndicator from '../../components/DarkLoadingIndicator';
import CodeInputModal from '../../components/CodeInputModal';
import TodayDate from '../../components/TodayDate';
import {THEME} from '../../utils/theme';
const width = Dimensions.get('window').width;

const Ticket = ({navigation, route}) => {
  const ticketData = route?.params?.ticketData;
  const [modalVisible, setModalVisible] = useState(false);
  const [code, setCode] = useState(0);
  const [inCode, setInCode] = useState(0);
  const [func, setFunc] = useState(() => {});
  const [isLoading, setIsLoading] = useState(false);
  const toggleModal = () => setModalVisible(!modalVisible);
  const inputEl = useRef(null);

  //удаление билета
  const [deleteTicket] = useMutation(DELETE_ONE_TICKET, {
    onCompleted: async () => {
      await client.refetchQueries({
        include: 'active',
      });
      navigation.goBack();
    },
  });

  //возврат билета
  const [refund] = useMutation(REFUND_INPUT, {
    onCompleted: data => {
      if (data.refundInput.errorCode === '0') {
        Alert.alert(I18n.t('ticketReturned'), I18n.t('ticketReturned2'));
        deleteTicket({variables: {where: {orderId: ticketData?.orderId}}});
      } else Alert.alert(I18n.t('error'), I18n.t('error2'));
    },
  });

  const doRefund = amount => {
    refund({
      variables: {
        data: {
          orderId: ticketData?.orderId,
          amount: amount,
        },
      },
    });
  };

  //вернуть процент
  const doChoose = procent =>
    Alert.alert(
      I18n.t('returnTicket'),
      I18n.t('returnTicket1') +
        ticketData?.amount / 100 +
        ' ₽. ' +
        I18n.t('returnTicket2'),
      [
        {
          text: I18n.t('cancel'),
          style: 'cancel',
        },
        {
          text: I18n.t('ok'),
          onPress: () => {
            setCode(Math.round(Math.random() * 10000));
            setModalVisible(true);
            inputEl.current.focus();
            setFunc(() => () => doRefund(ticketData?.amount * procent));
          },
        },
      ],
    );

  //вернуть без процента
  const return0 = () =>
    Alert.alert(I18n.t('returnTicket'), I18n.t('returnTicket2'), [
      {
        text: I18n.t('cancel'),
        style: 'cancel',
      },
      {
        text: I18n.t('ok'),
        onPress: () => {
          setCode(Math.round(Math.random() * 10000));
          setModalVisible(true);
          setFunc(
            () => () =>
              deleteTicket({
                variables: {where: {orderId: ticketData?.orderId}},
              }),
          );
        },
      },
    ]);

  const onReturnTicket = () => {
    const days = Math.floor(
      (new Date(ticketData?.route.date).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24),
    );
    if (days > 15) doChoose(1);
    if (days > 10 && days <= 15) doChoose(0.8);
    if (days > 5 && days <= 10) doChoose(0.4);
    if (days === 5) doChoose(0.2);
    if (days < 5) return0();
  };

  const onSubmit = () => {
    if (code == inCode) {
      setModalVisible(!modalVisible);
      setIsLoading(!isLoading);
      func();
    } else Alert.alert(I18n.t('IncorrectСode'), I18n.t('incorrectСode2'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <DarkLoadingIndicator isVisible={isLoading} />
      <CodeInputModal
        modalVisible={modalVisible}
        code={code}
        setInCode={setInCode}
        inputEl={inputEl}
        toggleModal={toggleModal}
        onSubmit={onSubmit}
      />
      <View style={styles.imgWrapper}>
        <ImageBackground
          style={styles.imgHeader}
          imageStyle={{resizeMode: 'cover'}}
          source={{uri: ticketData?.route?.image}}
          resizeMode="stretch">
          <TouchableOpacity
            style={styles.goBack}
            onPress={() => navigation.goBack()}>
            <FontAwesome5 name="chevron-left" size={32} color={'#FFFFFF'} />
            <Text style={styles.textBack}>{I18n.t('back')}</Text>
          </TouchableOpacity>
          <View style={styles.darkLayer}>
            <View style={styles.top}>
              {ticketData?.route[I18n.t('route')].map((f, index) => (
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
              {I18n.t('room')}: {ticketData?.room}
            </Text>
            <Text>
              {I18n.t('dateGo')}: {TodayDate(new Date(route.params.date))}
            </Text>
            <Text>
              {I18n.t('duration')}: {route.params.time}
            </Text>
            <Text style={styles.h2}>{I18n.t('passengers')}</Text>
            <View>
              {ticketData?.passengers?.map(item => (
                <View key={item.id} style={styles.passenger}>
                  <Text>
                    {item?.surname + ' ' + item?.name + ' ' + item?.patronymic}
                  </Text>
                  <Text>
                    {I18n.t('dateOfBirth') +
                      ': ' +
                      (I18n.locale == 'en'
                        ? new Date(item.dateOfBirth).toLocaleDateString()
                        : TodayDate(new Date(item.dateOfBirth), true))}
                  </Text>
                  <Text>
                    {I18n.t(item.documentType) + ': ' + item.documentNumber}
                  </Text>
                  {item.food && (
                    <Text>{I18n.t('food') + ': ' + item.food}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        {Date.now() < Date.parse(ticketData?.route?.date) && (
          <View style={styles.dangerZone}>
            <TouchableOpacity
              onPress={onReturnTicket}
              style={{paddingVertical: 15}}>
              <Text style={{color: 'red'}}>{I18n.t('returnTicket')}</Text>
            </TouchableOpacity>
          </View>
        )}
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
    margin: 15,
    borderRadius: 10,
    backgroundColor: '#e9e9e9',
    flex: 1,
  },
  h2: {fontSize: 18, paddingTop: 15, paddingBottom: 7.5},
  passenger: {
    paddingVertical: 7.5,
    borderTopWidth: 1,
    borderColor: THEME.GREY_COLOR,
  },
  dangerZone: {
    marginHorizontal: 15,
    borderTopWidth: 1,
    borderColor: 'gray',
  },
});

export default Ticket;
