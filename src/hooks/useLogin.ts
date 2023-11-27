import { useEffect, useState } from 'react';

import { useProfile } from '@/store/profile/useProfile';

export const useLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  const profile = useProfile();

  useEffect(() => {
    setIsLogin(!!profile?.id);
  }, [profile]);

  return isLogin;
};
