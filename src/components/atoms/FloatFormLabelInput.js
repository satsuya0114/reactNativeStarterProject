import React from 'react';
import { Input, Item, Label, Icon } from 'native-base';
import PropTypes from 'prop-types';

const FloatFormLabelInput = (props) => {
  const { label, onChangeText, iconSetting, error, value, disabled, selectTextOnFocus, onSubmitEditing } = props;
  return (
    <>
      <Item floatingLabel style={{ marginVertical: 10 }} error={error}>
        {iconSetting.name
          ? <Icon active name={iconSetting.name} type={iconSetting.type} />
          : <></>}
        <Label>{label}</Label>
        <Input
          disabled={disabled}
          selectTextOnFocus={selectTextOnFocus}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          value={value}
        />
      </Item>
    </>
  );
};

FloatFormLabelInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  iconSetting: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
  }),
  error: PropTypes.bool,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  selectTextOnFocus: PropTypes.bool,
};

FloatFormLabelInput.defaultProps = {
  onChangeText: () => { },
  onSubmitEditing: () => { },
  iconSetting: {
    name: '',
    type: '',
  },
  error: false,
  value: '',
  disabled: false,
  selectTextOnFocus: false,
};

export default FloatFormLabelInput;
