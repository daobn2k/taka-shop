import React from 'react';

import { useRequest } from 'ahooks';
import { Modal, message } from 'antd';
import { useAtom } from 'jotai';

import { API_PATH } from '@/api/constant';
import { request } from '@/api/request';
import ButtonPrimary from '@/components/UI/Button/ButtonPrimary';
import FooterModal from '@/components/UI/CustomModal/FooterModal';
import { atomProfile } from '@/store/profile/profile';
import { localStorageUtils } from '@/utils/local-storage-utils';

import styles from './index.module.scss';

const { confirm } = Modal;

const ModalLogout = ({ children }: { children: React.ReactNode }) => {
  const [, setProfile] = useAtom(atomProfile);
  const requestLogout = useRequest(
    () => {
      return request.delete(API_PATH.AUTH_LOGOUT);
    },
    {
      manual: true,
    },
  );

  const onClickAction = async () => {
    const res = await requestLogout.runAsync();

    if (res?.status === 'success') {
      localStorageUtils.remove('profile');
      setProfile({});
      message.success(res.message ?? 'Đã đăng xuất thành công');
      window.location.reload();
    } else {
      message.error(res?.message ?? 'Đăng xuất thất bại');
    }
  };
  const showLogoutConfirm = () => {
    let open = false;

    const confirmLogout = () => {
      if (!open) {
        const t = confirm({
          title: 'Đăng xuất tài khoản',
          icon: <img src='/svgIcon/ExclamationCircle.svg' alt='' style={{ width: 22 }} />,
          content: <>Bạn chắc chắn muốn đăng xuất tài khoản?</>,
          okText: <ButtonPrimary loading={true}>Xác nhận</ButtonPrimary>,
          okType: 'danger',
          centered: true,
          maskClosable: true,
          className: styles.modalLogout,
          afterClose: () => {
            open = false;
          },
          footer: () => {
            return (
              <>
                <FooterModal
                  onCancel={t.destroy}
                  loadingAction={requestLogout.loading}
                  hideAction={requestLogout.loading}
                  onClickAction={() => onClickAction()}
                />
              </>
            );
          },
        });
      }
      open = true;
    };
    return confirmLogout;
  };

  return (
    <>
      <span onClick={showLogoutConfirm()}>{children}</span>
    </>
  );
};

export default ModalLogout;
