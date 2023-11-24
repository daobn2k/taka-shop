import React from 'react';

import { CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { LegacyButtonType } from 'antd/lib/button/button';
import { TextProps } from 'antd/lib/typography/Text';

import styles from './index.module.scss';

interface ModalProps {
  visible?: boolean;
  children?: React.ReactNode;
  title?: string | React.ReactNode | undefined;
  footer?: string | React.ReactNode | undefined;
  content?: string | React.ReactNode | undefined;
  className?: string;
  style?: React.CSSProperties;
  zIndex?: number;
  closeIcon?: React.ReactNode;
  centered?: boolean;
  titleProps?: TextProps;
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  width?: number;
  closable?: boolean;
  maskClosable?: boolean;
  animation?: string;
  maskAnimation?: string;
  okText?: React.ReactNode | string;
  cancelText?: React.ReactNode | string;
  okType?: LegacyButtonType;
  getContainer?: any;
}

const CustomModal = (props: ModalProps) => {
  const {
    visible,
    children,
    className,
    title,
    okText,
    okType,
    cancelText,
    onOk,
    onCancel,
    closeIcon,
    zIndex,
    closable,
  } = props;

  const IconVal = closeIcon || <CloseOutlined style={{ marginTop: '5px' }} />;

  return (
    <Modal
      title={title}
      open={visible}
      footer={false}
      onCancel={onCancel}
      onOk={onOk}
      destroyOnClose
      okText={okText}
      okType={okType}
      cancelText={cancelText}
      className={`${styles.modal} ${className}`}
      centered
      zIndex={zIndex}
      closable={closable}
      closeIcon={IconVal}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
