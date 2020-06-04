import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DIPHomeScreen from './HomeScreen';

const DIPStack = createStackNavigator();

const DIP = () => {
  return (
    <DIPStack.Navigator>
      <DIPStack.Screen name="DIPHome" component={DIPHomeScreen} />
    </DIPStack.Navigator>
  );
};

export default DIP;
