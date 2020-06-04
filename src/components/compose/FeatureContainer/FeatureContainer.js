import React from 'react';
import { View } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Title } from 'native-base';
import { Divider } from 'react-native-elements'; 
import PropTypes from 'prop-types';

const FeatrueContainer = (props) => {
  const { children, title, headerLeft, headerRight } = props;
  return (
    <Container>
      <Header transparent>
        <Left>
          {headerLeft}
        </Left>
        <Body>
          <Title style={{ fontWeight: '500' }}>{title}</Title>
        </Body>
        <Right>
          {headerRight}
        </Right>
      </Header>
      <View>
        <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
      </View>
      <Content>
        {children}
      </Content>
    </Container>
  );
};


FeatrueContainer.propTypes = {
  children: PropTypes.object,
  title: PropTypes.string,
  headerLeft: PropTypes.object,
  headerRight: PropTypes.object,
};

FeatrueContainer.defaultProps = {
  children: (<></>),
  title: '',
  headerLeft: (<></>),
  headerRight: (<></>),
};

export default FeatrueContainer;
