/*
 * @Author: 最刚
 * @Date: 2020-07-24 17:33:46
 * @LastEditTime: 2021-06-04 18:10:11
 * @LastEditors: 鲁田文
 * @Description: api
 */
import { BASE_URL } from "@/config/config";
const PREFIX = BASE_URL;

const getUrl = (url: string, prefix: string = PREFIX) => {
  return `${prefix}${url}`;
};

const api = {
  LOGIN: getUrl("/mt_redemption/access_token/jd/login"), // 1
};

export default api;
