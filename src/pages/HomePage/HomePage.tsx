import React, { useEffect, useMemo } from 'react';

import {
  InboxOutlined,
  LockOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Col, Row } from 'antd';

import { IProductData } from '@/api/interface';
import ListProduct from '@/components/UI/ListProduct/ListProduct';
import Text from '@/components/UI/Text';
import { useGetProduct, useGetProductHot } from '@/service.ts/product';

import Banner from './Banner';
import styles from './index.module.scss';
import WrapperHome from './WrapperHome';

const HomePage = () => {
  const requestGetProductHot = useGetProductHot();
  const requestGetProduct = useGetProduct();

  useEffect(() => {
    requestGetProduct.run({ limit: 4 });
    requestGetProductHot.run({ limit: 4 });
  }, []);

  const products: IProductData[] = useMemo(() => {
    return requestGetProduct?.data?.data ?? [];
  }, [requestGetProduct.data]);
  const productsHot: IProductData[] = useMemo(() => {
    return requestGetProductHot?.data?.data ?? [];
  }, [requestGetProductHot.data]);
  return (
    <div className={styles.wrap}>
      <Banner />
      <WrapperHome>
        <ListProduct data={products} title='Sản phẩm mới' tag='Sản phẩm mới' />
      </WrapperHome>
      <Row className={styles.rowDesc}>
        <Col span={6} className={styles.colItem}>
          <InboxOutlined />
          <Text>CAM KẾT HÀNG CHÍNH HÃNG</Text>
        </Col>
        <Col span={6} className={styles.colItem}>
          <LockOutlined />
          <Text>THANH TOÁN AN TOÀN</Text>
        </Col>
        <Col span={6} className={styles.colItem}>
          <ShoppingCartOutlined />
          <Text>MIỄN PHÍ VẬN CHUYỂN CHO MỌI ĐƠN HÀNG</Text>
        </Col>
        <Col span={6} className={styles.colItem}>
          <PhoneOutlined />
          <Col>
            <Text>BỘ PHẬN CHĂM SÓC KHÁCH HÀNG</Text>
          </Col>
        </Col>
      </Row>
      <WrapperHome>
        <ListProduct data={productsHot} title='Sản phẩm đánh giá cao' tag='Sản phẩm hot' />
      </WrapperHome>
    </div>
  );
};

export default HomePage;
