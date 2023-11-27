import React, { forwardRef, useImperativeHandle, useState } from 'react';

import { Form, Row, message } from 'antd';
import { useAtom } from 'jotai';

import { useAuthLogin } from '@/service/user';
import { atomProfile } from '@/store/profile/profile';
import { localStorageUtils } from '@/utils/local-storage-utils';

import styles from './index.module.scss';
import CustomModal from '../CustomModal';
import FooterModal from '../CustomModal/FooterModal';
import InputField from '../InputField';
import Text from '../Text';

const LoginModal = ({ children }: { children?: React.ReactNode }, ref: any) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [, setProfile] = useAtom(atomProfile);
  const { run } = useAuthLogin({
    onSuccess(res) {
      if (res?.data) {
        setProfile(res?.data);
        localStorageUtils.set('profile', res?.data);
        onCancel();
        message.success('Đăng nhập thành công');
      } else {
        message.error('Đăng nhập thất bại kiểm tra lại thông tin');
      }
    },
    onError() {
      message.error('Đăng nhập thất bại kiểm tra lại thông tin');
    },
  });

  const onOpen = () => setVisible(true);
  const onCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const onFinish = (values: { email: string; password: string }) => {
    const payload: any = new FormData();
    payload.append('email', values.email);
    payload.append('password', values.password);

    run(payload);
  };

  useImperativeHandle(ref, () => ({
    onCancel,
    onOpen,
  }));
  return (
    <>
      <div onClick={onOpen}>{children}</div>
      <CustomModal
        visible={visible}
        title='Đăng nhập'
        onCancel={onCancel}
        width={400}
        closable={true}
        className={styles.modal}
      >
        <Form name='loginForm' onFinish={onFinish} form={form} style={{ margin: '12px 0' }}>
          <Row style={{ display: 'flex', flexDirection: 'column' }}>
            {isSignUp && (
              <Form.Item
                name='name'
                rules={[
                  {
                    required: true,
                    message: 'Nhập họ và tên',
                  },
                ]}
              >
                <InputField label='Họ và tên' require placeholder='Nhập họ và tên' />
              </Form.Item>
            )}
            {isSignUp && (
              <Form.Item
                name='phone'
                rules={[
                  {
                    required: true,
                    message: 'Nhập số điện thoại',
                  },
                ]}
              >
                <InputField label='Số điện thoại' require placeholder='Nhập số điện thoại' />
              </Form.Item>
            )}
            <Form.Item
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Nhập email đăng nhập',
                },
              ]}
            >
              <InputField label='Email' require placeholder='Điền địa chỉ email' />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Nhập mật khẩu',
                },
              ]}
            >
              <InputField label='Mật khẩu' require placeholder='Nhập mật khẩu' type='password' />
            </Form.Item>
            {isSignUp && (
              <Form.Item
                name='re-password'
                rules={[
                  {
                    required: true,
                    message: 'Nhập password',
                  },
                ]}
              >
                <InputField
                  label='Xác nhận mật khẩu'
                  require
                  placeholder='Nhập mật khẩu '
                  type='password'
                />
              </Form.Item>
            )}
          </Row>

          <Form.Item>
            <FooterModal onCancel={onCancel} className={styles.footerModal} />
          </Form.Item>
        </Form>
        <Row
          align={'middle'}
          justify={'center'}
          style={{ cursor: 'pointer' }}
          onClick={() => setIsSignUp((prev) => !prev)}
        >
          <Text color='primary-main' type='body-medium'>
            {isSignUp ? 'Đã có tài khoản quay lại đăng nhập' : ' Chưa có tài khoản?'}
          </Text>
        </Row>
      </CustomModal>
    </>
  );
};

export default forwardRef(LoginModal);
