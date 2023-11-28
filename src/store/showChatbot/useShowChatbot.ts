import { useAtomValue } from 'jotai';

import { atomShowChatBot } from './showChatbot';

export const useShowChatBot = () => {
  return useAtomValue(atomShowChatBot);
};
