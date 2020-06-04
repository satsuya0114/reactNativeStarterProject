import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import PropTypes from 'prop-types';
// https://stackoverflow.com/questions/47362032/how-to-add-onpress-events-on-cards-on-native-base

const TouchableCard = ({ children, onPress, cardStyle }) => (
  <TouchableOpacity onPress={onPress}>
    <Card pointerEvents="none">
      <CardItem style={cardStyle}>
        <Body>
          {children}
        </Body>
      </CardItem>
    </Card>
  </TouchableOpacity>
);

TouchableCard.propTypes = {
  onPress: PropTypes.func.isRequired,
  cardStyle: PropTypes.object,
};

TouchableCard.defaultProps = {
  cardStyle: {},
};

export default TouchableCard;
