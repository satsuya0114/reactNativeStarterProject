/**
 * @typedef {import('~/models/VTModels').InputDataFormValue} InputDataFormValue
 * @typedef {import('~/models/VTModels').InputData} InputData
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, Toast, Badge } from 'native-base';
import { FloatFormLabelInput } from '~atoms/';
import { FeatrueContainer } from '~compose/';
import { commonStyle } from '~style/';
import { FakeVirtualTowerInputApiClient } from '~apis/';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  invalidFeedback: commonStyle.errorMessage,
  btnGroup: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 16,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const VirtualTowerInputScreen = ({ title }) => {
  const apiClient = FakeVirtualTowerInputApiClient;
  const { register, control, handleSubmit, errors, reset: resetFormValue, getValues } = useForm();

  const selectTextOnFocus = true;
  /** @type {[boolean, (v: any) => void]} */
  const [isDisabledLocation, setDisabledLocation] = useState(true);
  /** @type {() => InputDataFormValue} */
  const getInputDataFormValue = () => getValues();
  /** @type {(v: InputDataFormValue) => void} */
  const setInputDataFormValue = ({ barcode = '', location = '' }) => {
    resetFormValue({ barcode, location });
  };

  /** @type {[InputData[], (v: InputData[]) => void]} */
  const [inputDataList, _setInputDataList] = useState([]);
  /** @type {[InputData, (v: InputData) => void]} */
  const [lastInputData, setLastInputData] = useState({});
  /** @param {InputData[]} list */
  const setInputDataList = (list) => {
    _setInputDataList(list);
    const last = list.slice().pop();
    setLastInputData(last || {});
  };

  function reset() {
    resetFormValue({ barcode: '', location: '' });
    setInputDataList([]);
    setDisabledLocation(true);
  }

  useFocusEffect(
    useCallback(() => {
      reset();
    }, []),
  );

  useEffect(() => {
    register({ name: 'barcode' }, { required: true });
    register({ name: 'location' }, { required: true });
  }, [register]);

  function getTotalCount() {
    return inputDataList.length;
  }
  function hasInputData() {
    return !!inputDataList.length;
  }

  /** @param {string} barcode */
  /** @returns {Promise<InputDataFormValue>} */
  async function queryRecommendPair(barcode) {
    const { location } = await apiClient.getLocation({ barcode });
    const pair = { barcode, location };
    return pair;
  }

  /** @param {InputDataFormValue} formValue */
  function isVaild(formValue) {
    const { barcode, location } = formValue;
    return !!(barcode && location);
  }

  /** @param {InputDataFormValue} recommendPair */
  /** @param {InputDataFormValue} formValue */
  function isRecommendPair(recommendPair, formValue) {
    return isVaild(formValue)
      && formValue.barcode === recommendPair.barcode
      && formValue.location === recommendPair.location;
  }

  /** @param {InputDataFormValue} recommendPair */
  /** @param {InputDataFormValue} formValue */
  function isChangeRecommendPair(recommendPair, formValue) {
    return isVaild(formValue)
      && formValue.barcode === recommendPair.barcode
      && formValue.location !== recommendPair.location;
  }

  /** @param {InputDataFormValue} recommendPair */
  /** @param {InputDataFormValue} formValue */
  function isNoRecommendPair(recommendPair, formValue) {
    return isVaild(formValue)
      && formValue.barcode === recommendPair.barcode
      && !recommendPair.location;
  }

  /** @param {InputDataFormValue} formValue */
  function isContinuousStorage(formValue) {
    return formValue.barcode === lastInputData.item
      && formValue.location === lastInputData.location;
  }

  /** @param {InputDataFormValue} formValue */
  async function storeInLocation(formValue) {
    const inputData = await apiClient.save(formValue);
    const inputDataListNew = [inputData];
    setInputDataFormValue({ location: formValue.location });
    setInputDataList(inputDataListNew);
    return inputData;
  }

  /** @param {InputDataFormValue} formValue */
  async function storeInLocationAgain(formValue) {
    const inputData = await apiClient.save(formValue);
    const inputDataListNew = inputDataList.concat(inputData);
    setInputDataFormValue({ location: formValue.location });
    setInputDataList(inputDataListNew);
    return inputData;
  }

  /** @param {InputDataFormValue} formValue */
  async function excuteStorage(formValue) {
    const storeIn = isContinuousStorage(formValue)
      ? storeInLocationAgain(formValue)
      : storeInLocation(formValue);

    storeIn
      .catch((err) => {
        Toast.show({
          text: `入料失敗 ${err}`,
          buttonText: 'Ok',
          type: 'danger',
        });
      });
  }

  function getRecommendPair() {
    const { barcode } = getInputDataFormValue();
    if (!barcode) {
      Toast.show({
        text: '請先刷料',
        buttonText: 'Ok',
        type: 'danger',
      });
      return;
    }

    queryRecommendPair(barcode)
      .then((pair) => {
        const nextFormValue = pair;
        setInputDataFormValue(nextFormValue);
        setDisabledLocation(false);
        Toast.show({
          text: pair.location
            ? `推薦儲位 ${pair.location}`
            : '無推薦儲位，請刷新儲位',
          type: pair.location ? null : 'warning',
          buttonText: 'Ok',
          duration: 1000,
        });
      }, (err) => {
        Toast.show({
          text: `讀取推薦儲位失敗 ${err}`,
          buttonText: 'Ok',
          type: 'danger',
        });
      });
  }

  function onSubmit() {
    const formValue = getInputDataFormValue();

    if (!isVaild(formValue)) {
      Toast.show({
        text: '請先刷料',
        buttonText: 'Ok',
        type: 'danger',
      });
      reset();
      return;
    }

    queryRecommendPair(formValue.barcode)
      .then((pair) => {
        if (isNoRecommendPair(pair, formValue)) {
          excuteStorage(formValue);
        }

        if (isRecommendPair(pair, formValue)) {
          excuteStorage(formValue);
        }

        if (isChangeRecommendPair(pair, formValue)) {
          Alert.alert(
            '改入料新儲位?',
            `從舊儲位 ${pair.location} 改入料至新儲位 ${formValue.location}`,
            [{
              text: 'Cancel',
              style: 'cancel',
            }, {
              text: 'Ok',
              onPress: () => excuteStorage(formValue),
            }],
          );
        }
      }, (err) => {
        Toast.show({
          text: `讀取推薦儲位失敗 ${err}`,
          buttonText: 'Ok',
          type: 'danger',
        });
      });
  }

  return (
    <FeatrueContainer title={title}>
      <View style={styles.content}>
        <Controller
          as={(
            <FloatFormLabelInput
              error={errors.barcode && true}
              label="Barcode"
              selectTextOnFocus={selectTextOnFocus}
            />
          )}
          control={control}
          name="barcode"
          onChangeName="onChangeText"
          onChange={([text]) => (text)}
          defaultValue=""
        />
        {errors.barcode && <Text style={styles.invalidFeedback}>required</Text>}
        <Controller
          as={(
            <FloatFormLabelInput
              error={errors.location && true}
              label="Bin"
              disabled={isDisabledLocation}
              selectTextOnFocus={selectTextOnFocus}
            />
          )}
          control={control}
          name="location"
          onChangeName="onChangeText"
          onChange={([text]) => (text)}
          defaultValue=""
        />
        {errors.location && <Text style={styles.invalidFeedback}>required</Text>}
        <View style={styles.btnGroup}>
          <Button style={styles.btn} transparent onPress={reset}>
            <Text>reset</Text>
          </Button>
          <Button style={styles.btn} transparent onPress={getRecommendPair}>
            <Text>get Bin</Text>
          </Button>
          <Button style={styles.btn} block success onPress={handleSubmit(onSubmit)}>
            <Text>Ok</Text>
          </Button>
        </View>
        {
          hasInputData()
          && (
            <View style={styles.btnGroup}>
              <View>
                <Text>料號: {lastInputData.item}</Text>
                <Text>儲位: {lastInputData.location}</Text>
              </View>
              <Badge success>
                <Text>{getTotalCount()}</Text>
              </Badge>
            </View>
          )
        }
        {
          inputDataList.reverse().map(inputData => (
            <Text key={inputData.idNo}>{inputData.idNo}</Text>
          ))
        }
      </View>
    </FeatrueContainer>
  );
};

export default VirtualTowerInputScreen;
