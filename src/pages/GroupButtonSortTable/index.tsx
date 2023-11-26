import { PlusOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';

import Button from '@/components/UI/Button';

import styles from './index.module.scss';

interface IGroupButtonSortTable {
  onClickAdd?: () => void;
  onClickSort?: (mode: string) => void;
}
const GroupButtonSortTable = (props: IGroupButtonSortTable) => {
  const { onClickAdd } = props;
  return (
    <Row gutter={8} className={styles.rootBtnSearch}>
      <Col>
        <Button className={styles.buttonAdd} onClick={onClickAdd} size='small'>
          <PlusOutlined />
          Thêm mới
        </Button>
      </Col>
    </Row>
  );
};

export default GroupButtonSortTable;
