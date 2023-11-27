/* eslint-disable multiline-ternary */

import { Col, Form, message, Row, Spin } from 'antd';
import classNames from 'classnames';

import Text from '@/components/UI/Text';
import WrapperInfoDetail from '@/components/UI/WrapperInfoDetail';
import { formatUrlLeanCode } from '@/utils/common';
import { localStorageUtils } from '@/utils/local-storage-utils';

import styles from './index.module.scss';
import Password from './Password';
import { useChangePassword } from './service';

interface IDetailInfo {
  title: string;
  value?: string | React.ReactNode;
  className?: string;
}
const DetailInfo = (props: IDetailInfo) => {
  const { title = '', value = '', className = '' } = props;
  return (
    <Row className={classNames(styles.detailInfo, { [className]: !!className })}>
      <Col span={6}>
        <Text type={'heading5-medium'} color='text-secondary'>
          {title}
        </Text>
      </Col>
      <Col span={18}>
        {
          <Text type='heading5-regular' color='text-primary'>
            {value}
          </Text>
        }
      </Col>
    </Row>
  );
};

interface IInformation {
  data: any;
}
const Information = (props: IInformation) => {
  const { data } = props;
  const [form] = Form.useForm();
  const profile: any = localStorageUtils.get('profile');
  const { run, loading } = useChangePassword({
    onSuccess(res: any) {
      if (res?.data) {
        message.success('Thay đổi mật khẩu thành công');
        form.resetFields();
      } else {
        message.error(res?.message ?? 'Thay đổi mật khẩu thất bại');
      }
    },
    onError() {},
  });

  const onFinish = (value: any) => {
    const payload: any = {
      password_confirmation: value.new_password,
      password: value.re_password,
    };

    run(formatUrlLeanCode(payload), profile?.id);
  };
  return (
    <Spin spinning={loading}>
      <Form form={form} onFinish={onFinish}>
        <WrapperInfoDetail label=''>
          <Row className={styles.information}>
            <Col span={24}>
              <Password form={form} />
            </Col>
            <Row className={styles.item}>
              <Row align={'middle'} justify={'space-between'}>
                <Text type='heading5-bold'>Thông tin cá nhân</Text>
              </Row>
              <Col span={24}>
                <DetailInfo title='Họ và tên' value={data?.name} />
                <DetailInfo title='Email' value={data?.email} />
                <DetailInfo title='Vị trí' value={data?.role_name} />
              </Col>
            </Row>
          </Row>
        </WrapperInfoDetail>
      </Form>
    </Spin>
  );
};

export default Information;
