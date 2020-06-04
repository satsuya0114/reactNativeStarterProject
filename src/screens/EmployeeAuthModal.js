/** @typedef {import('~/models/CommonApiModel').ApIdAndUserId} ApIdAndUserId */

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Toast } from 'native-base';
import { InputEmployeeId } from '~compose/';
import { StatusButtonCode } from '~atoms/';
import useQuery from '~/hooks/useQuery';
import { authApIdByUserId } from '~/apis/CommonApi';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const EmployeeAuthModal = ({ route }) => {
  const { nextRouteName, apId } = route.params;
  const navigation = useNavigation();
  const authApIdQuery = useQuery(authApIdByUserId());
  const [status, setStatus] = useState(StatusButtonCode.default);

  function onCancel() {
    navigation.goBack();
  }

  /** @param {Pick<ApIdAndUserId, 'userId'>} result */
  async function onConfirm({ userId } = {}) {
    try {
      /** @type {ApIdAndUserId} */
      const payload = { userId, apId };
      setStatus(StatusButtonCode.pending);
      await authApIdQuery.exec(payload);
      navigation.navigate(nextRouteName, { userId });
    } catch (error) {
      setStatus(StatusButtonCode.failure);
      Toast.show({
        text: `失敗 ${error}`,
        buttonText: 'Ok',
        type: 'danger',
      });
    }
  }

  return (
    <View style={styles.container}>
      <InputEmployeeId
        status={status}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </View>
  );
};

EmployeeAuthModal.propTypes = {
  route: PropTypes.object,
};

EmployeeAuthModal.defaultProps = {
  route: {
    params: {
      nextRouteName: '',
      apId: '',
    },
  },
};

export default EmployeeAuthModal;
