import React, { ReactNode, useState } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import MyMenu from './components/myMenu'

import './index.less'

const { Header, Content } = Layout

interface ContainerProps {
  children: ReactNode
}

const Container = (props: ContainerProps) => {
  const [collapsed, setCollapse] = useState<boolean>(false)

  return (
    <Layout
      style={{
        maxHeight: '100vh',
        minHeight: '100vh',
        backgroundColor: '#F1F2F6',
      }}
    >
      <MyMenu collapsed={collapsed} />
      <Layout className='sitelayout'>
        <Header className='sitelayoutbackground'>
          <div className='trigger'>
            {collapsed ? (
              <MenuUnfoldOutlined onClick={() => setCollapse(false)} />
            ) : (
              <MenuFoldOutlined onClick={() => setCollapse(true)} />
            )}
          </div>
        </Header>
        <Content className='rightContent'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default Container
