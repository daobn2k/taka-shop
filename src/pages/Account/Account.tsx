/* eslint-disable multiline-ternary */

import { Row, Spin } from 'antd';

import HeaderListTable from '@/components/UI/HeaderListTable';
import { useProfile } from '@/store/profile/useProfile';

import styles from './index.module.scss';
import Information from './Infomation';

const Account = () => {
  const profile = useProfile();

  return (
    <Spin spinning={false}>
      <Row className={styles.root}>
        <HeaderListTable title='Thông tin tài khoản' />
        <Information data={profile} />
      </Row>
    </Spin>
  );
};

export default Account;
