import { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <Suspense fallback={undefined}>
      <Outlet />
    </Suspense>
  );
};

export default AppLayout;
