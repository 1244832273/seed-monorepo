/*
 * @Author: 最刚
 * @Date: 2020-07-27 14:10:05
 * @LastEditTime: 2020-08-04 13:16:09
 * @LastEditors: Tang
 * @Description:
 */

export interface BaseResult {
  data: unknown;
  errorCode: string;
  errorMessage: string;
  success: boolean;
}

// 分页参数
export interface PageBaseParams {
  page: number; // 页数从1开始
  pageSize?: number; // 每页条数
}

// 分页结果
export interface PageBaseResult<T> {
  pageSize: number;
  totalCount: number;
  pageNo: number;
  beginIndex: number;
  endIndex: number;
  limit: number;
  firstPage: boolean;
  lastPage: boolean;
  empty: boolean;
  totalPage: number;
  offset: number;
  items: T[];
}
