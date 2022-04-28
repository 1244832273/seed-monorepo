/*
 * @Author: 最刚
 * @Date: 2020-07-24 17:22:09
 * @LastEditTime: 2021-06-03 21:40:19
 * @LastEditors: 鲁田文
 * @Description: axios请求封装
 */

import axios, { Canceler, AxiosRequestConfig, AxiosResponse } from 'axios';
import useSWR, { ConfigInterface, responseInterface } from 'swr';
import { UrlHelper } from '@flx/utils';
import { BaseResult } from '../api/interface/base.interface';
import { message } from 'antd';
import { RcFile } from 'antd/lib/upload';

axios.defaults.baseURL = process.env.REACT_APP_URL;
axios.defaults.headers = {
  'Content-Type': 'application/json',
};
axios.defaults.timeout = 150000;
// 跨域携带cookie
axios.defaults.withCredentials = true;
// 获取CancelToken
let cancel: Canceler;
const CancelToken = axios.CancelToken;
axios.interceptors.request.use(
  (config) => {
    config.cancelToken = new CancelToken((c) => {
      cancel = c;
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let tokenWarning = false;
// http response 拦截器
axios.interceptors.response.use((response) => {
  // 请求失败
  if (!response.data.success) {
    message.error(response?.data?.errorMessage);
    // 登录信息过期拦截
    if (response.data.errorCode === 'ul_530') {
      if (!tokenWarning) {
        tokenWarning = true;
        // window.location.href = 'https://fw.jd.com/home/sers.action';
        // window.location.href = '/sport-back/login';
        // window.location.href = process.env.REACT_APP_LOGIN_PAGE_PATH as any;
      }
      return Promise.reject(response.data);
    }
    return Promise.reject(response.data);
  }
  // response.data.data post 请求返回null, 所以取消最后一个data;
  return response.data;
});

export const GET = (url: string, params?: unknown, config?: AxiosRequestConfig): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params, ...config })
      .then((response: AxiosResponse<BaseResult>) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const POST = (url: string, params?: unknown, config?: AxiosRequestConfig): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, config)
      .then((response: AxiosResponse<BaseResult>) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export interface requestConfig<Data, Error = any> {
  axiosConfig?: AxiosRequestConfig;
  SWRConfig?: ConfigInterface<Data, Error>;
}

export const useRequest = <Data, Error = any>(
  url?: string | null,
  params?: any,
  config?: requestConfig<Data, Error>
): responseInterface<Data, Error> => { 
  const key = url ? UrlHelper.connectUrlWithParams(url, params!) : null;
  return useSWR(
    key,
    (_url) => {
      return new Promise((resolve, reject) =>
        axios({
          url: _url,
          method: 'GET',
          ...config?.axiosConfig,
        })
          .then((response) => {
            resolve(response as any);
          })
          .catch((error) => {
            reject(error);
          })
      );
    },
    config?.SWRConfig || {}
  );
};

/**
 * 上传文件
 * @param url
 * @param file
 * @param params
 */
export const uploadFile = (url: string, file: RcFile, params?: { [key: string]: string }): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);
  if (params) {
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const element = params[key];
        formData.append(key, element);
      }
    }
  }

  return new Promise((resolve, reject) => {
    axios
      .post(url, formData, {})
      .then((response: AxiosResponse<BaseResult>) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
