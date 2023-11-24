import { useAtomValue } from 'jotai';

import { atomCart } from './cart';

export const useCart = () => {
  return useAtomValue(atomCart);
};
