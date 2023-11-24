import { useRequest } from 'ahooks';
import { useAtom } from 'jotai';

import { API_PATH } from '@/api/constant';
import { IOptions } from '@/api/interface';
import { request } from '@/api/request';

import { atomCategory } from './category';

export const useCategoryInitial = (options?: IOptions) => {
  const [, setCategory] = useAtom(atomCategory);
  return useRequest(
    () => {
      return request.get(API_PATH.CATEGORY, {});
    },
    {
      ...options,
      onSuccess(res: any) {
        if (res?.data) {
          setCategory(res?.data);
        }
      },
    },
  );
};
