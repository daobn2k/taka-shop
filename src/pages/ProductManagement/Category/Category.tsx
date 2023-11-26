import { useEffect, useMemo } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Spin, message } from 'antd';
import type { TableProps } from 'antd/es/table';
import dayjs from 'dayjs';
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
import { useDelete, useGetListCategories } from './service';

const Category = () => {
  const [searchParams] = useSearchParams();

  const { data, run, loading, refresh } = useGetListCategories();
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
      message.success('Xóa thành công thể loại sản phẩm');
      refresh();
    },
    onError() {
      message.error('Xóa thành công thể loại sản phẩm');
    },
  });

  const onDelete = (id: any) => {
    onDele(id);
  };

  const columns = useMemo(() => {
    const defaultCols = [
      {
        title: 'Tên thể loại',
        dataIndex: 'name',
        key: 'name',
        width: 312,
      },
      {
        title: 'Thời gian tạo',
        dataIndex: 'created_at',
        key: 'created_at',
        sorter: (a: any, b: any) => dayjs(a.created_at).diff(dayjs(b.created_at)),
        render: (date: string) => {
          return formatDate(date);
        },
        width: 180,
      },
      // {
      //   title: 'Cập nhật gần nhất',
      //   dataIndex: 'updatedAt',
      //   key: 'updatedAt',
      //   sorter: (a: any, b: any) => dayjs(a.updatedAt).diff(dayjs(b.updatedAt)),
      //   render: (date: string) => {
      //     return formatDate(date);
      //   },
      //   width: 180,
      // },
      {
        title: 'Người cập nhật',
        dataIndex: 'create_uid',
        key: 'create_uid',
        render: (create_uid: any) => {
          return create_uid?.name;
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
              <EditOutlined
                className={styles.icon}
                onClick={() => navigate(`${ADMIN_ROUTE_PATH.MODIFY_CATEGORY}/${record?.id}`)}
              />
              <DeleteOutlined className={styles.icon} onClick={() => onDelete(record?.id)} />
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
  }, [dragMode, dataParams, onDelete]);

  const onSearch = (value: any) => {
    const payload = {
      page: 1,
      ...value,
    };
    onPushSearch(payload);
  };

  const onClickSort = (mode?: string) => {
    const dataMode = mode ? { mode } : undefined;
    onPushSearch(dataMode);
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
      pathname: ADMIN_ROUTE_PATH.ADMIN_CATEGORY,
      data: payload,
    });
  };
  return (
    <Spin spinning={loading}>
      <div className={styles.wrap}>
        <HeaderListTable title='Danh sách thể loại sản phẩm' />
        <div className={styles.mainKeyword}>
          <div className={styles.filterList}>
            {!dragMode && <FormSearchTable onSearch={onSearch} />}
            <GroupButtonSortTable
              onClickAdd={() => navigate(ADMIN_ROUTE_PATH.MODIFY_CATEGORY)}
              onClickSort={onClickSort}
            />
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

export default Category;
