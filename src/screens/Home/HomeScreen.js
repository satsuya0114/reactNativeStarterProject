import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button, Text, Container, Content, Header, Left, Right, Body, Title, Icon } from 'native-base';

const HomeScreen = ({ navigation }) => {
  return (
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => navigation.openDrawer()}
          >
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Home</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home hello</Text>
          <Button
            bordered
            success
            onPress={() => navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'OOO is best',
            })}
          >
            <Text success>Go to Details... again</Text>
          </Button>
          <Button
            bordered
            info
            onPress={() => navigation.navigate('AuthSetting')}
          >
            <Text success>Go to AuthSetting</Text>
          </Button>
          <Button
            bordered
            info
            onPress={() => navigation.navigate('VirtualTower')}
          >
            <Text success>Go to VirtualTower</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

export default HomeScreen;
