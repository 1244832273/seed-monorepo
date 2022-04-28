/*
 * @Author: 鲁田文
 * @Date: 2021-04-23 16:13:19
 * @LastEditTime: 2022-03-29 20:25:09
 * @LastEditors: 鲁田文
 * @Description: loading 分页table
 */
import React, { useState, useEffect } from "react";

export interface queryPage {
  current: number;
  pageSize: number;
}

interface Pagination extends queryPage {
  total: number;
  showQuickJumper: boolean;
}

interface queryResult<T = any> {
  pageNo: number | string;
  pageSize: number;
  total: number;
  list: Array<T>;
}

export interface useAntTableResult<T> {
  loading: boolean;
  dataSource: T;
  pagination: Pagination;
  queryPagination: (
    pagination: any,
    filters: any,
    sorter: any,
    extra: any
  ) => void;
}

interface useAntTableProps {
  pageSize?: number;
  showQuickJumper?: boolean;
  fetchPage: (params: queryPage) => Promise<queryResult>;
}
function useAntTable({
  pageSize = 10,
  showQuickJumper = false,
  fetchPage,
}: useAntTableProps) {
  const [dataSource, setDataSource] = useState<any>([]); // 返回table数据
  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    pageSize,
    total: 0,
    showQuickJumper,
  });
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // 分页请求
  const fetch = async (params: queryPage) => {
    setLoading(true);
    try {
      const { pageNo, pageSize, total, list } = await fetchPage(params);
      setDataSource(list);
      setPagination((pre) => {
        return {
          ...pre,
          pageSize: pageSize,
          current: typeof pageNo == "number" ? pageNo : parseInt(pageNo),
          total: total,
        };
      });
    } catch (error) {
      console.log("error :>> ", error);
    } finally {
      setLoading(false);
    }
  };

  // 触发更新 重置分页
  const searchQuery = () => {
    setPagination((pre) => {
      return {
        ...pre,
        current: 1,
      };
    });
    setRefreshKey((pre) => pre + 1);
  };

  // 分页触发请求
  const queryPagination = (
    pagination: any,
    filters: any,
    sorter: any,
    extra: any
  ) => {
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize,
    };
    fetch(params);
  };

  // 初始化数据 监听刷新
  useEffect(() => {
    const params = {
      current: pagination.current,
      pageSize: pagination.pageSize,
    };
    fetch(params);
  }, [refreshKey]);

  return {
    tableProps: {
      loading,
      dataSource,
      onChange: queryPagination,
      pagination,
    },
    search: searchQuery,
  };
}

export default useAntTable;
