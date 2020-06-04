import React from 'react';
import { Colors, Picker } from 'react-native-ui-lib';
import PropTypes from 'prop-types';

const NativePicker = (props) => {
  const { title, placeholder, value, onChange, options } = props;
  return (
    <Picker
      title={title}
      placeholder={placeholder}
      useNativePicker
      value={value}
      onChange={onChange}
      // rightIconSource={dropdown}
      containerStyle={{ marginTop: 20 }}
      topBarProps={{ doneLabel: 'YES', cancelLabel: 'NO' }}
      wheelPickerProps={{
        style: { width: 200 },
        color: Colors.violet30,
        labelStyle: { fontSize: 32, fontFamily: 'sans-serif-condensed-light' },
        itemHeight: 55,
      }}
      selectLabelStyle={{ color: Colors.violet30 }}
      cancelLabelStyle={{ color: Colors.violet30 }}
    >
      {options.map(option => (
        <Picker.Item key={option.value} value={option.value} label={option.label} disabled={option.disabled} />
      ))}
    </Picker>
  );
};

NativePicker.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
};

NativePicker.defaultProps = {
  placeholder: 'Click to select value',
};

export default NativePicker;
