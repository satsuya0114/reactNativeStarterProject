import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { FeatrueContainer } from '~compose/';

const AutoPrepare = ({ title }) => {
  // console.log(navigation);
  const navigation = useNavigation();
  return (
    <FeatrueContainer title={title}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Auto Prepare</Text>
        <Button onPress={() => navigation.navigate('Home')}>
          <Text success>Go back home</Text>
        </Button>
        <Button onPress={() => navigation.navigate('AuthSetting')}>
          <Text success>Go back AuthSetting</Text>
        </Button>
      </View>
    </FeatrueContainer>
  );
};

export default AutoPrepare;
