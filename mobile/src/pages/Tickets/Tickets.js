import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import I18n from '../../languages/i18n';
import CardTickets from '../../components/CardTickets';
import {useLazyQuery, useQuery} from '@apollo/client';
import {FIND_MANY_TICKET} from '../../gql/ticket/query';
import {ME} from '../../gql/sign/query';
import LoadingIndicator from '../../components/LoadingIndicator';
import {THEME} from '../../utils/theme';

const Tickets = ({navigation}) => {
  const [phone, setPhone] = useState(null);
  const [getTickets, {loading, data, refetch}] = useLazyQuery(
    FIND_MANY_TICKET,
    {
      fetchPolicy: 'network-only',
      variables: {
        where: {user: {email: {in: phone}}},
      },
    },
  );
  const {loading: loadingMe} = useQuery(ME, {
    fetchPolicy: 'network-only',
    onCompleted: ({me}) => {
      setPhone(me?.email);
      getTickets();
    },
  });
  const GetDate = date => new Date(date).getTime();
  if (loading || loadingMe) return <LoadingIndicator />;

  const manyTickets = data?.findManyTicket?.sort((a, b) => {
    if (GetDate(a.route.date) > GetDate(b.route.date)) return 1;
    if (GetDate(a.route.date) < GetDate(b.route.date)) return -1;
    return 0;
  });
  manyTickets?.sort((a) => {
    if (Date.now() > Date.parse(a?.route?.date)) return 1;
    if (Date.now() < Date.parse(a?.route?.date)) return -1;
    return 0;
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshing={loading}
        onRefresh={refetch}
        style={styles.tours}
        data={manyTickets}
        keyExtractor={item => item?.id}
        renderItem={({item}) => (
          <View style={styles.cardWrapper}>
            <CardTickets
              navigation={navigation}
              ticketData={item}
              users={item?.passengers?.length}
              areas={item?.route[I18n.t('route')]}
              date={item?.route?.date}
              room={item?.room}
              time={item?.route?.duration + I18n.t('hour')}
              img={item?.route?.image}
            />
          </View>
        )}
        ListFooterComponent={() => <View style={{marginBottom: 15}} />}
      />
      {data?.findManyTicket?.length !== 0 ? null : (
        <View style={styles.noContent}>
          <Text>{I18n.t('noTickets')}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('MyTabs', {screen: I18n.t('tours')})
            }>
            <Text style={styles.button__text}>{I18n.t('toTours')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => refetch()} style={styles.button}>
            <Text style={styles.button__text}>{I18n.t('update')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tours: {flex: 1, paddingTop: 7.5, paddingHorizontal: 15},
  cardWrapper: {
    marginVertical: 7.5,
    width: '100%',
  },
  noContent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: THEME.MAIN_COLOR,
    borderRadius: 80,
  },
  button__text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
});

export default Tickets;
