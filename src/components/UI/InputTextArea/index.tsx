import { Row, Typography } from 'antd';
import TextArea, { TextAreaProps } from 'antd/lib/input/TextArea';
import classNames from 'classnames';

import styles from './index.module.scss';

interface ITextAreaProps extends TextAreaProps {
  label?: string;
  require?: boolean;
  className?: string;
}
const InputTextArea = (props: ITextAreaProps) => {
  const { label, require, className = '', ...rest } = props;
  return (
    <>
      {label && (
        <Row className={styles.rowLabel}>
          <Typography className={styles.label}>{label}</Typography>
          {require && <Typography className={styles.require}> &nbsp;*</Typography>}
        </Row>
      )}
      <TextArea
        {...rest}
        className={classNames('body-regular', styles.default, {
          [className]: !!className,
        })}
      />
    </>
  );
};

export default InputTextArea;
