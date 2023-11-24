import { useMemo } from 'react';

import { Pagination } from 'antd';

import styles from './index.module.scss';

interface ICustomPagination {
  page?: number;
  total?: number;
  pageSize?: number;
  onChange?: (page: number, pageSize: number) => void;
}
const CustomPagination = (props: ICustomPagination) => {
  const { page = 1, total = 0, pageSize = 10, onChange } = props;

  // add logic check show pagination page
  const isShowPagination = useMemo(() => {
    return total - pageSize > 0;
  }, [total, pageSize]);

  return (
    <div className={styles.pagination}>
      {isShowPagination && (
        <Pagination
          current={page}
          total={total}
          pageSize={pageSize}
          onChange={onChange}
          showSizeChanger={false}
        />
      )}
    </div>
  );
};

export default CustomPagination;
