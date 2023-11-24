import { atom } from 'jotai';

import { TProductSize } from '@/api/interface';

export enum ECategory {
  BOOK = 'BOOK',
  NEWSPAPER = 'NEWSPAPER',
}

export interface ICart {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  description: string;
  size: TProductSize;
  userid?: number;
}

export interface IOrderProduct {
  product: number;
  quantity: number;
  price: number;
  size: TProductSize;
}
export interface ICartOrder {
  code?: string;
  total_quantity: number;
  total_price: number;
  shipping_address: string;
  status?: string;
  voucher_code: string;
  create_uid: string;
  items: IOrderProduct[];
  phone: string;
}

// @ts-ignore
export const atomCart = atom<ICart[]>([]);
