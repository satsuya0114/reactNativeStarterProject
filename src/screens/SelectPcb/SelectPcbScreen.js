import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import { Divider } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableScaleCard } from '~atoms/';
import { SettingIconTop, TitleHeader } from '~compose/';
import { useUserStore } from '~store/userStore';
import { commonStyle } from '~style/';

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'center',
  },
  cardContainer: {
    marginHorizontal: 30,
    marginTop: 90,
  },
  cardContent: {
    marginBottom: 30,
  },
});

const SelectPcbScreen = () => {
  const { setSelectPcb } = useUserStore();
  // useEffect(() => {
  //   if (isFocused) setSelectPcb('');
  //   console.log(`selectPcb: ${selectPcb}, this is useEffect isFocused`);
  // }, [isFocused]);
  useFocusEffect(
    useCallback(() => {
      console.log('useFocusEffect');
      setSelectPcb('');
    }, []),
  );

  return (
    <Container>
      <Content>
        <SettingIconTop />
        <TitleHeader title="Select PCB" />
        <View>
          <Divider style={commonStyle.divider} />
        </View>
        <View style={[styles.cardContainer, { flex: 1 }]}>
          <View style={styles.cardContent}>
            <TouchableScaleCard
              containerStyle={{ backgroundColor: '#6ec06e' }}
              title="SMT"
              subtitle="Sxxxx Mxxxx Txxxx"
              onPress={() => { setSelectPcb('SMT'); }}
            />
          </View>
          <View style={styles.cardContent}>
            <TouchableScaleCard
              containerStyle={{ backgroundColor: '#ffac1b' }}
              title="VT"
              subtitle="Virtual Tower"
              onPress={() => { setSelectPcb('VT'); }}
            />
          </View>
          <View>
            <TouchableScaleCard
              containerStyle={{ backgroundColor: '#83b9ff' }}
              title="DIP"
              subtitle="Dxxxx Ixxxx Pxxxxx"
              onPress={() => { setSelectPcb('DIP'); }}
            />
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default SelectPcbScreen;
