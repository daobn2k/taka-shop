import { useRef } from 'react';

import { Col, Row } from 'antd';

import { IProductData, TProductSize } from '@/api/interface';
import ItemProduct from '@/components/UI/ItemProduct';
import SelectionHeaderHome from '@/components/UI/SelectionHeaderHome';
import { useCart } from '@/hooks/useCart';

import ModalLogin from '../ModalLogin';

const ListProduct = ({
  data,
  title,
  tag,
  span,
  gutter,
}: {
  data: IProductData[];
  title?: string;
  tag: string;
  span?: any;
  gutter?: any;
}) => {
  const { onAddCart } = useCart();
  const refModalLogin = useRef<any>();
  return (
    <>
      {title && <SelectionHeaderHome title={title} />}
      <Row style={{ width: '100%' }} gutter={gutter ?? [66, 24]}>
        {data.map((data: IProductData, index) => {
          return (
            <Col key={`${index} - product - ${tag}`} span={span ?? 6}>
              <ItemProduct
                {...data}
                tag={tag}
                onAddCart={(size: TProductSize) => onAddCart(data, 1, size)}
                onOpenLogin={() => refModalLogin?.current?.onOpen()}
              />
            </Col>
          );
        })}
      </Row>
      <ModalLogin ref={refModalLogin} />
    </>
  );
};

export default ListProduct;
