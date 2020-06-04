import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  pageTitle: {
    fontSize: 32,
    color: 'rgba(0, 0, 0, 0.6)',
  },
});

const TitleHeader = (props) => {
  const { title } = props;
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>{title}</Text>
      </View>
    </>
  );
};

TitleHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

TitleHeader.defaultProps = {
};

export default TitleHeader;
