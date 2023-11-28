/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Form, Spin, message } from 'antd';
import type { TableProps } from 'antd/es/table';
import { useSearchParams } from 'react-router-dom';

import CustomModal from '@/components/UI/CustomModal';
import FooterModal from '@/components/UI/CustomModal/FooterModal';
import CustomPagination from '@/components/UI/CustomPagination';
import CustomTable from '@/components/UI/CustomTable';
import HeaderListTable from '@/components/UI/HeaderListTable';
import InputField from '@/components/UI/InputField';
import { useCustomNavigate } from '@/hooks/useCustomNavigate';
import FormSearchTable from '@/pages/FormSearchTable';
import GroupButtonSortTable from '@/pages/GroupButtonSortTable';
import { ADMIN_ROUTE_PATH } from '@/routes/route.constant';
import { formatParamsSearch } from '@/utils/common';

import styles from './index.module.scss';
import { useAdd, useDelete, useGetListUser, useUpdate } from './service';

const Users = () => {
  const refModalAdd = useRef<any>();
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
        title: 'Câu hỏi thường xuyên',
        dataIndex: 'question',
        key: 'question',
        width: 250,
      },
      {
        title: 'Câu trả lời ',
        dataIndex: 'answer',
        key: 'answer',
        width: 250,
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
              <ModalModifyFaqs data={record} refresh={refresh}>
                <EditOutlined className={styles.icon} />
              </ModalModifyFaqs>
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
  }, [dragMode, dataParams, onDelete, navigate, refresh]);

  const onSearch = (value: any) => {
    const payload: any = {
      page: 1,
    };
    if (value.name) {
      payload.question = value.name;
    }
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
      pathname: ADMIN_ROUTE_PATH.ADMIN_FAQS,
      data: payload,
    });
  };
  return (
    <Spin spinning={loading}>
      <div className={styles.wrap}>
        <HeaderListTable title='Danh sách FAQS' />
        <div className={styles.mainKeyword}>
          <div className={styles.filterList}>
            {!dragMode && (
              <FormSearchTable onSearch={onSearch} placeholder='Tìm kiếm theo câu hỏi' />
            )}
            <GroupButtonSortTable onClickAdd={() => refModalAdd?.current?.onOpen()} />
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
      <ModalModifyFaqs ref={refModalAdd} refresh={refresh} />
    </Spin>
  );
};

export default Users;

const ModifyFaqs = (props: any, ref: any) => {
  const { children, refresh, data } = props;
  const [form] = Form.useForm();
  const [v, setV] = useState<boolean>(false);

  const { run } = useAdd({
    onSuccess(res) {
      if (res?.data) {
        message.success('Tạo mới FAQ thành công');
        refresh();
      } else {
        message.error('Tạo mới FAQ thất bại');
      }
    },
  });

  const { run: onUpdate } = useUpdate({
    onSuccess(res) {
      if (res?.data) {
        message.success('Chỉnh sửa FAQ thành công');
        refresh();
      } else {
        message.error('chỉnh sửa FAQ thất bại');
      }
    },
  });

  const onCancel = () => {
    setV(false);
    form.resetFields();
  };
  const onOpen = () => setV(true);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ question: data?.question, answer: data?.answer });
    }
  }, [data]);
  useImperativeHandle(ref, () => ({
    onCancel,
    onOpen,
  }));

  const onFinish = (values: any) => {
    if (data?.id) {
      return onUpdate(data?.id, values);
    }
    run(values);
  };
  return (
    <>
      <div onClick={() => onOpen()}>{children}</div>
      <CustomModal visible={v} title='Tạo mới FAQS'>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name={'question'}
            rules={[{ message: 'Nhập câu hỏi thường xuyên', required: true }]}
          >
            <InputField
              label='Câu hỏi thường xuyên'
              require
              placeholder='Nhập câu hỏi thường xuyên'
            />
          </Form.Item>
          <Form.Item name={'answer'} rules={[{ message: 'Nhập câu trả lời', required: true }]}>
            <InputField label='Câu trả lời' require placeholder='Nhập câu trả lời' />
          </Form.Item>
          <Form.Item noStyle>
            <FooterModal
              titleRight='Tạo mới'
              titleLeft='Hủy'
              onCancel={onCancel}
              typeAction={'submit'}
            />
          </Form.Item>
        </Form>
      </CustomModal>
    </>
  );
};

const ModalModifyFaqs = forwardRef(ModifyFaqs);
