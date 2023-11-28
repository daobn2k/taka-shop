/* eslint-disable multiline-ternary */
/* eslint-disable unicorn/no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
// components/CartProductList.tsx

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { EyeOutlined } from '@ant-design/icons';
import { Avatar, List, Row, Spin, Table, Tag } from 'antd';
import dayjs from 'dayjs';

import Button from '@/components/UI/Button';
import CustomModal from '@/components/UI/CustomModal';
import CustomPagination from '@/components/UI/CustomPagination';
import Text from '@/components/UI/Text';
import { useApproveOrder, useCancelOrder, useShipping } from '@/service/order';
import { useProfile } from '@/store/profile/useProfile';
import { formatCurrencyVND } from '@/utils/common';

import styles from './index.module.scss';
import { useGetOrders } from './service';

export enum StatusOrder {
  PENDING = 'PENDING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
}

const HistoryProductSell = () => {
  const profile = useProfile();

  const dataRef = useRef<any>({
    page: 1,
    limit: 20,
  });
  const { data, run, loading } = useGetOrders();
  useEffect(() => {
    if (profile) {
      dataRef.current = { user_id: profile.id, page: 1, limit: 20 };
      run(dataRef.current);
    }
  }, [profile]);

  const handleRefresh = () => {
    run(dataRef.current);
  };
  const columns = useMemo(() => {
    return [
      {
        title: 'Mã đơn hàng',
        key: 'code',
        dataIndex: 'code',
        width: 200,
      },
      {
        title: 'Tên sản phẩm',
        dataIndex: 'order_items',
        key: 'order_items',
        width: 400,
        render: (item: any) => {
          return (
            <ul>
              {item?.data?.length > 0 &&
                item?.data?.map((e: any, index: number) => {
                  return (
                    <li key={`order-item-${index}`} style={{ marginBottom: 8 }}>
                      {' '}
                      {e.product?.data?.name}
                    </li>
                  );
                })}
            </ul>
          );
        },
      },
      {
        title: 'Số lượng',
        dataIndex: 'total_quantity',
        key: 'total_quantity',
        align: 'center' as any,
        width: 100,
      },
      {
        title: 'Tổng tiền',
        dataIndex: 'total_amount',
        key: 'total_amount',
        width: 150,
        render: (price: number) => {
          return (
            <Text type='body-regular' color='text-primary'>
              {formatCurrencyVND(price)}
            </Text>
          );
        },
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        width: 150,
        render: (status: any) => {
          return <TagItem status={status} />;
        },
      },
      {
        title: 'Ngày đặt hàng',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 150,
        render: (uid: string) => {
          return dayjs(uid).format('DD/MM/YYYY');
        },
      },
      {
        title: '',
        dataIndex: 'action',
        key: 'action',
        width: 100,
        fixed: 'right' as any,
        align: 'center' as any,
        render: (_: any, record: any) => {
          return (
            <ModalViewOrder data={record} refresh={handleRefresh}>
              <EyeOutlined />
            </ModalViewOrder>
          );
        },
      },
    ];
  }, [handleRefresh]);

  const onChangePage = (page: number) => {
    const newParams = { ...dataRef.current, page };
    dataRef.current = newParams;
    run(newParams);
  };

  return (
    <div className={styles.wrap}>
      <Spin spinning={loading}>
        <Table
          dataSource={data?.data || []}
          columns={columns}
          pagination={false}
          scroll={{ y: 600 }}
        />
        {data && data?.meta?.pagination?.total && !loading ? (
          <CustomPagination
            total={data?.meta?.pagination?.total}
            page={data?.meta?.pagination?.curren_page}
            pageSize={data?.meta?.pagination?.per_page}
            onChange={onChangePage}
          />
        ) : (
          <></>
        )}
      </Spin>
    </div>
  );
};

export default HistoryProductSell;

export const ModalView = (
  { children, data, refresh }: { children?: React.ReactNode; data: any; refresh: any },
  ref: any,
) => {
  const [visible, setVisible] = useState<boolean>(false);

  const profile = useProfile();
  const onCancel = () => setVisible(false);

  const { run: onCancelOrder, loading: loadingCancel } = useCancelOrder({
    onSuccess() {
      refresh();
    },
  });
  const { run: onShip, loading: loadingShip } = useShipping({
    onSuccess() {
      refresh();
    },
  });

  const { run: onApprove, loading: loadingApprove } = useApproveOrder({
    onSuccess() {
      refresh();
    },
  });

  useImperativeHandle(ref, () => ({ onCancel }));

  return (
    <>
      <div onClick={() => setVisible((prev) => !prev)}>{children}</div>
      <CustomModal
        visible={visible}
        onCancel={onCancel}
        title={
          <div className={styles.titleHeader}>
            <Text type='heading5-medium' color='text-primary'>
              {'Chi tiết đơn hàng'} - {data?.code} - {dayjs(data?.create_at).format('DD/MM/YYYY')}
            </Text>
            <TagItem status={data?.status} />
          </div>
        }
        closable={false}
        className={styles.modal}
      >
        <Spin spinning={loadingCancel || loadingApprove || loadingShip}>
          <List
            dataSource={data?.order_items?.data}
            className={styles.list}
            renderItem={(item: any) => {
              const product = item?.product?.data;
              const priceDiscount =
                product?.price_discount > 0
                  ? product?.price - product?.price_discount
                  : product?.price;
              return (
                <List.Item>
                  <Avatar src={product.image} size={96} shape='square' />
                  <Row className={styles.rowItem}>
                    <Text type='body-bold'>
                      {product.name} &nbsp; - &nbsp; <Text element='span'>{item.size}</Text>
                    </Text>
                    <Text type='body-bold'>
                      {formatCurrencyVND(priceDiscount)}
                      &nbsp;
                      {product?.price_discount > 0 && (
                        <Text
                          element='span'
                          type='body-medium'
                          color='text-secondary'
                          className={styles.textThrough}
                        >
                          {formatCurrencyVND(product?.price)}
                        </Text>
                      )}
                    </Text>
                    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                      <Text color='text-primary' type='body-medium'>
                        {item.quantity}
                      </Text>
                    </div>
                  </Row>
                </List.Item>
              );
            }}
          />
          <Row align={'middle'} justify={'space-between'}>
            <Text type='heading5-bold' color='text-primary'>
              Tổng tiền : {formatCurrencyVND(data?.total_amount)}
            </Text>
            <div className={styles.grButton}>
              {(data?.status === '0' || data.status === '1') && (
                <Button className={styles.btnCancel} onClick={() => onCancelOrder(data?.id)}>
                  Hủy đơn hàng
                </Button>
              )}
              {data?.status === '0' && profile?.role_id === 1 && (
                <Button className={styles.btnShip} onClick={() => onShip(data?.id)}>
                  Chuyển ship
                </Button>
              )}
              {data?.status === '1' && profile?.role_id === 1 && (
                <Button className={styles.btnOrdered} onClick={() => onApprove(data?.id)}>
                  Đã nhận hàng
                </Button>
              )}
            </div>
          </Row>
        </Spin>
      </CustomModal>
    </>
  );
};

export const ModalViewOrder = forwardRef(ModalView);

export const TagItem = ({ status }: { status: any }) => {
  return status === '0' ? (
    <Tag color='processing'>Đang xử lý</Tag>
  ) : status === '1' ? (
    <Tag color='warning'>Đang vận chuyển</Tag>
  ) : status === '3' ? (
    <Tag color='red'>Đã hủy</Tag>
  ) : (
    <Tag color='success'>Đã thanh toán</Tag>
  );
};
