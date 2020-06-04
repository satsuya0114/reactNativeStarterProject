import React from 'react';
import { View } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { commonStyle } from '~style/';

const SMTHomeScreen = () => (
  <Container>
    <Content contentContainerStyle={commonStyle.centerRowContent}>
      <View>
        <Text>SMT Home Screen</Text>
      </View>
    </Content>
  </Container>
);

export default SMTHomeScreen;
