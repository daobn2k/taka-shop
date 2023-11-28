/* eslint-disable multiline-ternary */
import { memo, useMemo, useState } from 'react';

import { Image, Rate, Row, Skeleton, message } from 'antd';
import classNames from 'classnames';

import { IProductData, TProductSize } from '@/api/interface';
import { useCustomNavigate } from '@/hooks/useCustomNavigate';
import { useLogin } from '@/hooks/useLogin';
import { ROUTE_PATH } from '@/routes/route.constant';
import { formatCurrencyVND } from '@/utils/common';

import styles from './index.module.scss';
// import ModalConfirm from '../ModalConfirm/ModalConfirm';
import Text from '../Text';

interface IItemNewBook extends IProductData {
  loading?: boolean;
  is_liked?: boolean;
  onLike?: () => void;
  onAddCart?: (size: TProductSize) => void;
  onClickTag?: () => void;
  tag?: string;
  onOpenLogin?: () => void;
}
const ItemProduct = (props: IItemNewBook) => {
  const {
    name = '',
    description = '',
    image = '',
    loading,
    // onAddCart,
    price,
    id,
    onClickTag,
    total_rating,
    tag,
    price_discount,
    onAddCart,
    onOpenLogin,
    size: sizes,
  } = props;
  const [size, setSize] = useState<TProductSize>();
  const { navigate } = useCustomNavigate();
  const isLogin = useLogin();

  const onClick = () => {
    if (!size) {
      return message.error('Chọn size trước khi đặt hàng');
    }
    if (!isLogin) {
      message.error('Đăng nhập để thực hiện tính này năng');
      return onOpenLogin && onOpenLogin();
    }
    onAddCart && onAddCart(size);
  };
  const priceDiscount = useMemo(() => {
    return Number(price);
  }, [price]);

  const onViewDetail = () => {
    navigate({ pathname: `${ROUTE_PATH.PRODUCT}/${id}` });
  };
  return (
    <div className={styles.itemNewBook}>
      <Skeleton avatar active loading={loading} paragraph={{ rows: 1 }}>
        <div className={classNames(styles.divImage, { [styles.noImage]: !image })}>
          <Image
            src={image ?? '/images/product-default.jpg'}
            alt=''
            preview={false}
            onClick={onViewDetail}
          />
          {tag && (
            <Text
              type='body-regular'
              color='neutral-white'
              className={classNames(styles.tag, {
                [styles.green]: tag === 'Sản phẩm mới',
                [styles.red]: tag === 'Sản phẩm hot',
              })}
              onClick={onClickTag}
            >
              {tag}
            </Text>
          )}

          <Row align={'middle'} style={{ gap: 16 }} className={classNames(styles.addSize)}>
            {sizes?.length > 0 ? (
              sizes?.map((s: any, index) => (
                <div key={`size-${index}`}>
                  <Text
                    onClick={() => setSize(s)}
                    className={classNames(styles.textSize, { [styles.activeSize]: size === s })}
                  >
                    {s}
                    &nbsp;
                  </Text>
                </div>
              ))
            ) : (
              <></>
            )}
          </Row>
          <Text
            type='body-regular'
            color='neutral-white'
            className={classNames(styles.addToCart)}
            onClick={onClick}
          >
            Thêm vào giỏ hàng
          </Text>
        </div>
        <Row align={'middle'} justify={'space-between'}>
          <Text
            type='heading4-medium'
            color='text-primary'
            className={styles.titleBook}
            onClick={onViewDetail}
          >
            {name}
          </Text>
          <Rate allowHalf defaultValue={total_rating} disabled={true} />
        </Row>

        <Row justify={'space-between'}>
          <Text type='heading5-bold' color='text-primary'>
            {formatCurrencyVND(priceDiscount)}
          </Text>
          {price_discount > 0 && (
            <Text type='body-regular' color='text-secondary' className={styles.textDiscount}>
              {formatCurrencyVND(price)}
            </Text>
          )}
        </Row>
        <Text type='heading5-medium' color='text-secondary' className={styles.authors}>
          {description}
        </Text>
      </Skeleton>
    </div>
  );
};

export default memo(ItemProduct);
