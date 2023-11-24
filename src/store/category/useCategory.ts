import { useAtomValue } from 'jotai';

import { atomCategory } from './category';

export const useCategory = () => {
  return useAtomValue(atomCategory);
};
