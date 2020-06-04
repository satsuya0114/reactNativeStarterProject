import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SettingIcon } from '~atoms/';

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

const SettingIconTop = () => (
  <>
    <View style={styles.wrapper}>
      <SettingIcon />
    </View>
    {/* <Header noShadow transparent>
      <Left />
      <Body />
      <Right>
        <Button transparent small>
          <Icon name="settings" type="MaterialIcons" style={{ color: 'black' }} onPress={() => navigation.navigate('GlobalSetting')} />
        </Button>
      </Right>
    </Header> */}
  </>
);

export default SettingIconTop;
