import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import VirtualTowerHomeScreen from './HomeScreen';
import VirtualTowerInputScreen from './VirtualTowerInput/VirtualTowerInputScreen';
import VirtualTowerOutputScreen from './VirtualTowerOutput';

const VirtualTowerStack = createStackNavigator();

const VirtualTower = () => (
  <VirtualTowerStack.Navigator>
    <VirtualTowerStack.Screen name="VTHome" component={VirtualTowerHomeScreen} options={{ headerShown: false }} />
    <VirtualTowerStack.Screen name="VTInput" component={VirtualTowerInputScreen} options={{ headerShown: false }} />
    <VirtualTowerStack.Screen name="VTOutput" component={VirtualTowerOutputScreen} options={{ headerShown: false }} />
  </VirtualTowerStack.Navigator>
);

export default VirtualTower;
