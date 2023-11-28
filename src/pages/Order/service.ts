import { useRequest } from 'ahooks';

import { API_PATH } from '@/api/constant';
import { privateRequest, request } from '@/api/request';
import { formatParamsGetList } from '@/utils/common';

interface IOptions {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

export enum ETypeBook {
  BOOK = 'BOOK',
  NEWSPAPER = 'NEWSPAPER',
}
interface IBaseInfo {
  id: number;
  name: string;
  description?: string;
  position?: number;
  created_at?: Date;
  updated_at?: Date;
  is_child?: boolean;
  is_parent?: boolean;
  parent_id?: any;
}

export interface IFormAdd extends IBaseInfo {
  type: ETypeBook;
}

export interface IPagination {
  page?: number;
  limit?: number;
}

export interface IResponseList extends IPagination {
  data: IBaseInfo[];
  total: number;
  total_page: number;
}

export interface IParamsSearch extends IPagination {
  start_created_date?: string;
  end_created_date?: string;
  start_updated_date?: string;
  end_updated_date?: string;
  search?: string;
  type?: ETypeBook;
}

export interface IDataPositions {
  end_id?: number;
  active_id: number;
  start_id?: number;
}

export const useGetDetail = (options?: IOptions) => {
  return useRequest(
    (id: any) => {
      return privateRequest(request.get, API_PATH.ORDER_SHOW(id), {});
    },
    {
      manual: true,
      ...options,
    },
  );
};

export const useApprove = (options?: IOptions) => {
  return useRequest(
    (id: any, payload: IFormAdd) => {
      return privateRequest(request.put, API_PATH.ORDER_APPROVE(id), {
        data: payload,
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};

export const useCancel = (options?: IOptions) => {
  return useRequest(
    (id: any) => {
      return privateRequest(request.delete, API_PATH.ORDER_CANCEL(id), {});
    },
    {
      manual: true,
      ...options,
    },
  );
};
export const useShipping = (options?: IOptions) => {
  return useRequest(
    (id: any) => {
      return privateRequest(request.delete, API_PATH.ORDER_SHIP(id), {});
    },
    {
      manual: true,
      ...options,
    },
  );
};

export const useGetListOrder = (options?: any) => {
  return useRequest(
    (params: IParamsSearch) => {
      return privateRequest(request.get, API_PATH.ORDER, {
        params: formatParamsGetList({ page: 1, limit: 10, ...params }),
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};
