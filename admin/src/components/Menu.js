import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Menu } from 'antd'
import { HomeOutlined, UserAddOutlined, FieldTimeOutlined, HistoryOutlined } from '@ant-design/icons'

const MenuComponent = () => {
  const { pathname } = window.location

  return (
    <Menu theme='dark' mode='inline' defaultSelectedKeys={[pathname]}>
      <Menu.Item style={{ marginTop: 7 }} key={`/`}>
        <MenuLink to={`/`}>
          <HomeOutlined style={{ marginRight: 8 }} />
          Главная
        </MenuLink>
      </Menu.Item>
      <Menu.Item style={{ marginTop: 7 }} key={`/routes`}>
        <MenuLink to={`/routes`}>
          <UserAddOutlined style={{ marginRight: 8 }} />
          Круизы
        </MenuLink>
      </Menu.Item>
      <Menu.Item style={{ marginTop: 7 }} key={`/history`}>
        <MenuLink to={`/history`}>
          <HistoryOutlined style={{ marginRight: 8 }} />
          История круизов
        </MenuLink>
      </Menu.Item>
      <Menu.Item style={{ marginTop: 7 }} key={`/freetime`}>
        <MenuLink to={`/freetime`}>
          <FieldTimeOutlined style={{ marginRight: 8 }} />
          Права
        </MenuLink>
      </Menu.Item>
    </Menu>
  )
}

const MenuLink = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  a {
    color: white;
  }
`

export default MenuComponent
