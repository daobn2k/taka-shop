/* eslint-disable require-await */
/* eslint-disable unicorn/consistent-function-scoping */
import { Form, Row } from 'antd';
import FormItem from 'antd/es/form/FormItem';

import FooterModal from '@/components/UI/CustomModal/FooterModal';
import InputField from '@/components/UI/InputField';
import Text from '@/components/UI/Text';
import { REG_PASSWORD } from '@/utils/reg';

import styles from './index.module.scss';
import { IPasswordPayload } from './service';

const Password = ({ form }: { form: any }) => {
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
    <Row className={styles.root}>
      <Row align={'middle'} justify={'space-between'}>
        <Text type='heading5-bold'>Mật khẩu</Text>
        <FormItem noStyle shouldUpdate>
          {(f) => {
            const values: IPasswordPayload = f.getFieldsValue();
            const disable =
              form.getFieldsError()?.some(({ errors }: { errors: any }) => errors.length) ||
              !values?.new_password ||
              !values?.old_password ||
              !values?.re_password;
            return <FooterModal className={styles.customBtn} hideAction={!!disable} />;
          }}
        </FormItem>
      </Row>

      <Row className={styles.information}>
        <Form.Item
          name='old_password'
          rules={[{ required: true, message: 'Nhập mật khẩu cũ' }, validatePassword]}
        >
          <InputField type='password' require label='Mật khẩu cũ' placeholder='Nhập mật khẩu cũ' />
        </Form.Item>
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
      </Row>
    </Row>
  );
};

export default Password;
