import { useEffect, useState } from 'react';

import { localStorageUtils } from '@/utils/local-storage-utils';

export const useLogin = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const profile = localStorageUtils.get('profile');
    setIsLogin(!!profile);
  }, []);

  return isLogin;
};
