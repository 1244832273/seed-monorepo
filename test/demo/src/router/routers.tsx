/*
 * @Author: 鲁田文
 * @Date: 2021-03-31 14:22:13
 * @LastEditTime: 2022-03-31 11:25:22
 * @LastEditors: 鲁田文
 * @Description:
 */
import React, { lazy } from 'react';

import { RoutesOption } from './routers.types';
import Layout from '@/components/layout';

// const CesiumGlobal = lazy(() => import('@/pages/cesium/cesium'));

const permissions = ['admin'];

const routes: RoutesOption[] = [
  {
    path: '/login',
    Component: lazy(() => import('@/pages/login')),
    title: '登录',
  },
  {
    path: '/404',
    Component: () => <div>404</div>,
    title: '404',
  },
  // {
  //   path: '/cesium',
  //   Component: CesiumGlobal,
  //   title: '地图',
  // },
  {
    path: '/manage',
    Component: Layout,
    meta: {
      menu: true,
    },
    children: [
      {
        path: '/home',
        Component: lazy(() => import('@/pages/home')),
        title: '首页',
        meta: {
          menu: true,
          permissions: [...permissions],
        },
      },
      {
        path: '/home1',
        Component: lazy(() => import('@/pages/auth/index copy')),
        title: '首页1',
        meta: {
          menu: true,
        },
      },
      {
        path: '/home2',
        Component: lazy(() => import('@/pages/auth/index copy 2')),
        title: '首页2',
        meta: {
          menu: true,
        },
      },
      {
        path: '/auth',
        Component: lazy(() => import('@/pages/auth')),
        title: '活动主体',
        meta: {
          menu: true,
          permissions: [...permissions],
        },
        children: [
          {
            path: '/activity1',
            Component: lazy(() => import('@/pages/auth/index copy')),
            title: '活动1',
            meta: {
              menu: true,
              permissions: [...permissions],
            },
          },
          {
            path: '/activity2',
            Component: lazy(() => import('@/pages/auth/index copy 2')),
            title: '活动2',
            meta: {
              menu: true,
              permissions: ['user1'],
            },
          },
          {
            path: '/activity3',
            Component: lazy(() => import('@/pages/auth/index copy 2')),
            title: '活动3',
            meta: {
              menu: true,
              permissions: [...permissions],
            },
          },
        ],
      },
    ],
  },
];

export default routes;
