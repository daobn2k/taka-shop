import styles from './index.module.scss';
import Text from '../Text';

interface IHeaderListTable {
  title: string;
  children?: React.ReactNode;
  suffix?: React.ReactNode;
  onBack?: () => void;
  allowBack?: boolean;
}
const HeaderListTable = ({ title = '', children, allowBack, onBack, suffix }: IHeaderListTable) => {
  return (
    <div className={styles.root}>
      {allowBack && !suffix && (
        <img
          src='/svgIcon/ic-arrow-left.svg'
          alt=''
          onClick={onBack}
          className={styles.arrowIcon}
        />
      )}
      {suffix}
      <Text type={'heading4-medium'} color='text-primary'>
        {title}
      </Text>
      {children}
    </div>
  );
};

export default HeaderListTable;
