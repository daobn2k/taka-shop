import { Empty, Row, Select, Typography } from 'antd';
import type { SelectProps } from 'antd/es/select';
import classNames from 'classnames';

import styles from './index.module.scss';
import { Icon } from '../IconFont/Icon';

interface IInputSelectProps extends SelectProps {
  className?: string;
  label?: string;
  require?: boolean;
}
const InputSelect = (props: IInputSelectProps) => {
  const { className = '', label = '', require, options = [], ...rest } = props;
  return (
    <>
      {label && (
        <Row className={styles.rowLabel}>
          <Typography className={styles.title}>{label}</Typography>
          {require && <Typography className={styles.require}> &nbsp;*</Typography>}
        </Row>
      )}
      <Select
        {...rest}
        className={classNames('body-regular', styles.default, {
          [className]: !!className,
        })}
        suffixIcon={
          <Icon icon='t4font-ic-eva_arrow-ios-downward-fill' color='text-primary' style={{ fontSize: '20px' }} />
        }
        notFoundContent={<Empty description={'Không có dữ liệu'} />}
      >
        {options.map((option) => (
          <Select.Option key={option.id}>{option?.label}</Select.Option>
        ))}
      </Select>
    </>
  );
};
export default InputSelect;
