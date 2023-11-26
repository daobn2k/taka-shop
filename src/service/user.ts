import { useRequest } from 'ahooks';

import { API_PATH } from '@/api/constant';
import { IOptions } from '@/api/interface';
import { request } from '@/api/request';

export interface IPayloadLogin {
  email: string;
  password: string;
}

export const userLogin = (data: IPayloadLogin) => {
  return request.post(API_PATH.AUTH_LOGIN, { data });
};

export const useAuthLogin = (options?: IOptions) => {
  return useRequest(userLogin, { manual: true, ...options });
};
