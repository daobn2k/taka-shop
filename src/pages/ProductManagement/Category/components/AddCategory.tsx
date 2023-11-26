import { useEffect } from 'react';

import { Form, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import FooterModal from '@/components/UI/CustomModal/FooterModal';
import HeaderListTable from '@/components/UI/HeaderListTable';
import InputField from '@/components/UI/InputField';
import WrapperInfoDetail from '@/components/UI/WrapperInfoDetail';
import { ROUTE_PATH } from '@/routes/route.constant';
import { localStorageUtils } from '@/utils/local-storage-utils';

import styles from './add-category.module.scss';
import { useAdd, useGetDetail, useUpdate } from '../service';

const AddCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const { run: onAdd } = useAdd({
    onSuccess(res) {
      message.success(res.message);
      navigate(ROUTE_PATH.CATEGORY);
    },
    onError() {
      message.error('Tạo mới thất bại');
    },
  });

  const { run: onEdit } = useUpdate({
    onSuccess(res) {
      message.success(res.message);
      navigate(ROUTE_PATH.CATEGORY);
    },
    onError() {
      message.error('Chỉnh sửa thất bại');
    },
  });

  const onCancel = () => {
    navigate(ROUTE_PATH.CATEGORY);
  };

  const onFinish = (values: any) => {
    const profile: any = localStorageUtils.get('profile');
    const payload = {
      ...values,
      create_uid: profile?.id,
    };
    if (id) {
      return onEdit(id, payload);
    }
    onAdd(payload);
  };

  const { run: onGetDetail } = useGetDetail({
    onSuccess(res) {
      form.setFieldsValue(res.data);
    },
    onError() {
      message.error('Lấy thông tin detail đã có lỗi');
    },
  });
  useEffect(() => {
    if (id) {
      onGetDetail(id);
    }
  }, [id]);
  return (
    <div className={styles.root}>
      <HeaderListTable title='Thêm thể loại sản phẩm' />
      <WrapperInfoDetail>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name='name'
            rules={[{ required: true, message: 'Nhập tên thể loại sản phẩm' }]}
          >
            <InputField label='Tên thể loại sản phẩm' require />
          </Form.Item>
          <Form.Item name='description'>
            <InputField label='Thông tin thể loại sản phẩm' />
          </Form.Item>
          <Form.Item noStyle>
            <FooterModal onCancel={onCancel} />
          </Form.Item>
        </Form>
      </WrapperInfoDetail>
    </div>
  );
};

export default AddCategory;
