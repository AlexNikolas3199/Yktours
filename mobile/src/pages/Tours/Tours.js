import React from 'react';
import {SafeAreaView, StyleSheet, View, FlatList} from 'react-native';
import Card from '../../components/Card';
import I18n from '../../languages/i18n';
import {useQuery} from '@apollo/client';
import {FIND_MANY_ROUTE1} from '../../gql/tours/query';
import LoadingIndicator from '../../components/LoadingIndicator';
const nowDate = new Date();

const Tickets = ({navigation}) => {
  const GetDate = date => new Date(date).getTime();
  const {data, loading, refetch} = useQuery(FIND_MANY_ROUTE1, {
    fetchPolicy: 'network-only',
    variables: {
      where: {date: {gt: nowDate.toISOString()}},
    },
  });
  if (loading) return <LoadingIndicator />;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshing={loading}
        onRefresh={refetch}
        style={styles.tours}
        data={[
          ...data.findManyRoute.sort((a, b) => {
            if (GetDate(a.date) > GetDate(b.date)) return 1;
            if (GetDate(a.date) < GetDate(b.date)) return -1;
            return 0;
          }),
        ]}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.cardWrapper}>
            <Card
              price={I18n.t('from') + item?.Pricing[3] + ' ₽'}
              isBig
              onPress={() =>
                navigation.navigate('Description', {
                  routeTur: item,
                })
              }
              areas={item?.[I18n.t('route')]}
              date={item?.date}
              time={item?.duration + I18n.t('hour')}
              img={item?.image}
            />
          </View>
        )}
        ListFooterComponent={() => <View style={{marginBottom: 15}} />}
      />
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
});

export default Tickets;
