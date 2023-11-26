/* eslint-disable multiline-ternary */
import React from 'react';

import { Input, Row, Typography } from 'antd';
import { InputProps } from 'antd/lib/input/Input';
import classNames from 'classnames';

import styles from './index.module.scss';

interface IInputField extends InputProps {
  className?: string;
  placeholder?: string;
  suffix?: React.ReactNode | string | null;
  prefix?: React.ReactNode | string | null;
  value?: undefined | string;
  defaultValue?: string;
  disabled?: boolean;
  allowClear?: boolean;
  onChange?: undefined | ((event: React.ChangeEvent) => void);
  label?: string;
  require?: boolean;
}

const InputField = (props: IInputField) => {
  const {
    className = '',
    placeholder = '',
    suffix,
    prefix,
    allowClear = false,
    label = '',
    require,
    ...rest
  } = props;
  return (
    <>
      {label && (
        <Row className={styles.rowLabel}>
          <Typography className={styles.title}>{label}</Typography>
          {require && <Typography className={styles.require}> &nbsp;*</Typography>}
        </Row>
      )}
      {props?.type === 'password' ? (
        <Input.Password
          className={classNames('inputField', {
            [styles.inputTextField]: !suffix && !prefix,
            [styles.hasIcon]: !!suffix || !!prefix,
            [className]: !!className,
          })}
          placeholder={placeholder}
          suffix={suffix}
          prefix={prefix}
          allowClear={allowClear}
          {...rest}
        />
      ) : (
        <Input
          className={classNames('inputField', {
            [styles.inputTextField]: !suffix && !prefix,
            [styles.hasIcon]: !!suffix || !!prefix,
            [className]: !!className,
          })}
          placeholder={placeholder}
          suffix={suffix}
          prefix={prefix}
          allowClear={allowClear}
          {...rest}
        />
      )}
    </>
  );
};

InputField.displayName = 'InputField';

export default InputField;
