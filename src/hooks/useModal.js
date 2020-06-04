/** @typedef {import('~/models/useModalModel').ModalClosingCode} ModalClosingCode */
/** @typedef {import('~/models/useModalModel').ModalControl} ModalControl */

import { useState, useDebugValue } from 'react';

/** @type {ModalClosingCode} */
export const ModalClosingCode = { cancel: 0, confirm: 2 };

/** @param {any} initData */
/** @param {boolean} resetOnClose */
/** @returns {ModalControl} */
const useModal = (initData, resetOnClose = true) => {
  const [visible, setVisible] = useState(false);
  const [inputData, setInputData] = useState(initData);
  const [outputData, setOutputData] = useState(null);

  useDebugValue(visible ? 'on' : 'off');

  function open(modalInputData) {
    setVisible(true);
    setInputData(modalInputData);
  }

  function close(callback = () => { }) {
    setVisible(false);
    if (typeof callback === 'function') {
      callback();
    }
    if (resetOnClose) {
      setInputData(initData);
    }
  }

  /** @type {ModalControl} */
  const modalControl = {
    visible,
    inputData,
    open,
    close,
    outputData,
    setOutputData,
  };

  return modalControl;
};

export default useModal;
