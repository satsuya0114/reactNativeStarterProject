import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';

const styles = StyleSheet.create({
  settingIcon: {
    paddingRight: 10,
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 24,
  },
});

const SettingIcon = () => {
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('GlobalSetting');
        }}
      >
        <Icon name="cog" type="FontAwesome5" style={styles.settingIcon} />
      </TouchableOpacity>
    </>
  );
};

export default SettingIcon;
