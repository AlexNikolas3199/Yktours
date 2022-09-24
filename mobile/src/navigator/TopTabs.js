import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TopPlace from '../components/TopPlace';
import MidPlace from '../components/MidPlace';
import BotPlace from '../components/BotPlace';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import I18n from '../languages/i18n';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Header from '../components/Header';
import {useQuery} from '@apollo/client';
import {FIND_MANY_ROUTE} from '../gql/tours/query';
import LoadingIndicator from '../components/LoadingIndicator';
const Tab = createMaterialTopTabNavigator();

const TopTabs = ({navigation, route}) => {
  const {data, loading} = useQuery(FIND_MANY_ROUTE, {
    fetchPolicy: 'network-only',
    variables: {
      where: {id: {equals: route.params.id}},
    },
  });

  const routeTur = data?.findManyRoute[0];

  if (loading) return <LoadingIndicator />;
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} height={120} />
      <View style={styles.wrapper}>
        <Text style={styles.pretitle}>{I18n.t('placeSelection')}</Text>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Legend', {routeTur})}
            style={styles.legend}>
            <FontAwesome5 name="question" color={'#000'} size={20} />
          </TouchableOpacity>
          <Tab.Navigator>
            <Tab.Screen
              name={I18n.t('bot')}
              initialParams={{routeTur}}
              component={BotPlace}
            />
            <Tab.Screen
              name={I18n.t('mid')}
              initialParams={{routeTur}}
              component={MidPlace}
            />
            <Tab.Screen
              name={I18n.t('top')}
              initialParams={{routeTur}}
              component={TopPlace}
            />
          </Tab.Navigator>
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
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  legend: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 80,
    left: 15,
    zIndex: 1,
    shadowColor: '#000',
    elevation: 4,
  },
  pretitle: {
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 27,
    lineHeight: 39,
    color: '#003C8D',
    marginBottom: 15,
  },
});

export default TopTabs;
