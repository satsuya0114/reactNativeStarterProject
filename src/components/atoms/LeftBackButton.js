import React from 'react';
import { Button, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import * as _ from 'lodash';
import deboundePress from '~utils/debounce';

const LeftBackButton = () => {
  const navigation = useNavigation();

  const pressGoBack = () => {
    navigation.goBack();
  };

  return (
    <Button transparent onPress={deboundePress(pressGoBack)}>
      <Icon type="Entypo" name="chevron-left" style={{ fontSize: 28 }} />
    </Button>
  );
};

export default LeftBackButton;
