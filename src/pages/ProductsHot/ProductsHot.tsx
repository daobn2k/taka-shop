import React, { useEffect, useMemo, useRef } from 'react';

import { Empty, Row, Spin } from 'antd';

import { IProductData } from '@/api/interface';
import CustomPagination from '@/components/UI/CustomPagination';
import ListProduct from '@/components/UI/ListProduct/ListProduct';
import SelectionHeaderHome from '@/components/UI/SelectionHeaderHome';
import { useCustomNavigate } from '@/hooks/useCustomNavigate';
import { useGetParamsSearch } from '@/hooks/useGetParamsSearch';
import { ROUTE_PATH } from '@/routes/route.constant';
import { useGetProduct } from '@/service.ts/product';

import styles from './index.module.scss';
import FormSearch from '../Products/FormSearch';

const ProductsHot = () => {
  const { onNavSearch } = useCustomNavigate();
  const dataParams = useGetParamsSearch();

  const dataRef = useRef<any>({
    page: 1,
    limit: 12,
  });
  const { run, data, loading } = useGetProduct();
  useEffect(() => {
    if (dataParams) {
      run({ ...dataRef.current, ...dataParams });
    }
  }, [dataParams]);

  const products: IProductData[] = useMemo(() => {
    return data?.data ?? [];
  }, [data]);

  const onChangePage = (page: number) => {
    const newParams = { ...dataRef.current, ...dataParams, page };
    onNavSearch({ pathname: ROUTE_PATH.PRODUCT, data: newParams });
  };

  const onSearch = (values: any) => {
    const payload = {
      ...dataRef.current,
      ...dataParams,
      page: 1,
      ...values,
    };
    onNavSearch({ pathname: ROUTE_PATH.PRODUCT, data: payload });
  };
  return (
    <div className={styles.root}>
      <Spin spinning={loading} className={styles.spin}>
        <SelectionHeaderHome title={dataParams?.category_name ?? 'Sản phẩm hot'}>
          <FormSearch onSearch={onSearch} />
        </SelectionHeaderHome>
        {products?.length > 0 && (
          <>
            <ListProduct data={products} tag='Sản phẩm hot' />
            <Row align={'middle'} justify={'center'}>
              <CustomPagination
                page={data?.meta?.pagination?.current_page}
                pageSize={data?.meta?.pagination?.per_page}
                total={data?.meta?.pagination?.total}
                onChange={onChangePage}
              />
            </Row>
          </>
        )}
        {products?.length <= 0 && (
          <Row align={'middle'} justify={'center'}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Chưa có sản phẩm hot' />
          </Row>
        )}
      </Spin>
    </div>
  );
};

export default ProductsHot;
