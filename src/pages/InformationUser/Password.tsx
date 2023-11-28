/* eslint-disable require-await */
/* eslint-disable no-throw-literal */
/* eslint-disable unicorn/consistent-function-scoping */
import { Col, Form, Row, Spin, message } from 'antd';
import FormItem from 'antd/es/form/FormItem';

import FooterModal from '@/components/UI/CustomModal/FooterModal';
import HeaderListTable from '@/components/UI/HeaderListTable';
import InputField from '@/components/UI/InputField';
import WrapperInfoDetail from '@/components/UI/WrapperInfoDetail';
import { localStorageUtils } from '@/utils/local-storage-utils';
import { REG_PASSWORD } from '@/utils/reg';

import styles from './index.module.scss';
import { IPasswordPayload, useChangePassword } from './service';

const Password = () => {
  const [form] = Form.useForm();
  const { run, loading } = useChangePassword({
    onSuccess(data) {
      if (data?.data) {
        message.success('Thay đổi mật khẩu thành công');
        form.resetFields();
      } else {
        message.error(data?.message ?? 'Thay đổi mật khẩu thất bại');
      }
    },
  });

  const onFinish = (value: IPasswordPayload) => {
    const profile: any = localStorageUtils.get('profile');
    run(
      {
        password_confirmation: value.new_password,
        password: value?.re_password,
      },
      profile?.id,
    );
  };

  return (
    <Spin spinning={loading}>
      <Form name='form-password' form={form} onFinish={onFinish}>
        <Row className={styles.root}>
          <HeaderListTable title='Mật khẩu'></HeaderListTable>
          <Information form={form} />
        </Row>
      </Form>
    </Spin>
  );
};

export default Password;

const Information = ({ form }: { form: any }) => {
  const validatePassword = () => ({
    async validator(_: any, value: any) {
      const isValidate = REG_PASSWORD.test(value);
      if (!isValidate && value) {
        throw new Error('Mật khẩu chứa tối thiểu 6 ký tự bao gồm: số và chữ cái');
      }
    },
  });
  const validateRePassword = ({ getFieldValue }: any) => ({
    async validator(_: any, value: any) {
      const newPassword: string = getFieldValue('new_password');
      const isValidate = REG_PASSWORD.test(value);
      if (!isValidate && value) {
        throw new Error('Mật khẩu chứa tối thiểu 6 ký tự bao gồm: số và chữ cái');
      }
      if (value && newPassword !== value) {
        throw new Error('Mật khẩu mới không trùng khớp');
      }
    },
  });
  return (
    <WrapperInfoDetail label=''>
      <Row className={styles.information} gutter={32}>
        <Col span={8}>
          <Form.Item
            name='old_password'
            rules={[{ required: true, message: 'Nhập mật khẩu cũ' }, validatePassword]}
          >
            <InputField
              type='password'
              require
              label='Mật khẩu cũ'
              placeholder='Nhập mật khẩu cũ'
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name='new_password'
            rules={[{ required: true, message: 'Nhập mật khẩu mới' }, validatePassword]}
          >
            <InputField
              type='password'
              require
              label='Mật khẩu mới'
              placeholder='Nhập mật khẩu mới'
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name='re_password'
            rules={[{ required: true, message: 'Nhập xác nhận mật khẩu mới' }, validateRePassword]}
          >
            <InputField
              type='password'
              require
              label='Xác nhận mật khẩu mới'
              placeholder='Xác nhận mật khẩu mới'
            />
          </Form.Item>
        </Col>
        <Col>
          <FormItem noStyle shouldUpdate>
            {(f) => {
              const values: IPasswordPayload = f.getFieldsValue();
              const disable =
                form.getFieldsError()?.some(({ errors }: { errors: any }) => errors.length) ||
                !values?.new_password ||
                !values?.old_password ||
                !values?.re_password;
              return (
                <FooterModal
                  className={styles.customBtn}
                  hideAction={!!disable}
                  titleRight='Thay đổi mật khẩu'
                />
              );
            }}
          </FormItem>
        </Col>
      </Row>
    </WrapperInfoDetail>
  );
};
