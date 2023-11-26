/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Spin, message } from 'antd';
import type { TableProps } from 'antd/es/table';
import { useSearchParams } from 'react-router-dom';

import { LIST_ACTIVE_USER } from '@/api/data';
import CustomPagination from '@/components/UI/CustomPagination';
import CustomTable from '@/components/UI/CustomTable';
import HeaderListTable from '@/components/UI/HeaderListTable';
import { useCustomNavigate } from '@/hooks/useCustomNavigate';
import FormSearchTable from '@/pages/FormSearchTable';
import GroupButtonSortTable from '@/pages/GroupButtonSortTable';
import { ADMIN_ROUTE_PATH } from '@/routes/route.constant';
import { formatParamsSearch } from '@/utils/common';

import styles from './index.module.scss';
import { useDelete, useGetListUser } from './service';

const Users = () => {
  const [searchParams] = useSearchParams();

  const { data, run, loading, refresh } = useGetListUser();
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
      message.success('Xóa thành công người dùng');
      refresh();
    },
    onError() {
      message.error('Xóa thất bại người dùng');
    },
  });

  const onDelete = (id: any) => {
    onDele(id);
  };

  const columns = useMemo(() => {
    const defaultCols = [
      {
        title: 'Họ và tên',
        dataIndex: 'name',
        key: 'name',
        width: 200,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 150,
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone',
        width: 150,
      },
      {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
        width: 150,
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        width: 150,
        render: (status: any) => LIST_ACTIVE_USER.find((i) => i.id === status)?.label,
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
                onClick={() => navigate(`${ADMIN_ROUTE_PATH.MODIFY_USER}/${record.id}`)}
              />
              <DeleteOutlined className={styles.icon} onClick={() => onDelete(record.id)} />
            </div>
          );
        },
      },
    ];
    if (dragMode) {
      return [
        {
          width: 40,
          key: 'sort',
          align: 'center' as any,
        },
        ...defaultCols,
      ];
    }
    return defaultCols;
  }, [dragMode, dataParams, onDelete, navigate]);

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
      pathname: ADMIN_ROUTE_PATH.MODIFY_USER,
      data: payload,
    });
  };
  return (
    <Spin spinning={loading}>
      <div className={styles.wrap}>
        <HeaderListTable title='Danh sách người dùng' />
        <div className={styles.mainKeyword}>
          <div className={styles.filterList}>
            {!dragMode && <FormSearchTable onSearch={onSearch} />}
            <GroupButtonSortTable onClickAdd={() => navigate(ADMIN_ROUTE_PATH.MODIFY_USER)} />
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

export default Users;
