import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import Home from '../pages/Home/Home'
import Tours from '../pages/Tours/Tours'
import Tickets from '../pages/Tickets/Tickets'
import Profile from '../pages/Profile/Profile'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import I18n from '../languages/i18n';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={I18n.t('home')} component={Home} options={{ tabBarIcon: ({ color, size }) => <FontAwesome5 name='home' size={size} color={color} /> }} />
      <Tab.Screen name={I18n.t('tours')} component={Tours} options={{ tabBarIcon: ({ color, size }) => <FontAwesome5 name='flag-checkered' size={size} color={color} /> }} />
      <Tab.Screen name={I18n.t('tickets')} component={Tickets} options={{ tabBarIcon: ({ color, size }) => <FontAwesome5 name='money-bill' size={size} color={color} /> }} />
      <Tab.Screen name={I18n.t('profile')} component={Profile} options={{ tabBarIcon: ({ color, size }) => <FontAwesome5 name='user' size={size} color={color} /> }} />
    </Tab.Navigator>
  );
}

export default MyTabs