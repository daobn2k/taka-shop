import { useAtomValue } from 'jotai';

import { atomCartPending } from './cartPending';

export const useCartPending = () => {
  return useAtomValue(atomCartPending);
};
