import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerMenu } from '~compose/';
import HomeScreen from '~screens/Home/HomeScreen';
import { AutoPrepare, ManualPrepare } from '~screens/SMTScreens';


const Drawer = createDrawerNavigator();

const routesName = ['Home', 'AutoPrepare', 'ManualPrepare'];

export default function Home() {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerMenu routesName={routesName} {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      {/* <Drawer.Screen name="Feature1" component={Feature1} /> */}
      <Drawer.Screen name="AutoPrepare">
        {props => <AutoPrepare {...props} title="AutoPrepare" />}
      </Drawer.Screen>
      <Drawer.Screen name="ManualPrepare">
        {props => <ManualPrepare {...props} title="ManualPrepare" />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
