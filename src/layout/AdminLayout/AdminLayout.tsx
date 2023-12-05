import { Suspense, useEffect } from 'react';

import { Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

import { ROUTE_PATH } from '@/routes/route.constant';
import { localStorageUtils } from '@/utils/local-storage-utils';

import MenuSideBar from './MenuSideBar';

const { Content } = Layout;
const AdminLayout = () => {
  const profile: any = localStorageUtils.get('profile');
  const navigate = useNavigate();

  useEffect(() => {
    if (profile && profile?.role_id !== 1) {
      navigate(ROUTE_PATH.HOME_PAGE);
    }
  }, [profile]);

  return (
    <Suspense fallback={undefined}>
      <Layout style={{ minHeight: '100vh' }}>
        <MenuSideBar />
        <Layout>
          <Content style={{ margin: '32px' }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Suspense>
  );
};

export default AdminLayout;
