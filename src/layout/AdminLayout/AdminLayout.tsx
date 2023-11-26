import { Suspense } from 'react';

import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import MenuSideBar from './MenuSideBar';

const { Content } = Layout;
const AdminLayout = () => {
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
