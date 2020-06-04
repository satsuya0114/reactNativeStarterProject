/** @typedef {import('~/models/useQueryModel').UseQuery} UseQuery */

import { useState } from 'react';
import moment from 'moment';
import AxiosApiClient from '../apis/AxiosApiClient';
import { useUserStore } from '~store/userStore';

/** @type {UseQuery} */
const useQuery = (option, baseURL = '') => {
  const { serverUrl, authData } = useUserStore();
  const apiClient = new AxiosApiClient({
    baseURL: serverUrl || baseURL,
  });
  const [query, updateQuery] = useState(option.payload || {});
  const [header] = useState(option.header || {});

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(option.data || {});

  const setQuery = (newState) => {
    updateQuery({
      ...query,
      ...newState,
    });
  };

  async function fetchFn(newPayload = {}) {
    const body = {
      userId: authData.username,
      language: 2,
      requestTime: Number(moment().format('x')),
      data: {
        ...query,
        ...newPayload,
      },
    };
    const request = apiClient[option.method](option.url, { ...body }, header);
    const response = await request.send();
    return response.data;
  }

  async function exec(newPayload = {}) {
    let returnData = option.data || {}; // default
    try {
      setIsLoading(true);
      const response = await fetchFn(newPayload);
      setData(response);
      returnData = response;
    } catch (err) {
      setError(err.message || err);
    } finally {
      setIsLoading(false);
    }
    return returnData;
  }

  async function loginFn(customBaseURL, username, newPayload = {}) {
    const body = {
      userId: username,
      language: 2,
      requestTime: Number(moment().format('x')),
      data: {
        ...query,
        ...newPayload,
      },
    };
    const request = apiClient.login(option.url, { ...body }, header, customBaseURL);
    const response = await request.send();
    return response.data;
  }

  async function execLogin(customBaseURL, username, newPayload = {}) {
    let returnData = option.data || {}; // default
    try {
      setIsLoading(true);
      const response = await loginFn(customBaseURL, username, newPayload);
      setData(response);
      returnData = response;
    } catch (err) {
      setError(err.message || err);
    } finally {
      setIsLoading(false);
    }
    return returnData;
  }

  return {
    query,
    setQuery,
    isLoading,
    data,
    error,
    exec,
    execLogin,
    setData,
  };
};

export default useQuery;
