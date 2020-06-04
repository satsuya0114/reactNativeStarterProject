import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { FeatrueContainer } from '~compose/';

const ManualPrepare = ({ navigation, title }) => (
  <FeatrueContainer title={title} navigation={navigation}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>ManualPrepare</Text>
      <Button onPress={() => navigation.navigate('Home')}>
        <Text success>Go back home</Text>
      </Button>
    </View>
  </FeatrueContainer>
);
export default ManualPrepare;
