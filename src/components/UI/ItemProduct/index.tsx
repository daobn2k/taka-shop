import { memo, useMemo } from 'react';

import { Image, Rate, Row, Skeleton } from 'antd';
import classNames from 'classnames';

import { IProductData } from '@/api/interface';
import { useCustomNavigate } from '@/hooks/useCustomNavigate';
import { ROUTE_PATH } from '@/routes/route.constant';
import { formatCurrencyVND } from '@/utils/common';

import styles from './index.module.scss';
// import ModalConfirm from '../ModalConfirm/ModalConfirm';
import Text from '../Text';

interface IItemNewBook extends IProductData {
  loading?: boolean;
  is_liked?: boolean;
  onLike?: () => void;
  onAddCart?: () => void;
  onClickTag?: () => void;
  tag?: string;
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
  } = props;

  const { navigate } = useCustomNavigate();
  // const refModalLogin = useRef<any>();

  // const onClick = () => {
  //   if (!isLogin) {
  //     return refModalLogin.current.onOpen();
  //   }

  //   onAddCart && onAddCart();
  // };
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
          <Text
            type='body-regular'
            color='neutral-white'
            className={classNames(styles.tag, {
              [styles.green]: tag === 'Sản phẩm mới',
              [styles.red]: tag === 'Đánh giá cao',
            })}
            onClick={onClickTag}
          >
            {tag}
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
        </Row>
        <Text type='heading5-medium' color='text-secondary' className={styles.authors}>
          {description}
        </Text>
      </Skeleton>

      {/* <ModalConfirm
        ref={refModalLogin}
        title={'Thêm vào giỏ hàng'}
        onClickAction={onAction}
        text={'Vui lòng đăng nhập để thêm vào giỏ hàng'}
      /> */}
    </div>
  );
};

export default memo(ItemProduct);
