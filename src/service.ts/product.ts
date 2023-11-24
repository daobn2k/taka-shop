import { useRequest } from 'ahooks';

import { API_PATH } from '@/api/constant';
import { IOptions } from '@/api/interface';
import { request } from '@/api/request';
import { formatParamsGetList } from '@/utils/common';

interface IParams {
  name?: string;
  category_id?: number;
  limit?: number;
  page?: number;
}

interface IDataProduct {
  name: string;
  image: any;
  category_id: number;
  color: string;
  price: number;
  code: string;
  quantity: number;
  description: string;
  size: string;
}

export const getProduct = (params: IParams) => {
  return request.get(API_PATH.PRODUCT, { params: formatParamsGetList(params) });
};

export const getProductRelated = (params: IParams) => {
  return request.get(API_PATH.PRODUCT_RELATED, { params: formatParamsGetList(params) });
};

export const getProductHot = (params: IParams) => {
  return request.get(API_PATH.PRODUCT_HOT, { params: formatParamsGetList(params) });
};

export const getProductShow = (id: number) => {
  return request.get(API_PATH.PRODUCT_SHOW(id));
};

export const addProduct = (data: IDataProduct) => {
  return request.post(API_PATH.PRODUCT_ADD, { data });
};

export const updateProduct = (data: IDataProduct, id: number) => {
  return request.put(API_PATH.PRODUCT_UPDATE(id), { data });
};
export const deleteProduct = (id: number) => {
  return request.delete(API_PATH.PRODUCT_DELETE(id));
};

export const useGetProduct = (options?: IOptions) => {
  return useRequest(getProduct, {
    manual: true,
    ...options,
  });
};

export const useGetProductRelated = (options?: IOptions) => {
  return useRequest(getProductRelated, {
    manual: true,
    ...options,
  });
};
export const useGetProductHot = (options?: IOptions) => {
  return useRequest(getProductHot, {
    manual: true,
    ...options,
  });
};

export const useGetProductShow = (options?: IOptions) => {
  return useRequest(getProductShow, {
    manual: true,
    ...options,
  });
};

export const useAddProduct = (options?: IOptions) => {
  return useRequest(addProduct, {
    manual: true,
    ...options,
  });
};

export const useUpdateProduct = (options?: IOptions) => {
  return useRequest(updateProduct, {
    manual: true,
    ...options,
  });
};

export const useDeleteProduct = (options?: IOptions) => {
  return useRequest(deleteProduct, {
    manual: true,
    ...options,
  });
};
