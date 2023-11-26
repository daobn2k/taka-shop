// Import necessary components and styles from Ant Design
import React, { useState } from 'react';

import { Drawer, List, Avatar, Row, Col } from 'antd';

import { useCart } from '@/hooks/useCart';
import { useAddOrder } from '@/service/order';
import { ICart } from '@/store/cart/cart';
import { useProfile } from '@/store/profile/useProfile';
import { formatCurrencyVND } from '@/utils/common';

import styles from './index.module.scss';
import Button from '../Button';
import Text from '../Text';

const DrawerCart = ({ children }: { children: React.ReactNode }) => {
  // Handle closing the drawer
  const [visible, setVisible] = useState(false);
  const handleClose = () => setVisible(false);
  const onOpen = () => setVisible(true);
  const { cart, totalPrice, totalQuantity, onModifyCart } = useCart();
  const profile = useProfile();

  const { run } = useAddOrder();
  const onOrder = () => {
    const formDataPayload: any = new FormData();

    formDataPayload.append('user_id', profile?.id);
    formDataPayload.append('total_amount', totalPrice);
    formDataPayload.append('total_quantity', totalQuantity);
    formDataPayload.append('order_item_id', totalQuantity);

    run(formDataPayload);
  };
  return (
    <>
      <div onClick={() => onOpen()}>{children}</div>
      <Drawer
        title='Chi tiết giỏ hàng'
        placement='right'
        closable={false}
        onClose={handleClose}
        open={visible}
        width={600}
      >
        <List
          dataSource={cart}
          className={styles.list}
          renderItem={(item: ICart) => {
            const priceDiscount =
              item?.price_discount > 0 ? item?.price - item?.price_discount : item.price;
            return (
              <List.Item>
                <Avatar src={item.image} size={64} shape='square' />
                <Row className={styles.rowItem}>
                  <Text type='body-bold'>
                    {item.name} &nbsp; - &nbsp; <Text element='span'>{item.size}</Text>
                  </Text>
                  <Text type='body-bold'>
                    {formatCurrencyVND(priceDiscount)}
                    {item.price_discount > 0 && (
                      <Text
                        element='span'
                        type='body-medium'
                        color='text-secondary'
                        className={styles.textThrough}
                      >
                        {formatCurrencyVND(item.price)}
                      </Text>
                    )}
                  </Text>
                  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                    <Button
                      type='secondary'
                      onClick={() => onModifyCart(item.id, item.quantity + 1, item.size)}
                      disabled={item.quantity >= 100}
                    >
                      +
                    </Button>
                    <Text color='text-primary' type='body-medium'>
                      {item.quantity}
                    </Text>
                    <Button
                      type='secondary'
                      onClick={() => onModifyCart(item.id, item.quantity - 1, item.size)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                  </div>
                </Row>
              </List.Item>
            );
          }}
        />
        <Row align={'middle'} justify={'center'}>
          <Text color='text-primary' type='heading5-bold'>
            Thông tin đơn hàng
          </Text>
        </Row>
        <Row>
          <Col span={12}>
            <Row style={{ marginTop: '10px' }}>
              <Col span={10}>
                <Text>Họ và tên:</Text>
              </Col>
              <Col span={14}>{profile?.name}</Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
              <Col span={10}>
                <Text>Email:</Text>
              </Col>
              <Col span={14}>{profile?.email}</Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
              <Col span={10}>
                <Text>Số điện thoại:</Text>
              </Col>
              <Col span={14}>{profile?.phone}</Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
              <Col span={10}>
                <Text>Địa chỉ:</Text>
              </Col>
              <Col span={14}>{profile?.address}</Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row style={{ marginTop: '10px' }}>
              <Col span={10}>
                <Text>Tạm tính:</Text>
              </Col>
              <Col span={14}>{formatCurrencyVND(totalPrice)}</Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
              <Col span={10}>
                <Text>Số lượng:</Text>
              </Col>
              <Col span={14}>{totalQuantity} SP</Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
              <Col span={10}>
                <Text>Phí vận chuyển:</Text>
              </Col>
              <Col span={14}> 0 đ</Col>
            </Row>
            <hr style={{ marginTop: 10 }} />
            <Row style={{ marginTop: '10px' }}>
              <Col span={10}>
                <Text>Thành tiền: </Text>
              </Col>
              <Col span={14}>{formatCurrencyVND(totalPrice)}</Col>
            </Row>
          </Col>
        </Row>
        <hr style={{ marginTop: 24 }} />
        <Row justify={'end'} align={'middle'} style={{ gap: 12, padding: '8px 0' }}>
          <Button type='secondary' onClick={() => handleClose()}>
            Để lúc khác
          </Button>
          <Button onClick={() => onOrder()} htmlType='button'>
            Đặt hàng ngay
          </Button>
        </Row>
      </Drawer>
    </>
  );
};

export default DrawerCart;
