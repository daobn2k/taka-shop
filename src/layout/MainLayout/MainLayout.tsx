import { Suspense, useEffect } from 'react';

import { CommentOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { useAtom } from 'jotai';
import { Outlet } from 'react-router-dom';

import ChatBot from '@/components/ChatBot';
import { atomCart } from '@/store/cart/cart';
import { useCategoryInitial } from '@/store/category/useCategoryInitial';
import { atomShowChatBot } from '@/store/showChatbot/showChatbot';
import { localStorageUtils } from '@/utils/local-storage-utils';

import MainHeader from './MainHeader/MainHeader';

const MainLayout = () => {
  const [, setCart] = useAtom(atomCart);
  const [showChatBot, setShowChatBot] = useAtom(atomShowChatBot);
  useEffect(() => {
    const cart: any = localStorageUtils.get('cart');
    setCart(cart);
  }, []);
  useCategoryInitial();

  return (
    <Suspense fallback={undefined}>
      <MainHeader />
      <Outlet />
      {!showChatBot && (
        <FloatButton icon={<CommentOutlined />} onClick={() => setShowChatBot(true)} />
      )}
      {showChatBot && <ChatBot />}
    </Suspense>
  );
};

export default MainLayout;
