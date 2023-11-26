import { Row } from 'antd';

import Text from '@/components/UI/Text';

import styles from './index.module.scss';

interface IWrapperInfoDetail {
  children?: React.ReactNode;
  label?: string;
}
const WrapperInfoDetail = (props: IWrapperInfoDetail) => {
  const { children, label = '' } = props;
  return (
    <Row className={styles.wrap}>
      {label && (
        <div style={{ width: '100%' }}>
          <Text type='heading5-medium' color='primary-main'>
            {label}
          </Text>
        </div>
      )}
      {children}
    </Row>
  );
};

export default WrapperInfoDetail;
