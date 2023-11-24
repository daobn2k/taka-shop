import { useAtomValue } from 'jotai';

import { atomProfile } from './profile';

export const useProfile = () => {
  return useAtomValue(atomProfile);
};
