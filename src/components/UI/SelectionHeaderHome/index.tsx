import styles from './index.module.scss';
import Text from '../Text';

interface ISelectionHeaderHomeProps {
  title?: string;
  onViewAll?: () => void;
  children?: React.ReactNode;
}
const SelectionHeaderHome = (props: ISelectionHeaderHomeProps) => {
  const { title, onViewAll, children } = props;

  return (
    <div className={styles.root}>
      <Text type='heading3-bold' color='text-primary' className={styles.title} onClick={onViewAll}>
        {title}
      </Text>
      {children}
    </div>
  );
};

export default SelectionHeaderHome;
