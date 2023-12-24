import { useEffect } from 'react';

import { Col, Row, Spin } from 'antd';

import HeaderListTable from '@/components/UI/HeaderListTable';
import Text from '@/components/UI/Text';
import { formatCurrencyVND } from '@/utils/common';

import styles from './index.module.scss';
import { useGetGeneral } from './service';

const Report = () => {
  const { loading, data, run } = useGetGeneral();

  useEffect(() => {
    run();
  }, []);

  return (
    <Spin spinning={loading}>
      <div className={styles.wrap}>
        <HeaderListTable title='Thống kế ' />
        <Row className={styles.listItem}>
          <Col span={7} className={styles.colItem}>
            <Text type='heading5-regular' className={styles.itemTitle}>
              Doanh số
            </Text>
            <Text type='heading3-bold' className={styles.value}>
              {formatCurrencyVND(data?.revenue)}
            </Text>
          </Col>
          <Col span={7} className={styles.colItem}>
            <Text type='heading5-regular' className={styles.itemTitle}>
              Doanh số dự kiến
            </Text>
            <Text type='heading3-bold' className={styles.value}>
              {formatCurrencyVND(data?.estimated_revenue)}
            </Text>
          </Col>
          <Col span={7} className={styles.colItem}>
            <Text type='heading5-regular' className={styles.itemTitle}>
              Tổng số người dùng
            </Text>
            <Text type='heading3-bold' className={styles.value}>
              {data?.total_user}
            </Text>
          </Col>
          <Col span={7} className={styles.colItem}>
            <Text type='heading5-regular' className={styles.itemTitle}>
              Tổng số quản lý
            </Text>
            <Text type='heading3-bold' className={styles.value}>
              {data?.total_admin}
            </Text>
          </Col>
          <Col span={7} className={styles.colItem}>
            <Text type='heading5-regular' className={styles.itemTitle}>
              Tổng số sản phẩm
            </Text>
            <Text type='heading3-bold' className={styles.value}>
              {data?.total_product}
            </Text>
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default Report;
