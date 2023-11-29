import { useAtomValue } from 'jotai';

import { atomViewCart } from './viewCart';

export const useViewCart = () => {
  return useAtomValue(atomViewCart);
};
