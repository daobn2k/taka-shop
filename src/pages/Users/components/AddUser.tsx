/* eslint-disable unicorn/consistent-function-scoping */
import { useEffect } from 'react';

import { Col, Form, Row, Spin, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { LIST_ACTIVE_USER, LIST_GENDER } from '@/api/data';
import FooterModal from '@/components/UI/CustomModal/FooterModal';
import HeaderListTable from '@/components/UI/HeaderListTable';
import InputField from '@/components/UI/InputField';
import InputSelect from '@/components/UI/InputSelect';
import WrapperInfoDetail from '@/components/UI/WrapperInfoDetail';
import { ADMIN_ROUTE_PATH } from '@/routes/route.constant';
import { formatUrlLeanCode } from '@/utils/common';
import { REG_PASSWORD } from '@/utils/reg';

import styles from './add-user.module.scss';
import { useAdd, useGetDetail, useUpdate } from '../service';

const AddUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();

  const { run: onAdd, loading: loadingAdd } = useAdd({
    onSuccess(res) {
      if (res?.data) {
        message.success(res.message);
        navigate(ADMIN_ROUTE_PATH.ADMIN_USERS);
      } else {
        message.error(res?.message);
      }
    },
    onError() {
      message.error('Tạo mới thất bại');
    },
  });

  const { run: onEdit, loading: loadingEdit } = useUpdate({
    onSuccess(res) {
      if (res?.data) {
        message.success(res.message ?? 'Chỉnh sửa thành công');
        navigate(ADMIN_ROUTE_PATH.ADMIN_USERS);
      }
    },
    onError() {
      message.error('Chỉnh sửa thất bại');
    },
  });

  const onCancel = () => {
    navigate(ADMIN_ROUTE_PATH.ADMIN_USERS);
  };

  const onFinish = (values: any) => {
    const payload: any = new FormData();
    payload.append('email', values.email);
    payload.append('name', values.name);
    payload.append('phone', values.phone);
    payload.append('address', values.address);
    payload.append('gender', values.gender);
    payload.append('role_id', 1);
    if (id) {
      const data = formatUrlLeanCode({
        email: values.email,
        name: values.name,
        phone: values.phone,
        address: values.address,
        gender: values.gender,
        role_id: 2,
      });
      return onEdit(id, data);
    }
    payload.append('password', values?.password);
    payload.append('password_confirmation', values.password);
    onAdd(payload);
  };

  const { run: onGetDetail, loading } = useGetDetail({
    onSuccess(res) {
      form.setFieldsValue({
        ...res.data,
      });
    },
    onError() {
      message.error('Lấy thông tin chi tiết đã có lỗi');
    },
  });
  useEffect(() => {
    if (id) {
      onGetDetail(id);
    }
  }, [id]);

  const validatePassword = () => ({
    // eslint-disable-next-line require-await
    async validator(_: any, value: any) {
      const isValidate = REG_PASSWORD.test(value);
      if (!isValidate && value) {
        throw new Error('Mật khẩu chứa tối thiểu 6 ký tự bao gồm: số và chữ cái');
      }
    },
  });

  return (
    <Form form={form} onFinish={onFinish} initialValues={{ status: LIST_ACTIVE_USER[0] }}>
      <Spin spinning={loading || loadingEdit || loadingAdd}>
        <div className={styles.root}>
          <HeaderListTable title={id ? 'Chỉnh sửa người dùng' : 'Thêm người dùng'}>
            <Form.Item noStyle>
              <FooterModal onCancel={onCancel} className={styles.footerButton} />
            </Form.Item>
          </HeaderListTable>
          <WrapperInfoDetail>
            <Row gutter={32}>
              <Col span={12}>
                <Form.Item
                  name='email'
                  rules={[
                    { required: true, message: 'Nhập email' },
                    { type: 'email', message: 'Không dúng định dạng email' },
                  ]}
                >
                  <InputField label='Email' require placeholder='Nhập email' />
                </Form.Item>
              </Col>
              {!id && (
                <Col span={12}>
                  <Form.Item
                    name='password'
                    rules={[{ required: true, message: 'Nhập mật khẩu' }, validatePassword]}
                  >
                    <InputField
                      label='Mật khẩu'
                      require
                      placeholder='Nhập mật khẩu'
                      type='password'
                    />
                  </Form.Item>
                </Col>
              )}

              <Col span={12}>
                <Form.Item name='name' rules={[{ required: true, message: 'Nhập họ và tên' }]}>
                  <InputField label='Họ và tên' require placeholder='Nhập họ và tên' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='address' rules={[{ required: true, message: 'Nhập địa chỉ' }]}>
                  <InputField label='Địa chỉ' require placeholder='Nhập địa chỉ' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='phone' rules={[{ required: true, message: 'Nhập số điện thoại' }]}>
                  <InputField
                    label='Số điện thoại'
                    require
                    placeholder='Nhập số điện thoại'
                    type='number'
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name='gender' rules={[{ required: true, message: 'Chọn giới tính' }]}>
                  <InputSelect
                    label='Chọn giới tính'
                    require
                    placeholder='Chọn giới tính'
                    options={LIST_GENDER}
                  />
                </Form.Item>
              </Col>
              {/* <Col span={12}>
                <Form.Item name='status' rules={[{ required: true, message: 'Chọn trạng thái' }]}>
                  <InputSelect
                    label='Trạng thái'
                    require
                    placeholder='Chọn trạng thái'
                    options={LIST_ACTIVE_USER}
                  />
                </Form.Item>
              </Col> */}
            </Row>
          </WrapperInfoDetail>
        </div>
      </Spin>
    </Form>
  );
};

export default AddUser;
