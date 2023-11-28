import { useRequest } from 'ahooks';

import { API_PATH } from '@/api/constant';
import { IOptions } from '@/api/interface';
import { privateRequest, request } from '@/api/request';
import { formatParamsGetList } from '@/utils/common';

export const useGetAnswer = (options?: IOptions) => {
  return useRequest(
    (payload: { question: string }) => {
      const newPayload = new FormData();

      newPayload.append('question', payload.question);

      return privateRequest(request.post, API_PATH.FAQ_GET_ANSWER, {
        data: newPayload,
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};

export const useGetListFAQS = (options?: IOptions) => {
  return useRequest(
    (params: any) => {
      return privateRequest(request.get, API_PATH.FAQS, {
        params: formatParamsGetList({ page: 1, limit: 1000, ...params }),
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};
