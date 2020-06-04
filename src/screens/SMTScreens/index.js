import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SMTHomeScreen from './HomeScreen';

const SMTStack = createStackNavigator();

const SMT = () => {
  return (
    <SMTStack.Navigator>
      <SMTStack.Screen name="SMTHome" component={SMTHomeScreen} options={{ headerShown: false }} />
      <SMTStack.Screen name="SMTAAAA" component={SMTHomeScreen} />
    </SMTStack.Navigator>
  );
};

export default SMT;
