import { useDebounceFn } from 'ahooks';
import { DatePicker, Form, Input, Row } from 'antd';
import dayjs from 'dayjs';

import { useGetParamsSearch } from '@/hooks/useGetParamsSearch';
import { formatFormValuesChange } from '@/utils/common';

import styles from './index.module.scss';

const { RangePicker } = DatePicker;
const FormSearch = ({
  onSearch,
}: {
  onSearch: (value: {
    search: string;
    start_created_date: string;
    end_created_date: string;
    category_id: any;
  }) => void;
}) => {
  const dataParams = useGetParamsSearch();

  const onFieldsChange = useDebounceFn(
    (_, allFields) => {
      const v = formatFormValuesChange(allFields);

      const values: any = {};

      if (v.date) {
        values.start_created_date = v.date[0]?.format('YYYY-MM-DD');
        values.end_created_date = v.date[1]?.format('YYYY-MM-DD');
      }

      if (v.name) {
        values.name = v.name;
      }
      onSearch(values);
    },
    {
      wait: 500,
    },
  );
  return (
    <Form
      onFieldsChange={onFieldsChange.run}
      initialValues={{
        name: dataParams?.name,
        date:
          dataParams?.start_created_date && dataParams?.end_created_date
            ? [dayjs(dataParams?.start_created_date), dayjs(dataParams?.end_created_date)]
            : undefined,
      }}
    >
      <Row align={'middle'} justify={'end'} className={styles.rowSearch}>
        <Form.Item name='name' noStyle>
          <Input placeholder='Tìm kiếm theo tên sản phẩm hoặc mã sản phẩm' />
        </Form.Item>
        <Form.Item name='date' noStyle>
          <RangePicker placeholder={['Từ ngày', 'Đến ngày']} format='DD-MM-YYYY' />
        </Form.Item>
      </Row>
    </Form>
  );
};

export default FormSearch;
