/* eslint-disable unicorn/consistent-function-scoping */
import { useEffect } from 'react';

import { Col, Form, Row, message } from 'antd';
import { useAtom } from 'jotai';

import { LIST_GENDER } from '@/api/data';
import Button from '@/components/UI/Button';
import InputField from '@/components/UI/InputField';
import InputSelect from '@/components/UI/InputSelect';
import { atomProfile } from '@/store/profile/profile';
import { formatUrlLeanCode } from '@/utils/common';
import { localStorageUtils } from '@/utils/local-storage-utils';

import styles from './index.module.scss';
import { useUpdate } from '../Users/service';

const Info = () => {
  const [profile, setProfile] = useAtom(atomProfile);
  const [form] = Form.useForm();

  useEffect(() => {
    if (profile?.id) {
      form.setFieldsValue(profile);
    }
  }, [profile]);

  const { run, loading } = useUpdate({
    onSuccess(res) {
      if (res?.data) {
        setProfile(res?.data);
        localStorageUtils.set('profile', res?.data);
        message.success('Cập nhật thành công');
      } else {
        message.success('Cập nhật thất bại');
      }
    },
  });
  const onFinish = (values: any) => {
    const data = formatUrlLeanCode({
      email: values.email,
      name: values.name,
      phone: values.phone,
      address: values.address,
      gender: values.gender,
      role_id: 1,
    });
    run(profile?.id, data);
  };

  return (
    <div className={styles.wrapperFormItem}>
      <Form form={form} onFinish={onFinish}>
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item name={'email'} rules={[{ required: true, message: 'Nhập email' }]}>
              <InputField label='Email' placeholder='Nhập email' require disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={'name'} rules={[{ required: true, message: 'Nhập họ và tên' }]}>
              <InputField label='Họ và tên' placeholder='Nhập họ và tên' require />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={'phone'} rules={[{ required: true, message: 'Nhập số điện thoại' }]}>
              <InputField label='Số điện thoại' placeholder='Nhập số điện thoại' require />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={'address'} rules={[{ required: true, message: 'Nhập địa chỉ' }]}>
              <InputField label='Địa chỉ' placeholder='Nhập địa chỉ' require />
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
          <Col span={24}>
            <Form.Item name='gender' rules={[{ required: true, message: 'Chọn giới tính' }]}>
              <Button htmlType='submit' loading={loading} disabled={loading}>
                Thay đổi thông tin
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Info;
