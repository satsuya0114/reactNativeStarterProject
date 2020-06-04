import React, { useState } from 'react';
import { Input, Item, Label, Icon } from 'native-base';
import PropTypes from 'prop-types';

export default function FloatLabelPwd({ value, onChangeText, error }) {
  const [pwdIcon, setPwdIcon] = useState('eye-off');
  const [secureMode, setSecureMode] = useState(true);

  function onPressPwdEye() {
    if (pwdIcon === 'eye-off') {
      setPwdIcon('eye');
      setSecureMode(false);
    } else {
      setPwdIcon('eye-off');
      setSecureMode(true);
    }
  }

  return (
    <>
      <Item floatingLabel style={{ marginVertical: 10 }} error={error}>
        <Icon name="lock" type="Feather" />
        <Label>Password</Label>
        <Input value={value} secureTextEntry={secureMode} onChangeText={onChangeText} />
        <Icon active name={pwdIcon} type="Feather" onPress={onPressPwdEye} />
      </Item>
    </>
  );
}

FloatLabelPwd.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  error: PropTypes.bool,
};

FloatLabelPwd.defaultProps = {
  value: '',
  onChangeText: () => {},
  error: false,
};
