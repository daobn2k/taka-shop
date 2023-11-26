import { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

import { useProfileInitial } from '@/store/profile/useProfileInitial';

const AppLayout = () => {
  useProfileInitial();
  return (
    <Suspense fallback={undefined}>
      <Outlet />
    </Suspense>
  );
};

export default AppLayout;
