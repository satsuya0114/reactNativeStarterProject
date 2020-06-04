import AsyncStorage from '@react-native-community/async-storage';

export const storeUserInfo = async ({ serverUrl, workstationIp, authUsername }) => {
  try {
    await AsyncStorage.setItem('@serverUrl', serverUrl);
    await AsyncStorage.setItem('@workstationIp', workstationIp);
    await AsyncStorage.setItem('@authUsername', authUsername);
  } catch (e) {
    // saving error
  }
};

export const getStoreUserInfo = async () => {
  try {
    const storedServerUrl = await AsyncStorage.getItem('@serverUrl') || '';
    const storedWorkstationIp = await AsyncStorage.getItem('@workstationIp') || '';
    const storedAuthUsername = await AsyncStorage.getItem('@authUsername') || '';
    const storedSelectPcb = await AsyncStorage.getItem('@selectPcb') || '';
    return {
      storedServerUrl,
      storedWorkstationIp,
      storedAuthUsername,
      storedSelectPcb,
    };
  } catch (error) {
    console.log(error);
  }
};

export const storeSelectPcb = async (selectPcb) => {
  try {
    await AsyncStorage.setItem('@selectPcb', selectPcb);
  } catch (error) {
    console.log(error);
  }
};
