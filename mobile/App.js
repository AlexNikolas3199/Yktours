import React from 'react';
import Login from './src/pages/Login/Login';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Reg from './src/pages/Reg/Reg';
import Сonfirmation_sign_in from './src/pages/Сonfirmation/Сonfirmation_sign_in';
import Сonfirmation_sign_up from './src/pages/Сonfirmation/Сonfirmation_sign_up';
import MyTabs from './src/navigator/MyTabs';
import PassengerReg from './src/pages/PassengerReg/PassengerReg';
import Passenger from './src/pages/Passenger/Passenger';
import TopTabs from './src/navigator/TopTabs';
import PayRules from './src/pages/PayRules/PayRules';
import Return from './src/pages/Return/Return';
import ContactInfo from './src/pages/ContactInfo/ContactInfo';
import Email from './src/pages/Contacts/Email/Email';

import {ApolloProvider} from '@apollo/client';
import client from './src/utils/apollo';
import Legend from './src/pages/Legend/Legend';
import Loader from './src/pages/Loader/Loader';
import CabinInfo from './src/pages/CabinInfo/CabinInfo';
import Ticket from './src/pages/Tickets/Ticket';
import Settings from './src/pages/Settings/Settings';
import Description from './src/pages/CabinInfo/Description';
const Stack = createStackNavigator();
const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer style={{flex: 1}}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Loader" component={Loader} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Reg" component={Reg} />
          <Stack.Screen
            name="Сonfirmation_sign_in"
            component={Сonfirmation_sign_in}
          />
          <Stack.Screen
            name="Сonfirmation_sign_up"
            component={Сonfirmation_sign_up}
          />
          <Stack.Screen name="MyTabs" component={MyTabs} />
          <Stack.Screen name="PassengerReg" component={PassengerReg} />
          <Stack.Screen name="Passenger" component={Passenger} />
          <Stack.Screen name="TopTabs" component={TopTabs} />
          <Stack.Screen
            name="Legend"
            component={Legend}
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forModalPresentationIOS,
              cardOverlayEnabled: true,
              gestureEnabled: true,
              gestureDirection: 'vertical',
              cardStyle: {
                backgroundColor: 'transparent',
                height: '10%',
              },
            }}
          />
          <Stack.Screen
            name="CabinInfo"
            component={CabinInfo}
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forFadeFromBottomAndroid,
              cardOverlayEnabled: true,
              gestureEnabled: true,
              gestureDirection: 'vertical',
            }}
          />
          <Stack.Screen
            name="Description"
            component={Description}
            options={{
              cardStyleInterpolator:
                CardStyleInterpolators.forFadeFromBottomAndroid,
              cardOverlayEnabled: true,
              gestureEnabled: true,
              gestureDirection: 'vertical',
            }}
          />
          <Stack.Screen name="Ticket" component={Ticket} />
          <Stack.Screen name="PayRules" component={PayRules} />
          <Stack.Screen name="Return" component={Return} />
          <Stack.Screen name="ContactInfo" component={ContactInfo} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Email" component={Email} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
