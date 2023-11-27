/* eslint-disable unicorn/prefer-number-properties */

import dayjs from 'dayjs';

import { ENumSort } from '@/api/interface';

export const formatParamsSearch = (params: any) => Object.fromEntries(params);

export const formatOrderby = (order_by?: string) => {
  if (order_by) {
    return order_by === 'ascend' ? ENumSort.ASC : ENumSort.DESC;
  }
  return undefined;
};

export const formatParamsGetList = (params: any) => {
  if (params?.mode === 'drag') {
    return {};
  }
  // todo
  return {
    page: 1,
    limit: 10,
    ...params,
  };
};

export const formatFormValuesChange = (allFields: any) =>
  allFields?.reduce((acc: any, it: any) => {
    if (it.value) {
      acc[it.name[0]] = it.value;
    }
    return acc;
  }, {});

export const formatCurrencyVND = (amount: any) => {
  const numericAmount = Number.parseFloat(amount);

  if (isNaN(numericAmount)) {
    console.error('Invalid input. Please provide a valid number.');
    return undefined;
  }

  const formattedAmount = numericAmount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return formattedAmount;
};

export const formatDate = (date: string, format = 'HH:mm - DD/MM/YYYY') => {
  const d = dayjs(date).format(format);
  return d || '';
};

export const formatUrlLeanCode = (payload: any) => {
  const formBody = [];
  for (const property in payload) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(payload[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
};
