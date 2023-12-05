/* eslint-disable unicorn/prefer-add-event-listener */
import React, { useState } from 'react';

import type { MenuProps } from 'antd';
import { Avatar, Layout, Menu, Row } from 'antd';
import { useAtom } from 'jotai';
import { Link, useLocation } from 'react-router-dom';

import { ADMIN_ROUTE_PATH, ROUTE_PATH } from '@/routes/route.constant';
import { atomCartPending } from '@/store/cartPending/cartPending';
import { localStorageUtils } from '@/utils/local-storage-utils';

import styles from './index.module.scss';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const MenuSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { pathname } = useLocation();
  const [c, setC] = useAtom(atomCartPending);

  const onClickOrder = () => {
    localStorageUtils.remove('cart-pending');
    setC(0);
  };
  const items: MenuItem[] = [
    // {
    //   key: 'dashboard',
    //   icon: '',
    //   label: <Link to={ADMIN_ROUTE_PATH.ADMIN_DASHBOARD}>Thống kê</Link>,
    // },
    {
      key: 'product',
      icon: '',
      label: <Link to={ADMIN_ROUTE_PATH.ADMIN_PRODUCT}>Danh sách sản phẩm</Link>,
    },
    {
      key: 'category',
      icon: '',
      label: <Link to={ADMIN_ROUTE_PATH.ADMIN_CATEGORY}>Danh mục sản phẩm</Link>,
    },
    {
      key: 'order',
      icon: '',
      label: (
        <Link to={ADMIN_ROUTE_PATH.ADMIN_ORDER} className={styles.linkOrder} onClick={onClickOrder}>
          Đơn hàng {c > 0 && <div className={styles.countOrder}>{c}</div>}
        </Link>
      ),
    },
    {
      key: 'users',
      icon: '',
      label: <Link to={ADMIN_ROUTE_PATH.ADMIN_USERS}>Danh sách người dùng</Link>,
    },
    {
      key: 'faqs',
      icon: '',
      label: <Link to={ADMIN_ROUTE_PATH.ADMIN_FAQS}>Danh sách FAQS</Link>,
    },
    {
      key: 'information',
      icon: '',
      label: <Link to={ADMIN_ROUTE_PATH.ADMIN_INFORMATION}>Thông tin cá nhân</Link>,
    },
    {
      key: 'user',
      icon: '',
      label: <Link to={ROUTE_PATH.HOME_PAGE}>Trang người dùng</Link>,
    },
  ];

  const keyActive = items.find((item) => item?.key === pathname.split('/')[2]);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className={styles.sideBar}
    >
      <Row align={'middle'} justify={'center'} style={{ paddingBottom: 16 }}>
        <Avatar
          size={64}
          src='https://leplateau.edu.vn/wp-content/uploads/2023/10/anh-mang-gai-1.jpg'
        />
      </Row>
      <Menu theme='dark' selectedKeys={[String(keyActive?.key)]} mode='inline' items={items} />
    </Sider>
  );
};

export default MenuSideBar;
