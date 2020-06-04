import React from 'react';
import { Button as NativeBaseButton, Spinner } from 'native-base';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { loading, onPress, children, ...buttonProps } = props;
  return (
    <NativeBaseButton {...buttonProps} onPress={onPress}>
      { loading ? (
        <Spinner color="white" size="small" />
      ) : children}
    </NativeBaseButton>
  );
};

Button.propTypes = {
  loading: PropTypes.bool,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  loading: false,
  onPress: () => {},
};

export default Button;
