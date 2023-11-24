import { useMount } from 'ahooks';
import { useAtom } from 'jotai';

import { localStorageUtils } from '@/utils/local-storage-utils';

import { atomProfile } from './profile';

export const useProfileInitial = () => {
  const profile = localStorageUtils.get('profile');
  const [, setProfile] = useAtom(atomProfile);
  useMount(() => {
    if (profile) {
      setProfile(profile);
    }
  });
};
