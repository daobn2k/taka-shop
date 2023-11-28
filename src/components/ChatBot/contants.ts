/* eslint-disable unicorn/no-new-array */
export const dataQuestion = [
  'Có bao nhiêu sản phẩm ?',
  'Sản phẩm nào mới nhất ?',
  'Sản phẩm giảm giá rẻ nhất ?',
  'Sản phẩm giá gốc rẻ nhất ?',
  'Sản phẩm đang giảm giá ?',
  'Tổng số sản phẩm đang giảm giá ?',
  'Sản phẩm được đánh giá gần đây ?',
  'Sản phẩm bán nhạy nhất ?',
  'Sản phẩm được đánh giá cao ?',
  'Sản phẩm hot nhất ?',
];
export const getRandom = (arr: string[], n: number) => {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  if (n > len) {
    throw new RangeError('getRandom: more elements taken than available');
  }
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};
export const formatQuestionUser = (e: any) => {
  return [
    {
      type: 'user',
      text: e,
      data: undefined,
    },
  ] as listQA[];
};

export const formatBotAnswer = (e: any, data?: any) => {
  return [
    {
      type: 'bot',
      text: e,
      data,
    },
  ] as listQA[];
};
export interface listQA {
  type: 'bot' | 'user';
  text: string;
  data?: any;
  loading?: boolean;
}

function normalizeString(str: string) {
  return str
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036F]/g, '')
    .toLowerCase();
}

export function filterArrayByKeyword(array: string[], keyword: string) {
  const normalizedKeyword = normalizeString(keyword);

  return array.filter((item: string) => {
    const normalizedItem = normalizeString(item);
    return normalizedItem.includes(normalizedKeyword);
  });
}
