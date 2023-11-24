import classNames from 'classnames';

import styles from './footer-modal.module.scss';
import Button from '../Button';
import ButtonPrimary from '../Button/ButtonPrimary';

interface IFooterModalProps {
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  titleLeft?: string;
  titleRight?: string;
  hideAction?: boolean;
  loadingAction?: boolean;
  typeAction?: any;
  onClickAction?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
const FooterModal = (props: IFooterModalProps) => {
  const {
    onCancel,
    titleLeft,
    titleRight,
    hideAction,
    loadingAction,
    typeAction = 'submit',
    onClickAction,
    className = '',
  } = props;
  return (
    <div className={classNames(styles.buttonFooter, { [className]: !!className })}>
      {onCancel && (
        <Button className={styles.buttonCancel} onClick={onCancel} size='small'>
          {titleLeft ?? 'Hủy'}
        </Button>
      )}
      <ButtonPrimary
        htmlType={typeAction}
        loading={loadingAction}
        disabled={hideAction}
        onClick={onClickAction}
        className={styles.buttonNext}
      >
        {titleRight ?? 'Xác nhận'}
      </ButtonPrimary>
    </div>
  );
};

export default FooterModal;
