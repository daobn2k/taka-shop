import { Col, Row } from 'antd';

import { IProductData } from '@/api/interface';
import ItemProduct from '@/components/UI/ItemProduct';
import SelectionHeaderHome from '@/components/UI/SelectionHeaderHome';

const ListProduct = ({
  data,
  title,
  tag,
  span,
}: {
  data: IProductData[];
  title?: string;
  tag: string;
  span?: any;
}) => {
  return (
    <>
      {title && <SelectionHeaderHome title={title} />}
      <Row style={{ width: '100%' }} gutter={[24, 24]}>
        {data.map((data: IProductData, index) => {
          return (
            <Col key={`${index} - product - ${tag}`} span={span ?? 6}>
              <ItemProduct {...data} tag={tag} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default ListProduct;