import React from 'react';
import { Colors, Picker } from 'react-native-ui-lib';
import PropTypes from 'prop-types';

const FullPagePicker = (props) => {
  const { title, topTitle, value, onChange, options, showSearch, showSearchTitle, multi } = props;
  return (
    <Picker
      placeholder={title}
      floatingPlaceholder
      value={value}
      enableModalBlur={false}
      onChange={onChange}
      topBarProps={{ title: topTitle }}
      style={{ color: Colors.blue10 }}
      showSearch={showSearch}
      searchPlaceholder={showSearchTitle}
      searchStyle={{ color: Colors.blue30, placeholderTextColor: Colors.dark50 }}
      mode={multi ? Picker.modes.MULTI : Picker.modes.SINGLE}
      // onSearchChange={value => console.warn('value', value)}
    >
      {options.map(option => (
        <Picker.Item key={option.value} value={option} disabled={option.disabled} />
      ))}
    </Picker>
  );
};

FullPagePicker.propTypes = {
  title: PropTypes.string.isRequired,
  topTitle: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.shape({ // single pick
      label: PropTypes.string,
      value: PropTypes.string,
    }),
    PropTypes.arrayOf(PropTypes.shape({ // multi pick
      label: PropTypes.string,
      value: PropTypes.string,
    })),
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
  showSearch: PropTypes.bool,
  showSearchTitle: PropTypes.string,
  multi: PropTypes.bool,
};

FullPagePicker.defaultProps = {
  topTitle: '',
  showSearch: false,
  showSearchTitle: '',
  multi: false,
};


export default FullPagePicker;
