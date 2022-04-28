import React, { Suspense } from 'react'
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom'
import { Spin } from 'antd'

import routes from '@/router/routers'
import usePermission from '@/hooks/usePermission'
import { RoutesOption } from './routers.types'

function AppRouter() {
  // 过滤权限组路由
  const newRouters = usePermission({ routes }) // 过滤权限后路由

  const tileRouter = (permssionRoutes: RoutesOption[], parentPath = '') =>
    permssionRoutes.map(({ path, Component, children, redirect }) => {
      const newPath = parentPath + path
      const renderDom = () => (
        <Suspense fallback={<Spin tip='加载中...' />}>
          <Component />
        </Suspense>
      )
      return children?.length ? (
        <Route path={newPath} key={newPath} element={renderDom()}>
          {tileRouter(children, newPath)}
          {redirect ? (
            <Route path={newPath} element={<Navigate to={redirect} />}></Route>
          ) : (
            <Route path={newPath} element={<Navigate to={newPath + children[0].path} />}></Route>
          )}
        </Route>
      ) : (
        <Route key={newPath} path={newPath} element={renderDom()} />
      )
    })

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/manage/home' />} />
        {tileRouter(newRouters)}
      </Routes>
    </Router>
  )
}

export default AppRouter
