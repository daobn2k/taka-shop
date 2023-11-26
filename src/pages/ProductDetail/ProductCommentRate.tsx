import { useEffect, useMemo, useRef } from 'react';

import { Rate, Input, Form, Row, List, Avatar, message } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

import Button from '@/components/UI/Button';
import CustomPagination from '@/components/UI/CustomPagination';
import Text from '@/components/UI/Text';
import { useAddRateCommentProduct, useGetRateComment } from '@/service/product';
import { useProfile } from '@/store/profile/useProfile';

import styles from './index.module.scss';

const { TextArea } = Input;

interface IRateComment {
  rating: number;
  comment: string;
  user: {
    data: {
      address: string;
      email: string;
      gender: string;
      id: number;
      name: string;
      phone: string;
      avatar: string;
    };
  };
  product: any;
  created_at: string;
}

const ProductCommentRate = ({ onOpenLogin }: { onOpenLogin: any }) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const profile = useProfile();
  const dataRef = useRef<any>({
    product_id: Number(id),
    limit: 6,
    page: 1,
  });

  const { run: getRate, loading: loadingGet, data } = useGetRateComment();
  const { run: addRateComment, loading } = useAddRateCommentProduct({
    onSuccess() {
      form.resetFields();
      getRate(dataRef.current);
    },
    onError() {
      message.error('Tạo đánh giá thất bại');
    },
  });
  const onFinish = (values: { comment: string; rating: number }) => {
    if (!profile) {
      return onOpenLogin();
    }
    const payload: any = new FormData();
    payload.append('user_id', profile?.id);
    payload.append('product_id', Number(id));
    payload.append('comment', values.comment);
    payload.append('rating', values.rating);
    addRateComment(payload);
  };

  useEffect(() => {
    if (id) {
      getRate(dataRef.current);
    }
  }, [id]);

  const rates: IRateComment[] = useMemo(() => {
    return data?.data ?? [];
  }, [data]);
  const onChangePage = (page: number) => {
    const newRef = { ...dataRef.current, page };
    dataRef.current = newRef;
    getRate(newRef);
  };

  return (
    <Row className={styles.rootCommentRate}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name='rating'>
          <Rate />
        </Form.Item>
        <Form.Item name='comment'>
          <TextArea rows={3} placeholder='Hãy để lại đánh giá cho sản phẩm trên' />
        </Form.Item>
        <Form.Item dependencies={['comment', 'rating']}>
          {() => {
            const comment = form.getFieldValue('comment');
            const rate = form.getFieldValue('rating');
            return (
              <Button disabled={!comment || !rate} htmlType='submit' loading={loading}>
                Đánh giá
              </Button>
            );
          }}
        </Form.Item>
      </Form>
      <Row style={{ marginTop: '20px', width: '100%' }}>
        <List
          itemLayout='vertical'
          size='large'
          dataSource={rates}
          style={{ width: '100%' }}
          loading={loadingGet}
          renderItem={(item: IRateComment) => (
            <List.Item className={styles.listItem}>
              <Row style={{ gap: 24 }}>
                <div>
                  <Row align={'middle'} style={{ flexDirection: 'column', gap: 12 }}>
                    <Avatar size={64} src={item?.user?.data?.avatar} />
                    <Text type='heading5-regular' color='text-primary'>
                      {item?.user?.data.name}
                    </Text>
                  </Row>
                </div>
                <div style={{ flex: 1 }}>
                  <Text type='caption-regular' color='text-secondary'>
                    {' '}
                    {dayjs(item?.created_at).format('DD/MM/YYYY')}
                  </Text>
                  <Rate value={item?.rating} disabled />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: String(item?.comment?.replaceAll('\n', '<br />')),
                    }}
                    className={classNames(styles.content, 'body-regular')}
                  ></div>
                </div>
              </Row>
            </List.Item>
          )}
        />
        <Row align={'middle'} justify={'center'} style={{ width: '100%' }}>
          <CustomPagination
            page={data?.meta?.pagination?.current_page}
            pageSize={data?.meta?.pagination?.per_page}
            total={data?.meta?.pagination?.total}
            onChange={onChangePage}
          />
        </Row>
      </Row>
    </Row>
  );
};

export default ProductCommentRate;
