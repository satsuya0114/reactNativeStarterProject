/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import '~locales/'; // enable react-i18next
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'react-native-elements';
import { Root as NativeBaseRoot } from 'native-base'; // enable Toast ActionSheet
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from '~screens/Home';
import LoadingScreen from '~screens/LoadingScreen';
import AuthSettingScreen from '~screens/AuthSetting/AuthSettingScreen';
import SelectPcbStack from '~screens/SelectPcb';
import GlobalSettingModal from '~screens/GlobalSettingModal';
import EmployeeAuthModal from '~screens/EmployeeAuthModal';
import { UserContextProvider, useUserStore } from '~store/userStore';
import { getStoreUserInfo } from '~utils/common';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const { setServerUrl, setWorkstationIp, setAuthData, authData, setSelectPcb } = useUserStore();
  useEffect(() => {
    const getStoreData = async () => {
      const storedData = await getStoreUserInfo();
      setServerUrl(storedData.storedServerUrl);
      setWorkstationIp(storedData.storedWorkstationIp);
      setAuthData({ username: storedData.storedAuthUsername });
      setSelectPcb(storedData.storedSelectPcb);
      setLoading(false);
    };
    getStoreData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) {
    return (<LoadingScreen />);
  }
  return (
    <RootStack.Navigator
      headerMode="float"
      mode="modal"
    >
      {authData.username ? (
        <>
          {/* <RootStack.Screen name="Home" options={{ headerShown: false }}>
            {props => <HomeScreen {...props} />}
          </RootStack.Screen> */}
          <RootStack.Screen name="Pcb" component={SelectPcbStack} options={{ headerShown: false }} />
          <RootStack.Screen
            name="GlobalSetting"
            component={GlobalSettingModal}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="EmployeeAuth"
            component={EmployeeAuthModal}
            options={{
              headerShown: false,
              // https://reactnavigation.org/docs/stack-navigator#transparent-modals
              cardStyle: { backgroundColor: 'transparent' },
              cardOverlayEnabled: true,
              cardStyleInterpolator: ({ current: { progress } }) => ({
                cardStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 0.5, 0.9, 1],
                    outputRange: [0, 0.25, 0.7, 1],
                  }),
                },
                overlayStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                    extrapolate: 'clamp',
                  }),
                },
              }),
            }}
          />
          <RootStack.Screen name="AuthSetting" options={{ headerBackTitleVisible: false }}>
            {props => <AuthSettingScreen {...props} type="setting" />}
          </RootStack.Screen>
        </>
      ) : (
        <RootStack.Screen name="AuthLogin" options={{ headerShown: false }}>
          {props => <AuthSettingScreen {...props} type="login" />}
        </RootStack.Screen>
      )}
    </RootStack.Navigator>
  );
};

const App = () => (
  <UserContextProvider>
    <ThemeProvider>
      <PaperProvider>
        <NativeBaseRoot>
          <NavigationContainer>
            <RootStackScreen />
          </NavigationContainer>
        </NativeBaseRoot>
      </PaperProvider>
    </ThemeProvider>
  </UserContextProvider>
);

export default App;
