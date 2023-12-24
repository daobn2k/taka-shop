import { useRequest } from 'ahooks';

import { IOptions } from '@/api/interface';
import { request } from '@/api/request';

export const useGetGeneral = (options?: IOptions) => {
  return useRequest(
    () => {
      return request.get('/overview', {});
    },
    {
      manual: true,
      ...options,
    },
  );
};
