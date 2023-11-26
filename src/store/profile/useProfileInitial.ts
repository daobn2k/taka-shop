import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { localStorageUtils } from '@/utils/local-storage-utils';

import { atomProfile } from './profile';

export const useProfileInitial = () => {
  const [, setProfile] = useAtom(atomProfile);
  useEffect(() => {
    const profile = localStorageUtils.get('profile');

    if (profile) {
      setProfile(profile);
    }
  }, []);
};
