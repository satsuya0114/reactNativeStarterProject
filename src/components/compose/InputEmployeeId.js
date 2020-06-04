/** @typedef {import('~/models/CommonApiModel').ApIdAndUserId} ApIdAndUserId */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Text, Button } from 'native-base';
import { Card } from 'react-native-elements';
import { commonStyle } from '~style/';
import { FloatFormLabelInput, StatusButton } from '~atoms/';

const styles = StyleSheet.create({
  cardContainer: { borderRadius: 4 },
  cardFooter: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16 },
  cardBody: { paddingHorizontal: 8 },
  invalidFeedback: commonStyle.errorMessage,
  enterButton: { marginLeft: 8, minWidth: 48 },
});

const buttonProps = {
  pendingProps: {
    iconRight: true,
    transparent: true,
    disabled: true,
  },
  successProps: {
    iconRight: true,
    success: true,
    transparent: true,
  },
  failureProps: {
    danger: true,
    transparent: true,
  },
  defaultProps: {
    transparent: true,
  },
};

const InputEmployeeId = ({ onConfirm, onCancel, status }) => {
  const { register, control, handleSubmit, errors } = useForm();

  useEffect(() => {
    register({ name: 'userId' }, { required: true });
  }, [register]);

  return (
    <Card
      title="Input User Id"
      containerStyle={styles.cardContainer}
    >
      <View style={styles.cardBody}>
        <Controller
          as={(
            <FloatFormLabelInput
              error={errors.userId && true}
              label="User Id"
              iconSetting={{
                name: 'user',
                type: 'Feather',
              }}
            />
          )}
          control={control}
          name="userId"
          onChangeName="onChangeText"
          onChange={([text]) => (text)}
          defaultValue=""
        />
        {
          errors.userId
          && <Text style={styles.invalidFeedback}>required</Text>
        }
      </View>
      <View style={styles.cardFooter}>
        <Button transparent onPress={onCancel}>
          <Text>Cancel</Text>
        </Button>
        <StatusButton
          status={status}
          style={styles.enterButton}
          onPress={handleSubmit(onConfirm)}
          pendingProps={buttonProps.pendingProps}
          successProps={buttonProps.successProps}
          failureProps={buttonProps.failureProps}
          {...buttonProps.defaultProps}
        >
          <Text style={{ fontWeight: 'bold' }}>Enter</Text>
        </StatusButton>
      </View>
    </Card>
  );
};

InputEmployeeId.propTypes = {
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  status: PropTypes.string,
};

InputEmployeeId.defaultProps = {
  onCancel: () => { },
  onConfirm: () => { },
  status: '',
};

export default InputEmployeeId;
