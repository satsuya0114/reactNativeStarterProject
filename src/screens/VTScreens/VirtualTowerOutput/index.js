import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LeftBackButton } from '~atoms/';
import JoblistScreen from './JobListScreen';


const VirtualTowerOutputStack = createStackNavigator();

const VirtualTowerOutput = () => (
  <VirtualTowerOutputStack.Navigator initialRouteName="JobList">
    <VirtualTowerOutputStack.Screen
      name="JobList"
      component={JoblistScreen}
      options={{
        headerLeft: () => (<LeftBackButton />),
      }}
    />
  </VirtualTowerOutputStack.Navigator>
);

export default VirtualTowerOutput;
