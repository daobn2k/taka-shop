/* eslint-disable multiline-ternary */
// Import necessary components and styles from Ant Design
import React from 'react';

import { Drawer, List, Avatar, Row, Col, message, Spin } from 'antd';
import { useAtom } from 'jotai';

import { useCart } from '@/hooks/useCart';
import { useAddOrder, useOrderItem } from '@/service/order';
import { ICart, atomCart } from '@/store/cart/cart';
import { useProfile } from '@/store/profile/useProfile';
import { atomViewCart } from '@/store/viewCart/viewCart';
import { formatCurrencyVND } from '@/utils/common';
import { localStorageUtils } from '@/utils/local-storage-utils';

import styles from './index.module.scss';
import Button from '../Button';
import Text from '../Text';

const DrawerCart = ({ children }: { children: React.ReactNode }) => {
  // Handle closing the drawer
  const [visible, setVisible] = useAtom(atomViewCart);
  const handleClose = () => setVisible(false);
  const onOpen = () => setVisible(true);
  const [defaultCart, setCart] = useAtom(atomCart);
  const { cart, totalPrice, totalQuantity, onModifyCart, formatToOrder } = useCart();
  const profile = useProfile();

  const { run, loading } = useAddOrder({
    onSuccess(res) {
      if (res?.data) {
        const newCart = defaultCart.filter((c) => c.userid !== profile?.id);
        localStorageUtils.set('cart', newCart);
        setCart(newCart);
        message.success(
          res?.message ??
            'Đơn hàng đã được đặt thành công , Cảm ơn quý khách hãy tiếp tục ủng hộ chúng tôi!',
        );
        setVisible(false);
      } else {
        message.error('Đơn hàng đã được đặt thất bại');
      }
    },
    onError() {
      message.error('Đơn hàng đã được đặt thất bại');
    },
  });

  const { runAsync } = useOrderItem();
  const onOrder = async () => {
    if (!profile?.phone) {
      return message.error('Cập nhật số điện thoại cá nhân trước khi tạo đơn hàng');
    }
    if (!profile?.address) {
      return message.error('Cập nhật địa chỉ');
    }
    const formDataPayload: any = new FormData();

    const dataOrder = formatToOrder();
    formDataPayload.append('user_id', profile?.id);
    formDataPayload.append('total_amount', totalPrice);
    formDataPayload.append('total_quantity', totalQuantity);

    for (const cart of dataOrder) {
      const formCartItem: any = new FormData();

      formCartItem.append('product_id', cart.product);
      formCartItem.append('quantity', cart.quantity);
      formCartItem.append('size', cart.size);
      formCartItem.append('amount', cart.price);

      const res = await runAsync(formCartItem);

      formDataPayload.append('order_item_id[]', res?.data?.id);
    }

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
        <Spin spinning={loading}>
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
                      &nbsp;
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
          {cart.length > 0 ? (
            <>
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
            </>
          ) : (
            <></>
          )}
        </Spin>
      </Drawer>
    </>
  );
};

export default DrawerCart;
