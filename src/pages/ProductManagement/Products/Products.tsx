/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Spin, message } from 'antd';
import type { TableProps } from 'antd/es/table';
import { useSearchParams } from 'react-router-dom';

import CustomPagination from '@/components/UI/CustomPagination';
import CustomTable from '@/components/UI/CustomTable';
import HeaderListTable from '@/components/UI/HeaderListTable';
import { useCustomNavigate } from '@/hooks/useCustomNavigate';
import FormSearchTable from '@/pages/FormSearchTable';
import GroupButtonSortTable from '@/pages/GroupButtonSortTable';
import { ADMIN_ROUTE_PATH } from '@/routes/route.constant';
import { formatDate, formatParamsSearch } from '@/utils/common';

import styles from './index.module.scss';
import { useDelete, useGetList } from './service';

const Products = () => {
  const [searchParams] = useSearchParams();

  const { data, run, loading, refresh } = useGetList();
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

  const { run: onDele } = useDelete({
    onSuccess() {
      message.success('Xóa thành công sản phẩm');
      refresh();
    },
    onError() {
      message.error('Xóa thất bại sản phẩm');
    },
  });

  const onDelete = (id: any) => {
    onDele(id);
  };

  const columns = useMemo(() => {
    const defaultCols = [
      {
        title: 'Mã sản phẩm',
        dataIndex: 'code',
        key: 'code',
        width: 125,
      },
      {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        key: 'name',
        width: 200,
      },
      {
        title: 'Ảnh sản phẩm',
        dataIndex: 'image',
        key: 'image',
        width: 100,
        align: 'center',
        render: (image: string) => <Avatar src={image} size={96} shape='square' />,
      },
      {
        title: 'Thông tin sản phẩm',
        dataIndex: 'description',
        key: 'description',
        width: 200,
      },
      {
        title: 'Thời gian tạo',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (date: string) => {
          return formatDate(date);
        },
        width: 180,
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
              <EditOutlined
                className={styles.icon}
                onClick={() => navigate(`${ADMIN_ROUTE_PATH.MODIFY_PRODUCT}/${record?.id}`)}
              />
              <DeleteOutlined className={styles.icon} onClick={() => onDelete(record?.id)} />
            </div>
          );
        },
      },
    ];

    return defaultCols;
  }, [onDelete, navigate]);

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
      pathname: ADMIN_ROUTE_PATH.ADMIN_PRODUCT,
      data: payload,
    });
  };
  return (
    <Spin spinning={loading}>
      <div className={styles.wrap}>
        <HeaderListTable title='Danh sách sản phẩm' />
        <div className={styles.mainKeyword}>
          <div className={styles.filterList}>
            {!dragMode && <FormSearchTable onSearch={onSearch} />}
            <GroupButtonSortTable onClickAdd={() => navigate(ADMIN_ROUTE_PATH.MODIFY_PRODUCT)} />
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

export default Products;
