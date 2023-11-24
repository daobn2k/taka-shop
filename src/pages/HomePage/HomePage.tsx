import React, { useEffect, useMemo } from 'react';

import { IProductData } from '@/api/interface';
import ListProduct from '@/components/UI/ListProduct/ListProduct';
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
      <WrapperHome>
        <ListProduct data={productsHot} title='Sản phẩm đánh giá cao' tag='Đánh giá cao' />
      </WrapperHome>
    </div>
  );
};

export default HomePage;
