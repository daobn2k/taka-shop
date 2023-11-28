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
export const addOrderItem = (data: any) => {
  return request.post(API_PATH.ORDER_ITEM, { data });
};

export const approveOrder = (id: any) => {
  return request.put(API_PATH.ORDER_APPROVE(id));
};
export const shipOrder = (id: any) => {
  return request.put(API_PATH.ORDER_SHIP(id));
};
export const cancelOrder = (id: any) => {
  return request.put(API_PATH.ORDER_CANCEL(id));
};

export const useAddOrder = (options?: IOptions) => {
  return useRequest(addOrder, { manual: true, ...options });
};

export const useOrderItem = (options?: IOptions) => {
  return useRequest(addOrderItem, { manual: true, ...options });
};

export const useApproveOrder = (options?: IOptions) => {
  return useRequest(approveOrder, { manual: true, ...options });
};

export const useCancelOrder = (options?: IOptions) => {
  return useRequest(cancelOrder, { manual: true, ...options });
};

export const useShipping = (options?: IOptions) => {
  return useRequest(shipOrder, {
    manual: true,
    ...options,
  });
};
