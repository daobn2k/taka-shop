/* eslint-disable unicorn/prefer-code-point */
/* eslint-disable unicorn/prefer-add-event-listener */

import { message } from 'antd';
import type { RcFile } from 'antd/es/upload';

export const EXT_IMAGE = ['jpg', 'jpeg', 'png', 'gif', 'heic'];

export const base64ToBlob = (base64: any, type: any) => {
  const base64Slice = base64.split(',')[1];
  const binStr: any = window.atob(base64Slice.replaceAll(/\s/g, ''));
  const len = binStr.length;
  const buffer = new ArrayBuffer(len);
  const arr = new Uint8Array(buffer);
  for (let i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }
  const blob = new Blob([arr], { type });
  return URL.createObjectURL(blob);
};

export const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => resolve(reader.result));
    // @ts-ignore
    reader.onerror = (error) => reject(error);
  });

export const isImage = (file: any) => {
  if (!file) {
    return false;
  }

  const name = file?.name?.split('.');

  return (
    (file.type?.includes('image') || file.type === '') &&
    EXT_IMAGE.includes(name[name?.length - 1]?.toLowerCase())
  );
};

export const checkMb = (file: any) => {
  const checkMb = file.size / 1024 / 1024 < 10;
  return checkMb;
};

export const beforeUpload = (file: RcFile) => {
  const isValidImage = isImage(file);
  const isValidMb = checkMb(file);
  if (!isValidImage) {
    message.error('Image is not valid');
  }
  if (!isValidMb) {
    message.error('Dung lượng file vượt quá 10MB');
  }
  return isValidImage;
};
