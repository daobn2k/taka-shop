import { useRequest } from 'ahooks';

import { API_PATH } from '@/api/constant';
import { IOptions } from '@/api/interface';
import { request } from '@/api/request';
import { formatParamsGetList } from '@/utils/common';

export const useGetOrders = (options?: IOptions) => {
  return useRequest(
    (params: any) => {
      return request.get(API_PATH.ORDER, {
        params: formatParamsGetList({
          page: 1,
          limit: 20,
          ...params,
        }),
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};
