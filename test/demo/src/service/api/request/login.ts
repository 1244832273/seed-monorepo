/*
 * @Author: 最刚
 * @Date: 2020-07-24 17:33:38
 * @LastEditTime: 2021-06-03 20:19:54
 * @LastEditors: 鲁田文
 * @Description:
 */

import api from '../index';
import { POST } from '@/service/fetch/index';
import { LoginParams } from '@/service/api/interface/login.interface';

export const login = (params: LoginParams) => {
  return POST(api.LOGIN, params);
};
