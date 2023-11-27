/* eslint-disable multiline-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';

import { Avatar, Badge, Dropdown, Input, Menu, Row } from 'antd';
import type { MenuProps } from 'antd';
import { useLocation } from 'react-router-dom';

import Button from '@/components/UI/Button';
import DrawerCart from '@/components/UI/DrawerCart';
import ModalLogin from '@/components/UI/ModalLogin';
import ModalLogout from '@/components/UI/ModalLogout/ModalLogout';
import Text from '@/components/UI/Text';
import { useCart } from '@/hooks/useCart';
import { useCustomNavigate } from '@/hooks/useCustomNavigate';
import { useGetParamsSearch } from '@/hooks/useGetParamsSearch';
import { ADMIN_ROUTE_PATH, ROUTE_PATH } from '@/routes/route.constant';
import { useCategory } from '@/store/category/useCategory';
import { useProfile } from '@/store/profile/useProfile';

import styles from './index.module.scss';

const { Search } = Input;

const formatItemMenu = (items: any[], onClickCategory: any) => {
  return items.map((e) => {
    return {
      key: 'sub-menu-key' + e.id,
      label: (
        <Text type='heading5-regular' key={e.key} onClick={() => onClickCategory(e)}>
          {e.name}
        </Text>
      ),
    };
  });
};
const getItemsMenu: (categories: any[], profile: any, quantity: any) => MenuProps['items'] = (
  categories: any[],
  profile,
  quantity,
) => {
  const dataDefault = [
    {
      label: <Text type='heading5-regular'>Trang chủ</Text>,
      key: 'home-page',
      icon: '',
    },
    {
      label: <Text type='heading5-regular'>Danh mục</Text>,
      key: 'category',
      icon: '',
      children: categories,
    },
    {
      label: <Text type='heading5-regular'>Sản phẩm</Text>,
      icon: '',
      key: 'product',
    },
    {
      label: <Text type='heading5-regular'>Sản phẩm hot</Text>,
      icon: '',
      key: 'product-hot',
    },
    {
      label: (
        <DrawerCart>
          <Badge count={quantity} showZero>
            <Text type='heading5-regular'>Giỏ hàng</Text>
          </Badge>
        </DrawerCart>
      ),
      icon: '',
      key: 'rating',
    },
  ];

  if (profile.role_id === 1) {
    dataDefault.push({
      label: <Text type='heading5-regular'>Admin</Text>,
      icon: '',
      key: 'admin',
    });
  }

  return dataDefault;
};
const MainHeader: React.FC = () => {
  const { navigate, onNavSearch } = useCustomNavigate();
  const dataParams = useGetParamsSearch();
  const profile = useProfile();
  const { cart } = useCart();
  const { pathname } = useLocation();
  const category = useCategory();

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'home-page') {
      navigate(ROUTE_PATH.HOME_PAGE);
    }
    if (e.key === 'product') {
      navigate(ROUTE_PATH.PRODUCT);
    }
    if (e.key === 'product-hot') {
      navigate(ROUTE_PATH.PRODUCT_HOT);
    }
    // if (e.key === 'rating') {
    //   navigate(ROUTE_PATH.RATING);
    // }
    if (e.key === 'admin') {
      navigate(ADMIN_ROUTE_PATH.ADMIN_PRODUCT);
    }
  };

  const onSearch = (name: string) => {
    onNavSearch({
      pathname: ROUTE_PATH.PRODUCT,
      data: { ...dataParams, name },
    });
  };

  const onClickCategory = (e: any) => {
    onNavSearch({
      pathname: ROUTE_PATH.CATEGORY,
      data: {
        ...dataParams,
        category_id: e?.id,
        category_name: e?.name,
      },
    });
  };
  const itemsMenu = useMemo(() => {
    return getItemsMenu(formatItemMenu(category, onClickCategory), profile, cart.length);
  }, [category, profile, cart]);

  const items: MenuProps['items'] = [
    {
      key: 'account',
      label: (
        <Text type='body-regular' color='text-primary'>
          Tài khoản
        </Text>
      ),
    },
    {
      key: 'logout',
      label: (
        <ModalLogout>
          <Text type='body-regular' color='text-primary'>
            Đăng xuất
          </Text>
        </ModalLogout>
      ),
    },
  ];
  return (
    <>
      <Row align={'middle'} className={styles.root}>
        <Text type='heading3-bold'>TAKA SHOP</Text>
        <Search
          placeholder='Tìm kiếm theo tên sản phẩm hoặc mã sản phẩm'
          onSearch={onSearch}
          enterButton
          style={{
            opacity:
              pathname === ROUTE_PATH.PRODUCT ||
              pathname === ROUTE_PATH.CATEGORY ||
              pathname === ROUTE_PATH.PRODUCT_HOT
                ? 0
                : 1,
          }}
        />
        {profile?.id ? (
          <Row align={'middle'} style={{ flexDirection: 'column', gap: 4 }}>
            <Dropdown menu={{ items }} placement='bottomLeft'>
              <Avatar src={profile?.avatar} size={36} />
            </Dropdown>
            <Text>{profile?.name}</Text>
          </Row>
        ) : (
          <ModalLogin>
            <Button type='primary'>Đăng nhập</Button>
          </ModalLogin>
        )}
      </Row>
      <Menu
        onClick={onClick}
        selectedKeys={[pathname.split('/')[1]]}
        mode='horizontal'
        items={itemsMenu}
        className={styles.menu}
      />
    </>
  );
};

export default MainHeader;
