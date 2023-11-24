import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import { Image } from 'antd';

import styles from './index.module.scss';
import CustomModal from '../CustomModal';
import FooterModal from '../CustomModal/FooterModal';
import Text from '../Text';

interface IModalConfirm {
  children?: React.ReactNode;
  onClickAction?: () => void;
  loading?: boolean;
  text?: string;
  description?: string;
  title: string;
  icon?: string;
  titleLeft?: string;
  titleRight?: string;
}
const ModalConfirm = (props: IModalConfirm, ref?: any) => {
  const {
    children,
    loading,
    onClickAction,
    description = '',
    text = '',
    title = '',
    icon,
    titleLeft = 'Hủy',
    titleRight = 'Đăng nhập',
  } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const onCancel = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onOpen = () => {
    setVisible(true);
  };

  useImperativeHandle(ref, () => {
    return {
      onOpen,
      onCancel,
    };
  });

  return (
    <>
      {children}
      <CustomModal
        visible={visible}
        onCancel={onCancel}
        title={
          <div className={styles.titleHeader}>
            <Image
              src={icon || '/svgIcon/ic-exclamation-circle-blue.svg'}
              alt=''
              className={styles.icon}
              preview={false}
            />
            <Text type='heading5-medium' color='text-primary'>
              {title}
            </Text>
          </div>
        }
        closable={false}
        className={styles.modal}
      >
        <div className={styles.content}>
          <Text type={'body-regular'} color='text-primary'>
            {text}
            {description && <span className='body-bold'>{' ' + description}?</span>}
          </Text>
        </div>
        <FooterModal
          onCancel={onCancel}
          loadingAction={loading}
          onClickAction={onClickAction}
          typeAction='button'
          titleLeft={titleLeft}
          titleRight={titleRight}
        />
      </CustomModal>
    </>
  );
};

export default forwardRef(ModalConfirm);
