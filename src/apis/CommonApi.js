/** @typedef {import('~/models/CommonApiModel').UserIdAndPassword} UserIdAndPassword */
/** @typedef {import('~/models/CommonApiModel').ApIdAndUserId} ApIdAndUserId */

import URL from './urlConstants';

const common = URL.API_COMMON;

/** @type {{ data: UserIdAndPassword }} */
export const authLogin = {
  url: `${common}/login/loginByUidPwd`,
  method: 'post',
  payload: {},
  data: {},
};

/** @param {ApIdAndUserId} payload */
export const authApIdByUserId = ({ apId = '', userId = '' } = {}) => ({
  url: `${common}/login/authApIdByUserId`,
  method: 'post',
  payload: { apId, userId },
});
