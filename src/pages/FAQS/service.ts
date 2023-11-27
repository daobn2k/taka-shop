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
export const useAdd = (options?: IOptions) => {
  return useRequest(
    (payload: IFormAdd) => {
      return privateRequest(request.post, API_PATH.USER_ADD, {
        data: payload,
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};
export const useGetDetail = (options?: IOptions) => {
  return useRequest(
    (id?: any) => {
      return privateRequest(request.get, API_PATH.USER_SHOW(id), {});
    },
    {
      manual: true,
      ...options,
    },
  );
};

export const useUpdate = (options?: IOptions) => {
  return useRequest(
    (id?: any, payload?: any) => {
      return privateRequest(request.put, API_PATH.USER_UPDATE(id), {
        data: payload,
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};

export const useDelete = (options?: IOptions) => {
  return useRequest(
    (id: number) => {
      return privateRequest(request.delete, API_PATH.USER_DELETE(id), {});
    },
    {
      manual: true,
      ...options,
    },
  );
};

export const useGetListUser = (options?: IOptions) => {
  return useRequest(
    (params: IParamsSearch) => {
      return privateRequest(request.get, API_PATH.FAQS, {
        params: formatParamsGetList({ page: 1, limit: 20, ...params }),
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};
