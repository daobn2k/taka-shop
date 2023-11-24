import { atom } from 'jotai';

export enum EStatusProfile {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const dataStatusProfile = {
  [EStatusProfile.ACTIVE]: 'Đang hoạt động',
  [EStatusProfile.INACTIVE]: 'Không hoạt động',
};
export type TProfile = {
  id: number;
  username: string;
  name: string;
  phone?: string;
  email: string;
  status?: EStatusProfile;
  role?: string;
  address?: string;
  gender?: string;
  avatar?: string;
};

// @ts-ignore
export const atomProfile = atom<TProfile | null>({});
