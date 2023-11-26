/* eslint-disable multiline-ternary */
/* eslint-disable require-await */
/* eslint-disable indent */
import { useEffect, useMemo, useState } from 'react';

import { Col, Form, Row, Spin, Upload, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { LIST_SIZE, LIST_STATUS_PRODUCT } from '@/api/data';
import FooterModal from '@/components/UI/CustomModal/FooterModal';
import HeaderListTable from '@/components/UI/HeaderListTable';
import { Icon } from '@/components/UI/IconFont/Icon';
import InputField from '@/components/UI/InputField';
import InputSelect from '@/components/UI/InputSelect';
import InputTextArea from '@/components/UI/InputTextArea';
import Text from '@/components/UI/Text';
import WrapperInfoDetail from '@/components/UI/WrapperInfoDetail';
import { ROUTE_PATH } from '@/routes/route.constant';
import { base64ToBlob, beforeUpload, checkMb, isImage, toBase64 } from '@/utils/image';
import { localStorageUtils } from '@/utils/local-storage-utils';

import styles from './add-product.module.scss';
import { useGetListCategories } from '../../Category/service';
import { useAdd, useGetDetail, useUpdate } from '../service';

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [dataImage, setDataImage] = useState<any>({});
  const { data: dataCategory, run: getCategory } = useGetListCategories();

  useEffect(() => {
    getCategory({ page: 1, limit: 100 });
  }, []);
  const { run: onAdd, loading: loadingAdd } = useAdd({
    onSuccess(res) {
      message.success(res.message);
      navigate(ROUTE_PATH.PRODUCT);
    },
    onError() {
      message.error('Tạo mới thất bại');
    },
  });

  const { run: onEdit, loading: loadingEdit } = useUpdate({
    onSuccess(res) {
      message.success(res.message);
      navigate(ROUTE_PATH.PRODUCT);
    },
    onError() {
      message.error('Chỉnh sửa thất bại');
    },
  });

  const onCancel = () => {
    navigate(ROUTE_PATH.PRODUCT);
  };

  const onFinish = async (values: any) => {
    if (!dataImage?.file && !data?.data?.image) {
      return message.error('Vui lòng chọn ảnh sản phẩm');
    }
    const profile: any = localStorageUtils.get('profile');
    console.log(dataImage, 'dataImage');

    const payload: any = new FormData();
    payload.append('name', values?.name);
    payload.append('category_id', values?.category_id?.id || values?.category_id);
    payload.append('size', values?.size);
    payload.append('price', values?.price);
    payload.append('quantity', values?.quantity);
    payload.append('code', values.code);
    payload.append('description', values.description);
    payload.append('price_discount', values.price_discount);
    payload.append('user_id', profile.id);
    payload.append('image', dataImage.blobUrl);

    if (id) {
      return onEdit(id, payload);
    }
    onAdd(payload);
  };

  const {
    run: onGetDetail,
    data,
    loading,
  } = useGetDetail({
    onSuccess(res) {
      form.setFieldsValue({
        ...res.data,
        category_id: {
          id: res?.data?.category?.data?.id,
          value: res?.data?.category?.data?.id,
          label: res?.data?.category?.data?.name,
        },
      });
    },
    onError() {
      message.error('Lấy thông tin chi tiết đã có lỗi');
    },
  });
  useEffect(() => {
    if (id) {
      onGetDetail(id);
    }
  }, [id]);

  const onChangeImage = async (file: any) => {
    if (!isImage(file?.file) || !checkMb(file?.file)) {
      return;
    }

    const base64 = await toBase64(file?.file?.originFileObj);
    const blobUrl = base64ToBlob(base64, file?.file?.originFileObj?.type);

    setDataImage({
      file: file?.file?.originFileObj,
      blobUrl,
    });
  };

  const optionsCategory = useMemo(() => {
    return dataCategory?.data?.length
      ? dataCategory?.data?.map((e: any) => ({
          id: e?.id,
          value: e?.id,
          label: e?.name,
        }))
      : [];
  }, [dataCategory]);
  return (
    <Form form={form} onFinish={onFinish} initialValues={{ status: LIST_STATUS_PRODUCT[0] }}>
      <Spin spinning={loading || loadingEdit || loadingAdd}>
        <div className={styles.root}>
          <HeaderListTable title={id ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}>
            <FooterModal onCancel={onCancel} className={styles.footerButton} />
          </HeaderListTable>
          <WrapperInfoDetail>
            <Row gutter={32} className={styles.itemProduct}>
              <Col span={8} className={styles.wrapUpload}>
                <div className={styles.imageUpload}>
                  {dataImage?.blobUrl || data?.data?.image ? (
                    <img
                      src={dataImage?.blobUrl || data?.data?.image}
                      alt=''
                      className={styles.image}
                    />
                  ) : (
                    <Icon
                      icon='t4font-ic-solar_gallery-add-bold'
                      className={styles.iconImageUpload}
                    />
                  )}
                </div>
                <Upload
                  listType='picture'
                  fileList={[]}
                  customRequest={() => {}}
                  beforeUpload={beforeUpload}
                  onChange={onChangeImage}
                >
                  <div className={styles.btnUpload}>
                    <Icon icon='t4font-ic-eva_cloud-upload-fill' className={styles.iconBtnUpload} />
                    <Text type='body-medium'>Tải ảnh lên</Text>
                  </div>
                </Upload>
              </Col>
              <Col span={16}>
                <Row gutter={32} className={styles.itemProduct}>
                  <Col span={12}>
                    <Form.Item
                      name='code'
                      rules={[{ required: true, message: 'Nhập mã sản phẩm' }]}
                    >
                      <InputField label='Mã sản phẩm' placeholder='Nhập mã sản phẩm' require />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name='name'
                      rules={[
                        { required: true, message: 'Nhập tên thể loại sản phẩm' },
                        { max: 256, message: 'Không nhập quá 256 kí tự' },
                      ]}
                    >
                      <InputField label='Tên sản phẩm' require placeholder='Nhập tên sản phẩm' />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name='category_id'
                      rules={[{ required: true, message: 'Chọn thể loại sản phẩm' }]}
                    >
                      <InputSelect
                        label='Thể loại sản phẩm'
                        options={optionsCategory}
                        placeholder='Chọn trạng thái'
                        require
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name='price' rules={[{ required: true, message: 'Nhập giá tiền' }]}>
                      <InputField
                        label='Giá tiền'
                        type='number'
                        require
                        placeholder='Nhập giá tiền'
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item name='price_discount'>
                      <InputField
                        label='Giá tiền giảm giá'
                        type='number'
                        placeholder='Nhập giá tiền giảm giá'
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name='quantity'
                      rules={[
                        {
                          validator: async (_, value) => {
                            if (!value) {
                              throw new Error('Nhập số lượng sản phẩm');
                            }
                            if (value && value > 100) {
                              throw new Error('Không được nhập lớn hơn 100 sản phẩm');
                            }
                            if (value && value < 1) {
                              throw new Error('Không được nhập nhỏ hơn 1 sản phẩm');
                            }
                          },
                        },
                      ]}
                    >
                      <InputField
                        label='Số lượng'
                        type='number'
                        require
                        placeholder='Nhập số lượng'
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name='status'
                      rules={[{ required: true, message: 'Chọn trạng thái' }]}
                    >
                      <InputSelect
                        label='Trạng thái'
                        options={LIST_STATUS_PRODUCT}
                        placeholder='Chọn trạng thái'
                        require
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item name='size' rules={[{ required: true, message: 'Chọn trạng thái' }]}>
                      <InputSelect
                        label='Kích cỡ'
                        options={LIST_SIZE}
                        placeholder='Chọn kích cỡ bán'
                        require
                        mode='multiple'
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name='description'
                      rules={[
                        { required: true, message: 'Nhập thông tin sản phẩm' },
                        { max: 3000, message: 'Không nhập quá 3000 kí tự' },
                      ]}
                    >
                      <InputTextArea
                        label='Thông tin sản phẩm'
                        placeholder='Nhập thông tin sản phẩm'
                        require
                        rows={4}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </WrapperInfoDetail>
        </div>
      </Spin>
    </Form>
  );
};

export default AddProduct;
