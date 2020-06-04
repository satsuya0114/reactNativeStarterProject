import React from 'react';
import { View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { commonStyle } from '~style/';

const DIPHomeScreen = () => (
  <Container>
    <Content contentContainerStyle={commonStyle.centerRowContent}>
      <View>
        <Text>DIP Home Screen</Text>
      </View>
    </Content>
  </Container>
);

export default DIPHomeScreen;
