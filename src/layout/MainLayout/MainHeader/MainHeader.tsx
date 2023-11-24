import React from 'react';

import type { MenuProps } from 'antd';
import { Input, Menu, Row } from 'antd';
import { useLocation } from 'react-router-dom';

import Button from '@/components/UI/Button';
import Text from '@/components/UI/Text';
import { useCustomNavigate } from '@/hooks/useCustomNavigate';
import { useGetParamsSearch } from '@/hooks/useGetParamsSearch';
import { ROUTE_PATH } from '@/routes/route.constant';
import { useCategory } from '@/store/category/useCategory';

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
const getItemsMenu: (categories: any[]) => MenuProps['items'] = (categories: any[]) => {
  return [
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
      label: <Text type='heading5-regular'>Đánh giá</Text>,
      icon: '',
      key: 'rating',
    },
    {
      label: <Text type='heading5-regular'>Quản lý</Text>,
      icon: '',
      key: 'admin',
    },
  ];
};
const MainHeader: React.FC = () => {
  const { navigate, onNavSearch } = useCustomNavigate();
  const dataParams = useGetParamsSearch();
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
    if (e.key === 'rating') {
      navigate(ROUTE_PATH.RATING);
    }
    if (e.key === 'admin') {
      navigate(ROUTE_PATH.ADMIN);
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
              pathname ||
              ROUTE_PATH.PRODUCT_HOT
                ? 0
                : 1,
          }}
        />
        <Button type='primary'>Đăng nhập</Button>
      </Row>
      <Menu
        onClick={onClick}
        selectedKeys={[pathname.split('/')[1]]}
        mode='horizontal'
        items={getItemsMenu(formatItemMenu(category, onClickCategory))}
        className={styles.menu}
      />
    </>
  );
};

export default MainHeader;
