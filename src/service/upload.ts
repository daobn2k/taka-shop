import { useRequest } from 'ahooks';

import { API_PATH } from '@/api/constant';
import { request } from '@/api/request';

export const serviceUploadSingleFile = (file: any) => {
  const formData = new FormData();

  formData.append('file', file);

  return request.post(API_PATH.UPLOAD_FILE, {
    data: formData,
  });
};

export const useUploadSingleFile = (options = {}) => {
  return useRequest(serviceUploadSingleFile, {
    manual: true,
    ...options,
  });
};
