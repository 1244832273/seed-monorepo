/*
 * @Author: 鲁田文
 * @Date: 2021-06-04 17:05:51
 * @LastEditTime: 2021-06-15 22:04:52
 * @LastEditors: Please set LastEditors
 * @Description: 公共请求配置 需要判断环境变量都写这里
 */
export const BASE_URL = process.env.NODE_ENV === 'development' ? '/dev' : '';
