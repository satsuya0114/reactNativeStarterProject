import React from 'react';
import {
  Container,
  Content,
} from 'native-base';
import { ListItem as ElementListItem } from 'react-native-elements';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import backgroundImage from '~images/drawer-cover.png';
import menuIcon from '~icons/pda.png';

const BackGroundImg = styled.Image`
  height: 120px;
  width: 100%;
  align-self: stretch;
`;
const PdaIcon = styled.Image`
  height: 80px;
  width: 80px;
  position: absolute;
  align-self: center;
  top: 20px;
`;


function Menu({ navigation, routesName }) {
  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({ item }) => (
    <ElementListItem
      title={item}
      chevron
      onPress={() => navigation.navigate(item)}
    />
  );
  return (
    <Container>
      <Content>
        <BackGroundImg source={backgroundImage} />
        <PdaIcon source={menuIcon} />
        {/* <List
          // contentContainerStyle={{ marginTop: 120 }}
          dataArray={routesName}
          keyExtractor={keyExtractor}
          renderRow={route => (
            <ListItem
              button
              onPress={() => navigation.navigate(route)}
            >
              <Text key={`listItem-${route}`}>{route}</Text>
            </ListItem>
          )}
        /> */}
        <FlatList
          nestedScrollEnabled
          keyExtractor={keyExtractor}
          data={routesName}
          renderItem={renderItem}
        />
      </Content>
    </Container>
  );
}

export default Menu;
