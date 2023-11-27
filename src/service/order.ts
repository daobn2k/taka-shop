import { useRequest } from 'ahooks';

import { API_PATH } from '@/api/constant';
import { IOptions } from '@/api/interface';
import { request } from '@/api/request';

export interface IPayloadLogin {
  email: string;
  password: string;
}

export const addOrder = (data: any) => {
  return request.post(API_PATH.CREATE_ORDER, { data });
};

export const useAddOrder = (options?: IOptions) => {
  return useRequest(addOrder, { manual: true, ...options });
};
