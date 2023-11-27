import { useRequest } from 'ahooks';

import { API_PATH } from '@/api/constant';
import { IOptions } from '@/api/interface';
import { privateRequest, request } from '@/api/request';

export interface IPasswordPayload {
  new_password: string;
  re_password?: string;
  old_password: string;
}
export const useChangePassword = (options?: IOptions) => {
  return useRequest(
    (payload: any, id: any) => {
      return privateRequest(request.put, API_PATH.CHANGE_PASSWORD(id), {
        data: payload,
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};
