import { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

import { useCategoryInitial } from '@/store/category/useCategoryInitial';

import MainHeader from './MainHeader/MainHeader';

const MainLayout = () => {
  useCategoryInitial();
  return (
    <Suspense fallback={undefined}>
      <MainHeader />
      <Outlet />
    </Suspense>
  );
};

export default MainLayout;
