export interface IOptions {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
  manual?: boolean;
}
export enum ENumSort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type Creator = {
  id: number;
  email: string;
  profile: {
    id: number;
    full_name: string;
  };
};

export enum DISCOUNT {
  DISCOUNT = 'DISCOUNT',
  NOT_DISCOUNT = 'NOT_DISCOUNT',
  ALL = 'ALL',
}

export enum StatusOrder {
  PENDING = 'PENDING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
}
export type TProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXl';

export interface IProductData {
  id: number;
  name: string;
  description: string;
  category: {
    data: {
      id: number;
      name: string;
    };
  };
  total_rating: number;
  price: string;
  create_uid: string;
  origin: string;
  quantity: number;
  image: string;
  create_date: string;
  size: string;
  code: string;
}
