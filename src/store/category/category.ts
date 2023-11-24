import { atom } from 'jotai';

export enum ECategory {
  BOOK = 'BOOK',
  NEWSPAPER = 'NEWSPAPER',
}

interface IBaseInfo {
  id: number;
  name: string;
  description?: string;
}

export interface IInfoCategory extends IBaseInfo {
  type?: ECategory;
  children?: IInfoCategory[];
  active?: boolean;
}

// @ts-ignore
export const atomCategory = atom<IInfoCategory[]>([]);
