import React, { useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { storeSelectPcb } from '~utils/common';

const UserContext = createContext();

export const useUserStore = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [authData, _setAuthData] = useState({
    username: '',
  });
  const [userId, setUserId] = useState('');
  const [workstationIp, setWorkstationIp] = useState('');
  const [serverUrl, setServerUrl] = useState('');
  const [locale, setLocale] = useState('zh-TW');
  const setAuthData = d => _setAuthData({ ...authData, ...d });
  const pcbList = ['SMT', 'VT', 'DIP'];
  const [selectPcb, updateSelectPcb] = useState('');
  const setSelectPcb = (value) => {
    if (pcbList.includes(value)) {
      updateSelectPcb(value);
      storeSelectPcb(value);
    } else {
      updateSelectPcb('');
      storeSelectPcb('');
    }
  };
  return (
    <UserContext.Provider
      value={{
        authData,
        setAuthData,
        userId,
        setUserId,
        workstationIp,
        setWorkstationIp,
        serverUrl,
        setServerUrl,
        locale,
        setLocale,
        selectPcb,
        setSelectPcb,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
