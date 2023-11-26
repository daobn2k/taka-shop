/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';

import { Spin } from 'antd';
import type { TableProps } from 'antd/es/table';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';

import CustomPagination from '@/components/UI/CustomPagination';
import CustomTable from '@/components/UI/CustomTable';
import HeaderListTable from '@/components/UI/HeaderListTable';
import { useCustomNavigate } from '@/hooks/useCustomNavigate';
import FormSearchTable from '@/pages/FormSearchTable';
import { ADMIN_ROUTE_PATH } from '@/routes/route.constant';
import { formatDate, formatParamsSearch } from '@/utils/common';

import styles from './index.module.scss';
import { useGetListOrder } from './service';

const Order = () => {
  const [searchParams] = useSearchParams();

  const { data, run, loading } = useGetListOrder();
  const { onNavSearch, navigate } = useCustomNavigate();

  const dataParams = useMemo(() => {
    return formatParamsSearch(searchParams);
  }, [searchParams]);

  const dragMode = useMemo(() => {
    return dataParams?.mode === 'drag';
  }, [dataParams]);

  useEffect(() => {
    run(dataParams);
  }, [searchParams]);

  const columns = useMemo(() => {
    const defaultCols = [
      {
        title: 'Mã',
        dataIndex: 'code',
        key: 'code',
        width: 200,
      },
      {
        title: 'Thời gian tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: (a: any, b: any) => dayjs(a.createdAt).diff(dayjs(b.createdAt)),
        render: (date: string) => {
          return formatDate(date);
        },
        width: 180,
      },
      {
        title: 'Người đặt hàng',
        dataIndex: 'create_uid',
        key: 'create_uid',
        render: (create_uid: any) => {
          return create_uid?.name;
        },
        width: 232,
      },
      {
        title: 'Tổng tiền',
        dataIndex: 'total_price',
        key: 'total_price',
        render: (total_price: any) => {
          return total_price;
        },
        width: 100,
      },
      {
        title: 'Số lượng',
        dataIndex: 'total_quantity',
        key: 'total_quantity',
        render: (total_quantity: any) => {
          return total_quantity;
        },
        width: 100,
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (status: any) => {
          return status;
        },
        width: 232,
      },
      {
        width: 140,
        align: 'center' as any,
        title: '',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
        render: (_: any, record: any) => {
          return (
            <div className={styles.divAction}>
              <img
                src='/svgIcon/ic-solar_eye-bold.svg'
                alt=''
                className={styles.icon}
                onClick={() => navigate(`${ADMIN_ROUTE_PATH.MODIFY_ORDER}/${record?._id}`)}
              />
            </div>
          );
        },
      },
    ];
    return defaultCols;
  }, [navigate]);

  const onSearch = (value: any) => {
    const payload = {
      page: 1,
      ...value,
    };
    onPushSearch(payload);
  };

  const onChangePage = (page: number) => {
    const payload = {
      ...dataParams,
      page,
    };
    onPushSearch(payload);
  };
  // event change table
  const onChange: TableProps<any>['onChange'] = (_: any, filters: any, sort: any) => {
    const payload = {
      ...dataParams,
      sort_by: sort?.columnKey ?? '',
      order_by: sort?.order ?? '',
    };
    onPushSearch(payload);
  };

  const onPushSearch = (payload: any) => {
    onNavSearch({
      pathname: ADMIN_ROUTE_PATH.ADMIN_ORDER,
      data: payload,
    });
  };
  return (
    <Spin spinning={loading}>
      <div className={styles.wrap}>
        <HeaderListTable title='Lịch sử đơn hàng' />
        <div className={styles.mainKeyword}>
          <div className={styles.filterList}>
            {!dragMode && <FormSearchTable onSearch={onSearch} />}
          </div>
          <CustomTable
            dataSource={data?.data}
            columns={columns}
            scroll={{ x: dragMode ? 1050 : 1010 }}
            onChange={onChange}
          />
          {!dragMode && !!data?.total && (
            <CustomPagination
              page={data?.page}
              pageSize={data?.limit}
              total={data?.total}
              onChange={onChangePage}
            />
          )}
        </div>
      </div>
    </Spin>
  );
};

export default Order;
