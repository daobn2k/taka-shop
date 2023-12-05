import { Suspense, useEffect } from 'react';

import { useAtom } from 'jotai';
import { Outlet } from 'react-router-dom';

import { atomCartPending } from '@/store/cartPending/cartPending';
import { useProfileInitial } from '@/store/profile/useProfileInitial';
import { localStorageUtils } from '@/utils/local-storage-utils';

const AppLayout = () => {
  const [, setC] = useAtom(atomCartPending);
  const cartPending: any = localStorageUtils.get('cart-pending');

  useEffect(() => {
    if (cartPending) {
      setC(cartPending);
    }
  }, [cartPending]);

  useProfileInitial();
  return (
    <Suspense fallback={undefined}>
      <Outlet />
    </Suspense>
  );
};

export default AppLayout;
