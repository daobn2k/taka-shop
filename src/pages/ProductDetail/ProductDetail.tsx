import { useEffect, useMemo, useRef, useState } from 'react';

import type { TabsProps } from 'antd';
import { Breadcrumb, Button, Card, Col, Image, Row, Spin, Tabs } from 'antd';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import { IProductData, TProductSize } from '@/api/interface';
import ModalLogin from '@/components/UI/ModalLogin';
import Text from '@/components/UI/Text';
import { useCart } from '@/hooks/useCart';
import { useLogin } from '@/hooks/useLogin';
import { useGetProductShow } from '@/service/product';
import { ICart } from '@/store/cart/cart';
import { formatCurrencyVND } from '@/utils/common';

import styles from './index.module.scss';
import ProductCommentRate from './ProductCommentRate';

const ProductDetail = () => {
  const refModalLogin = useRef<any>();
  const { id } = useParams();
  // const { run: getRelated, data: dataRelated, loading: loadingRelated } = useGetProductRelated();
  const { run, data, loading } = useGetProductShow({
    onSuccess(res) {
      if (res?.data?.category?.data?.id) {
        // getRelated({ limit: 12, page: 1, category_id: Number(res?.data?.category?.data?.id) });
      }
    },
  });
  const [quantity, setQuantity] = useState<number>(1);
  const [tabActive, setTabActive] = useState('rate');
  const [size, setSize] = useState<TProductSize>('S');
  const { onModifyCart, cart, onAddCart } = useCart();
  const isLogin = useLogin();

  useEffect(() => {
    if (id) {
      run(Number(id));
    }
  }, [id]);

  const detail: IProductData = useMemo(() => {
    return data?.data;
  }, [data]);

  const onChange = (key: string) => setTabActive(key);

  const onOpenLogin = () => refModalLogin?.current?.onOpen();
  const onUpdateQ = (quantity: number) => {
    if (!isLogin) {
      return onOpenLogin();
    }
    setQuantity(quantity);
  };

  const onAddToCart = () => {
    if (!isLogin) {
      return onOpenLogin();
    }

    const cartDetail = cart.find((c: ICart) => c.id === Number(id));
    if (cartDetail?.quantity && cartDetail.size === size) {
      onModifyCart(Number(id), cartDetail?.quantity + quantity, size);
    } else {
      onAddCart(
        {
          ...data?.data,
        },
        quantity,
        size,
      );
    }
  };

  const items: TabsProps['items'] = [
    {
      key: 'rate',
      label: 'Đánh giá',
      children: <ProductCommentRate onOpenLogin={onOpenLogin} />,
    },
  ];

  // const images = useMemo(() => {
  //   return dataRelated?.data?.map((e: IProductData) => ({ image: e.image, id: e.id })) || [];
  // }, [dataRelated]);
  return (
    <Spin spinning={loading}>
      <div style={{ padding: 24 }}>
        <Row style={{ margin: '24px 0' }}>
          <Breadcrumb
            items={[
              {
                title: 'Sản phẩm',
              },
              {
                title: detail?.name,
              },
            ]}
          />
        </Row>
        <Row gutter={16}>
          <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
            <Row style={{ flexDirection: 'column' }}>
              <Image
                alt=''
                src={detail?.image}
                height={440}
                preview={false}
                width={'100%'}
                style={{ borderRadius: 8, objectFit: 'cover' }}
              />
              {/* <Card
                style={{
                  marginTop: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 24,
                }}
              >
                <Row
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  <Text type='heading4-medium'>Mẫu sản phẩm liên quan</Text>
                  <ListProductRelated images={images} loading={loadingRelated} />
                </Row>
              </Card> */}
            </Row>
          </Col>
          <Col span={16}>
            <Card style={{ marginBottom: 24 }}>
              <Row align={'middle'} style={{ marginBottom: 24 }}>
                <Text type='heading3-bold'>Thông tin chi tiết</Text>
              </Row>
              <Row align={'middle'} className={styles.rowItem}>
                <Col span={4}>
                  <Text type='heading5-medium'>Mã sản phẩm:</Text>
                </Col>
                <Col span={20}>
                  <Text type='heading5-regular' color='text-secondary'>
                    {detail?.code}
                  </Text>
                </Col>
              </Row>
              <Row align={'middle'} className={styles.rowItem}>
                <Col span={4}>
                  <Text type='heading5-medium'>Tên sản phẩm:</Text>
                </Col>
                <Col span={20}>
                  <Text type='heading5-regular' color='text-secondary'>
                    {detail?.name}
                  </Text>
                </Col>
              </Row>

              <Row align={'middle'} className={styles.rowItem}>
                <Col span={4}>
                  <Text type='heading5-medium'>Giá sản phẩm:</Text>
                </Col>
                <Col span={20}>
                  <Text type='heading5-regular' color='text-secondary'>
                    {formatCurrencyVND(detail?.price ?? 0)}
                  </Text>
                </Col>
              </Row>
              <Row align={'middle'} className={styles.rowItem}>
                <Col span={4}>
                  <Text color='text-primary' type='body-regular'>
                    Số lượng:
                  </Text>
                </Col>
                <Col span={20}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <Button
                      type='default'
                      onClick={() => onUpdateQ(quantity + 1)}
                      disabled={quantity >= 100 || quantity > data?.data?.quantity}
                    >
                      +
                    </Button>
                    <Text color='text-primary' type='body-medium'>
                      {quantity}
                    </Text>
                    <Button
                      type='default'
                      onClick={() => onUpdateQ(quantity - 1)}
                      disabled={quantity <= 1 || data?.data?.quantity <= 1}
                    >
                      -
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row align={'middle'} className={styles.rowItem}>
                <Col span={4}>
                  <Text type='heading5-medium'>Giới thiệu :</Text>
                </Col>
                <Col span={20}>
                  <Text className={styles.introduce} color='text-secondary' type='heading5-regular'>
                    {detail?.description}
                  </Text>
                </Col>
              </Row>
              <Row align={'middle'} className={styles.rowItem}>
                <Col span={4}>
                  <Text type='heading5-medium'>Kích cỡ :</Text>
                </Col>
                <Col span={20}>
                  <Row align={'middle'} style={{ gap: 8 }}>
                    {data?.data?.size?.map((s: TProductSize, index: number) => (
                      <Button
                        className={classNames(styles.introduce, { [styles.active]: s === size })}
                        key={`size-${index}`}
                        onClick={() => setSize(s)}
                      >
                        {s}
                      </Button>
                    ))}
                  </Row>
                </Col>
              </Row>
              <Row align={'middle'} className={styles.rowItem}>
                <Col span={4}>
                  <Text type='heading5-medium'>Tạm tính tiền :</Text>
                </Col>
                <Col span={20}>
                  <Row align={'middle'} style={{ gap: 8 }}>
                    <Text type='heading5-regular' color='text-secondary'>
                      {formatCurrencyVND(Number(Number(detail?.price) * quantity) ?? 0)}
                    </Text>
                  </Row>
                </Col>
              </Row>
              <Row align={'middle'} style={{ marginTop: 24 }}>
                <Button type='primary' onClick={onAddToCart}>
                  Thêm vào giỏ hàng
                </Button>
              </Row>
            </Card>
            <Card>
              {tabActive && (
                <Tabs
                  defaultActiveKey={'rate'}
                  activeKey={tabActive}
                  items={items}
                  onChange={onChange}
                />
              )}
            </Card>
          </Col>
        </Row>

        <ModalLogin ref={refModalLogin} />
      </div>
    </Spin>
  );
};

export default ProductDetail;
