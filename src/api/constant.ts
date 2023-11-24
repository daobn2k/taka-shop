export const API_PATH = {
  // Auth
  AUTH_LOGIN: '/auth/login',
  // Danh mục sản phẩm
  CATEGORY: '/category/index',
  // Sản phẩm
  PRODUCT: '/product/index',
  PRODUCT_RELATED: '/product/related',
  PRODUCT_HOT: '/product/hot',
  PRODUCT_SHOW: (id: number) => '/product/show/' + id,
  PRODUCT_ADD: '/product/store',
  PRODUCT_UPDATE: (id: number) => '/product/update/' + id,
  PRODUCT_DELETE: (id: number) => '/product/delete/' + id,
};
