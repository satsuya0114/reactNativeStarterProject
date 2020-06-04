import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import SelectPcbScreen from '~screens/SelectPcb/SelectPcbScreen';
import { useUserStore } from '~store/userStore';
import VirtualTowerScreens from '~/screens/VTScreens';
import SMTScreens from '~screens/SMTScreens';
import DIPScreens from '~screens/DIPScreens';


const PcbStack = createStackNavigator();


export default function SelectPcb() {
  const { selectPcb } = useUserStore();
  const navigation = useNavigation();
  useEffect(() => {
    console.log('selectPcb useEffect');
    if (selectPcb) navigation.navigate(selectPcb);
    // else navigation.navigate('SelectPcb');
  }, [selectPcb]);
  // useEffect(() => {
  //   console.log('first selectPdb useEffect');
  //   if (selectPcb) navigation.navigate(selectPcb);
  //   else navigation.navigate('SelectPcb');
  // }, []);
  return (
    <PcbStack.Navigator headerMode="none" initialRouteName={selectPcb || 'SelectPcb'}>
      <PcbStack.Screen name="SelectPcb" component={SelectPcbScreen} />
      <PcbStack.Screen name="SMT" component={SMTScreens} />
      <PcbStack.Screen name="VT" component={VirtualTowerScreens} />
      <PcbStack.Screen name="DIP" component={DIPScreens} />
    </PcbStack.Navigator>
  );
}
