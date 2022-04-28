/*
 * @Author: 鲁田文
 * @Date: 2021-04-08 14:22:35
 * @LastEditTime: 2022-03-31 10:57:05
 * @LastEditors: 鲁田文
 * @Description:
 */
import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate } from 'react-router-dom';
import { MenuInfo } from "rc-menu/lib/interface";
import { MenuOutlined } from "@ant-design/icons";

import routers from "@/router/routers";
import { RoutesOption } from "@/router/routers.types"
import usePermission from "@/hooks/usePermission";
import '../index.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

interface MenuProps {
  collapsed: boolean; // 控制菜单展开关闭
}

function MyMenu({ collapsed }: MenuProps) {
  const navigate = useNavigate();

  // 过滤菜单
  const menuRouter = routers.find(x => x?.meta?.menu); // layout路由
  const newRouters = usePermission({ routes: menuRouter?.children || [] }); // 过滤权限后路由

  // menu开关
  const handleClickSiderMenu = (info: MenuInfo) => {
    navigate(String(info.key));
  };

  // 递归出菜单
  const getAllMenu = (routers: RoutesOption[], fPath = '') => {
    return (
      routers?.map(x => (
        x.children ?
          <SubMenu key={fPath + x.path} title={x.title} icon={collapsed && <MenuOutlined />}>
            {
              getAllMenu(x.children, fPath + x.path)
            }
          </SubMenu>
          :
          <Menu.Item key={fPath + x.path} icon={collapsed && <MenuOutlined />}>{x.title}</Menu.Item>
      ))
    )
  }

  return (
    <Sider
      className='mysider'
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className='logo' />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["/auth/activity"]} onClick={handleClickSiderMenu}>
        {
          getAllMenu(newRouters, menuRouter?.path || '')
        }
      </Menu>
    </Sider>
  );
}

export default MyMenu;
