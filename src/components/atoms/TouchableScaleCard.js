import React from 'react';
import TouchableScale from 'react-native-touchable-scale';
import { ListItem } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import * as _ from 'lodash';

const styles = StyleSheet.create({
  cardItem: {
    borderRadius: 5,
  },
});

const TouchableScaleCard = (props) => {
  const { title, subtitle = '', onPress, containerStyle = {}, titleStyle = {}, subtitleStyle = {}, disabled } = props;
  const containerTotalStyle = [styles.cardItem].concat(containerStyle);
  return (
    <ListItem
      containerStyle={containerTotalStyle}
      Component={TouchableScale}
      friction={90} //
      tension={100} // These props are passed to the parent component (here TouchableScale)
      activeScale={0.95} //
      // linearGradientProps={{
      //   colors: ['#FF9800', '#F44336'],
      //   start: { x: 1, y: 0 },
      //   end: { x: 0.2, y: 0 },
      // }}
      // ViewComponent={LinearGradient} // Only if no expo
      // leftAvatar={{ rounded: true, source: { uri: avatar_url } }}
      title={title}
      titleStyle={_.isEmpty(titleStyle) ? { color: 'white', fontWeight: 'bold' } : titleStyle}
      subtitleStyle={_.isEmpty(subtitleStyle) ? { color: 'white' } : subtitleStyle}
      subtitle={subtitle || false}
      chevron={{ color: 'white' }}
      onPress={onPress}
      disabled={disabled}
    />
  );
};

TouchableScaleCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  containerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  titleStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  subtitleStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  disabled: PropTypes.bool,
};

TouchableScaleCard.defaultProps = {
  subtitle: '',
  containerStyle: {},
  titleStyle: {},
  subtitleStyle: {},
  disabled: false,
};

export default TouchableScaleCard;
