import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  View,
  RefreshControl,
} from 'react-native';
import Card from '../../components/Card';
import I18n from '../../languages/i18n';
import {useQuery} from '@apollo/client';
import {FIND_MANY_ROUTE1} from '../../gql/tours/query';
import LoadingIndicator from '../../components/LoadingIndicator';
const nowDate = new Date();

const Home = ({navigation}) => {
  const {data, loading, refetch} = useQuery(FIND_MANY_ROUTE1, {
    fetchPolicy: 'network-only',
    variables: {
      where: {date: {gt: nowDate.toISOString()}},
    },
  });
  const GetDate = date => new Date(date).getTime();

  if (loading) return <LoadingIndicator />;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }>
        <Text style={[styles.title, {paddingTop: 15}]}>
          {I18n.t('newTours')}
        </Text>
        <FlatList
          style={styles.tours}
          contentContainerStyle={{alignItems: 'center'}}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            ...data?.findManyRoute.sort((a, b) => {
              if (GetDate(a.createdAt) < GetDate(b.createdAt)) return 1;
              if (GetDate(a.createdAt) > GetDate(b.createdAt)) return -1;
              return 0;
            }),
          ]}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Card
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
          )}
          ListFooterComponent={() => <View style={{marginRight: 15}} />}
        />
        <Text style={styles.title}>{I18n.t('comingTours')}</Text>
        <View style={{paddingHorizontal: 15}}>
          {[
            ...data?.findManyRoute.sort((a, b) => {
              if (GetDate(a.date) > GetDate(b.date)) return 1;
              if (GetDate(a.date) < GetDate(b.date)) return -1;
              return 0;
            }),
          ].map(item => (
            <View style={{marginBottom: 15}} key={item?.id}>
              <Card
                isBig
                price={I18n.t('from') + item?.Pricing[3] + ' ₽'}
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
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  tours: {
    flexDirection: 'row',
    marginBottom: 18,
    paddingLeft: 15,
  },
  title: {
    fontWeight: 'bold',
    paddingLeft: 15,
    fontSize: 20,
    lineHeight: 23,
    color: '#2F80ED',
    marginBottom: 10,
  },
});

export default Home;
