import { useDebounceFn } from 'ahooks';
import { DatePicker, Form, Input, Row } from 'antd';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';

import { Icon } from '@/components/UI/IconFont/Icon';
import { formatFormValuesChange, formatParamsSearch } from '@/utils/common';

import styles from './index.module.scss';

const { RangePicker } = DatePicker;

interface IProps {
  onSearch: (value: {
    search: string;
    start_created_date: string;
    end_created_date: string;
  }) => void;
  placeholder?: string;
}

const FormSearchTable = ({ onSearch, placeholder }: IProps) => {
  const [searchParams] = useSearchParams();

  const onFieldsChange = useDebounceFn(
    (_, allFields) => {
      const v = formatFormValuesChange(allFields);

      const values: any = {};

      if (v.date) {
        values.start_created_date = v.date[0]?.format('YYYY-MM-DD');
        values.end_created_date = v.date[1]?.format('YYYY-MM-DD');
      }

      if (v.search) {
        values.search = v.search;
      }

      onSearch(values);
    },
    {
      wait: 500,
    },
  );

  const dataParams = formatParamsSearch(searchParams);

  const disabledDate = (current: any) => {
    // Can not select days after today and before start Date
    const isBefore = dayjs().isBefore(current);
    return isBefore;
  };
  return (
    <>
      <Form
        onFieldsChange={onFieldsChange.run}
        initialValues={{
          search: dataParams?.search,
          date:
            dataParams?.start_created_date && dataParams?.end_created_date
              ? [dayjs(dataParams?.start_created_date), dayjs(dataParams?.end_created_date)]
              : undefined,
        }}
      >
        <Row align={'middle'} className={styles.searchLabelWrap}>
          <Form.Item name='search' className={styles.inputSearch}>
            <Input
              placeholder={placeholder ?? 'Tìm kiếm theo tên'}
              suffix={<Icon icon='t4font-ic-eva_search-fill' />}
            />
          </Form.Item>
          <Form.Item name={'date'} className={styles.datePicker}>
            <RangePicker
              placeholder={['Từ ngày tạo', 'Đến ngày tạo']}
              disabledDate={disabledDate}
            />
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default FormSearchTable;
