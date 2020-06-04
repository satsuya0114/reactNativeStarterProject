import React from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Divider } from 'react-native-elements';
import { commonStyle } from '~style/';
import { SettingIconTop, TitleHeader } from '~compose/';
import { TouchableScaleCard } from '~atoms/';

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
  },
  cardContent: {
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  cardItem: {
    paddingBottom: 20,
  },
  touchCardOdd: {
    backgroundColor: '#ffac1b',
  },
  touchCardEven: {
    backgroundColor: '#ffc867',
  },
});

const vtRoutes = [{
  apId: 'SCT.MOBILE.FV01',
  needVerification: true,
  title: 'Input',
  routeName: 'VTInput',
  active: true,
}, {
  apId: 'SCT.MOBILE.FV02',
  needVerification: false,
  title: 'Output',
  routeName: 'VTOutput',
  active: true,
}, {
  apId: 'SCT.MOBILE.FV02',
  needVerification: true,
  title: 'Transfer',
  routeName: 'VTTransfer',
  active: false,
}];

const VirtualTowerHomeScreen = () => {
  const navigation = useNavigation();

  function goByRoute(route) {
    const { routeName, needVerification, apId } = route;
    if (needVerification) {
      navigation.navigate('EmployeeAuth', { nextRouteName: routeName, apId });
    } else {
      navigation.navigate(routeName);
    }
  }

  return (
    <SafeAreaView style={[commonStyle.mainContainer, styles.mainContainer]}>
      <SettingIconTop />
      <TitleHeader title="Virtual Tower" />
      <View>
        <Divider style={commonStyle.divider} />
      </View>
      <ScrollView contentContainerStyle={commonStyle.scrollContentCenter}>
        <View style={styles.cardContent}>
          {
            vtRoutes.map(route => (
              <View style={styles.cardItem} key={route.title}>
                <TouchableScaleCard
                  containerStyle={styles.touchCardOdd}
                  title={route.title}
                  subtitle={`Virtual Tower ${route.title}`}
                  onPress={() => goByRoute(route)}
                  disabled={!route.active}
                />
              </View>
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VirtualTowerHomeScreen;
