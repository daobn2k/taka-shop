import { Suspense, useEffect } from 'react';

import { useAtom } from 'jotai';
import { Outlet } from 'react-router-dom';

import { atomCart } from '@/store/cart/cart';
import { useCategoryInitial } from '@/store/category/useCategoryInitial';
import { localStorageUtils } from '@/utils/local-storage-utils';

import MainHeader from './MainHeader/MainHeader';

const MainLayout = () => {
  const [, setCart] = useAtom(atomCart);
  useEffect(() => {
    const cart: any = localStorageUtils.get('cart');
    setCart(cart);
  }, []);
  useCategoryInitial();

  return (
    <Suspense fallback={undefined}>
      <MainHeader />
      <Outlet />
    </Suspense>
  );
};

export default MainLayout;
