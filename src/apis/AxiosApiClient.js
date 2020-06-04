import Axios from 'axios';

const API_CONFIG = {
  timeout: 120000,
};

class AxiosApiClient {
  constructor(apiConfig) {
    this.instance = Axios.create({ ...API_CONFIG, ...apiConfig });
  }

  setHeader(headerObject = null, responseType = '') {
    // const token = getToken();
    // const Authorization = (isLogin() && token) ? { Authorization: token.token } : {};
    const Authorization = {};
    const defaultHeaders = {
      ...Authorization,
    };
    this.instance.defaults.headers = { ...defaultHeaders, ...headerObject };
    this.instance.defaults.responseType = responseType;
  }

  // instance() {
  //   return this.instance;
  // }

  get(url, payload, header) {
    this.setHeader(header);
    const params = {
      ...payload,
    };
    return {
      send: () => this.instance.get(url, { params }).catch(this.onError),
    };
  }

  post(url, payload, header = { 'Content-Type': 'application/json' }) {
    this.setHeader(header);
    return {
      send: () => this.instance.post(...[url, payload]).catch(this.onError),
    };
  }

  login(url, payload, header = { 'Content-Type': 'application/json' }, baseURL) {
    this.setHeader(header);
    return {
      send: () => this.instance({
        url,
        baseURL,
        method: 'post',
        data: {
          ...payload,
        },
      }).catch(this.onError),
    };
  }

  // eslint-disable-next-line class-methods-use-this
  onError(error) {
    if (Axios.isCancel(error)) {
      console.warn('Request canceled by user...');
    } else {
      let statudCode = 500;
      let errorKey = 'SYSTEM_ERROR';
      let errorData = {};
      if (error.response) {
        statudCode = error.response.status;
        errorKey = (error.response.data && error.response.data.message)
          ? `API_ERROR.${error.response.data.message}`
          : errorKey;
        errorData = (error.response.data && error.response.data.data)
          ? error.response.data.data
          : errorData;
      } else if (error.request) {
        statudCode = error.request.status;
      }

      const errorObj = {
        status: statudCode,
        errorKey,
        errorData,
      };

      if (statudCode === 401) {
        console.log(statudCode);
        // openModalError(error, {
        //   ...errorObj,
        //   errorKey: '登入逾期, 請重新登入',
        // }, () => {
        //   const path = getToken().role === 'A' ? PATH.ADMIN_LOGIN : PATH.LOGIN;
        //   deleteToken();
        //   window.location.href = `/MEMIS/#${path}`;
        // });
        return;
      }

      if (statudCode === 403) {
        console.log(statudCode);
        // toggleNotificaiton({ key: 'API_ERROR.FORBIDDEN' }, () => {
        //   /**
        //    * @todo
        //    * return to user profile page
        //    */
        //   // window.location.href = `${AppConfig.hostUrl}/user/profile`;
        // });
        return;
      }

      if (statudCode === 404 || statudCode === 405) {
        // openModalError(error, {
        //   ...errorObj,
        //   errorKey: 'API_ERROR.SYSTEM_ERROR',
        // });
        console.log(statudCode);
        return;
      }

      if (statudCode === 500 || statudCode === 422 || statudCode === 400) {
        // openModalError(error, {
        //   ...errorObj,
        //   errorKey: statudCode !== 422 ? 'API_ERROR.SYSTEM_ERROR' : errorObj.errorKey,
        // });
        console.log(statudCode);
        return;
      }

      throw new Error(JSON.stringify(errorObj));
    }
  }
}

export default AxiosApiClient;
