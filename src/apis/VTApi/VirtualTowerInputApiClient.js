/**
 * @typedef {import('~/models/VTModels').InputDataFormValue} InputDataFormValue
 * @typedef {import('~/models/VTModels').InputData} InputData
 * @typedef {import('~/models/VTModels').CheckReelToGetLocationIDReqJson} CheckReelToGetLocationIDReqJson
 * @typedef {import('~/models/VTModels').CheckReelToGetLocationIDResJson} CheckReelToGetLocationIDResJson
 * @typedef {import('~/models/VTModels').CheckInputReelToSaveReqJson} CheckInputReelToSaveReqJson
 * @typedef {import('~/models/VTModels').CheckInputReelToSaveResJson} CheckInputReelToSaveResJson
 */

import Axios from 'axios';
import URL from '../urlConstants';
import { useUserStore } from '~store/userStore';

// axios error consumer
const consumeError = (error) => {
  let msg = '';

  if (typeof error !== 'object' || !error) {
    msg = error || 'unknow';
    return new Error(msg);
  }

  const { response, request, message } = error;

  if (response) {
    const { status, data } = error.response;
    msg = `${status} ${data.message}`;
  } else if (request) {
    msg = '' + request;
  } else if (message) {
    msg = error.message;
  } else {
    msg = JSON.stringify(error);
  }

  console.error(msg);
  return new Error(msg);
};

export function useVirtualTowerInputApiClient() {
  const { serverUrl, userID, workstationIp } = useUserStore();
  const axios = Axios;

  /** @param {InputDataFormValue} record */
  function makeGetLocationReqPayload(record) {
    /** @type {CheckReelToGetLocationIDReqJson} */
    const reqPayload = {
      userID,
      language: 2,
      requestTime: new Date().getTime(),
      data: {
        barcode: record.barcode,
        ip: workstationIp,
      },
    };
    return reqPayload;
  }

  /** @param {CheckReelToGetLocationIDResJson} resBody */
  function makeGetLocationResPayload(resBody) {
    /** @type {InputDataFormValue} */
    const resPayload = {
      location: resBody.data.locationMsg,
    };
    return resPayload;
  }

  /** @param {InputDataFormValue} record */
  function makeSaveReqPayload(record) {
    /** @type {CheckInputReelToSaveReqJson} */
    const reqPayload = {
      userID,
      language: 2,
      requestTime: new Date().getTime(),
      data: {
        barcode: record.barcode,
        locationId: record.location,
        ip: workstationIp,
        status: 'sample string 4',
      },
    };
    return reqPayload;
  }

  /** @param {CheckInputReelToSaveResJson} resBody */
  function makeSaveResPayload(resBody) {
    /** @type {InputData} */
    const resPayload = {
      idNo: resBody.data.idNo,
      item: resBody.data.item,
      location: resBody.data.location,
      firstDepotDate: resBody.data.firstDepotDate,
      smQty: resBody.data.smQty,
    };
    return resPayload;
  }

  /**
   * @param {InputDataFormValue} payload
   * @returns {Promise<InputDataFormValue>}
   */
  function getLocation(payload) {
    const url = `${serverUrl}${URL.API_COMMON}/CheckReelToGetLocationID`;
    const reqPayload = makeGetLocationReqPayload(payload);

    return new Promise((resolve, reject) => {
      axios.post(url, reqPayload)
        .then(res => resolve(makeGetLocationResPayload(res.data)))
        .catch(err => reject(consumeError(err)));
    });
  }

  /**
   * @param {InputDataFormValue} payload
   * @returns {Promise<InputData>}
   */
  function save(payload) {
    const url = `${serverUrl}${URL.API_COMMON}/CheckInputReelToSave`;
    const reqPayload = makeSaveReqPayload(payload);

    return new Promise((resolve, reject) => {
      axios.post(url, reqPayload)
        .then(res => resolve(makeSaveResPayload(res.data)))
        .catch(err => reject(consumeError(err)));
    });
  }

  return {
    getLocation,
    save,
  };
}

export const FakeVirtualTowerInputApiClient = {
  /**
   * @param {InputDataFormValue} payload
   * @returns {Promise<InputDataFormValue>}
   */
  getLocation(payload) {
    console.log('FakeVirtualTowerInputApiClient.getLocation', payload);
    return Promise.resolve({
      location: 'fake-location',
    });
  },
  /**
   * @param {InputDataFormValue} payload
   * @returns {Promise<InputData>}
   */
  save(payload) {
    console.log('FakeVirtualTowerInputApiClient.save', payload);
    return Promise.resolve({
      idNo: 'resBody.data.item ' + Date.now().toString(16),
      item: payload.barcode,
      location: payload.location,
      firstDepotDate: 'resBody.data.firstDepotDate',
      smQty: 1000,
    });
  },
};


/** @param {{ serverUrl, userID, workstationIp }} vtParams */
/** @param {InputDataFormValue} payload */
export const checkReelToGetLocationID = (vtParams, payload) => {
  const { serverUrl, userID, workstationIp } = vtParams;
  /** @type {CheckReelToGetLocationIDReqJson} */
  const reqPayload = {
    userID,
    language: 2,
    requestTime: new Date().getTime(),
    data: {
      barcode: payload.barcode,
      ip: workstationIp,
    },
  };
  return {
    url: `${URL.API_COMMON}/CheckReelToGetLocationID`,
    baseURL: serverUrl,
    method: 'post',
    payload: reqPayload,
    defaultData: {},
  };
};

/** @param {{ serverUrl, userID, workstationIp }} vtParams */
/** @param {InputDataFormValue} payload */
export const checkInputReelToSave = (vtParams, payload) => {
  const { serverUrl, userID, workstationIp } = vtParams;
  /** @type {CheckInputReelToSaveReqJson} */
  const reqPayload = {
    userID,
    language: 2,
    requestTime: new Date().getTime(),
    data: {
      barcode: payload.barcode,
      locationId: payload.location,
      ip: workstationIp,
      status: 'sample string 4',
    },
  };
  return {
    url: `${URL.API_COMMON}/CheckInputReelToSave`,
    baseURL: serverUrl,
    method: 'post',
    payload: reqPayload,
    defaultData: {},
  };
};
