import React from 'react';
import { Container, Content, Text } from 'native-base';
import PropTypes from 'prop-types';
import { commonStyle } from '~style/';


const LoadingScreen = ({ text }) => (
  <Container>
    <Content contentContainerStyle={commonStyle.centerRowContent}>
      <Text>{text}</Text>
    </Content>
  </Container>
);

LoadingScreen.propTypes = {
  text: PropTypes.string,
};

LoadingScreen.defaultProps = {
  text: 'Loading',
};

export default LoadingScreen;
