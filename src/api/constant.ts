export const API_PATH = {
  // upload file
  UPLOAD_FILE: '/uploadfile',
  // Auth
  AUTH_LOGIN: '/user/login',
  AUTH_LOGOUT: '/user/logout',
  CHANGE_PASSWORD: (id: any) => `/user/${id}/change-password`,
  // Danh mục sản phẩm
  CATEGORY: '/category/index',
  CATEGORY_ADD: '/category/store',
  CATEGORY_UPDATE: (id: number) => '/category/update/' + id,
  CATEGORY_DELETE: (id: number) => '/category/delete/' + id,
  CATEGORY_SHOW: (id: number) => '/category/show/' + id,

  // Sản phẩm
  PRODUCT: '/product/index',
  PRODUCT_RELATED: '/product/related',
  PRODUCT_HOT: '/product/hot',
  PRODUCT_SHOW: (id: number) => '/product/show/' + id,
  PRODUCT_ADD: '/product/store',
  PRODUCT_UPDATE: (id?: any) => (id ? '/product/update/' + id : '/product/update/'),
  PRODUCT_DELETE: (id: number) => '/product/delete/' + id,
  ADD_FEEDBACK: '/feedback/store',
  GET_FEEDBACK: '/feedback/index',
  // USER
  USER: '/user/index',
  USER_ADD: '/user/store',
  USER_UPDATE: (id: number) => '/user/update/' + id,
  USER_DELETE: (id: number) => '/user/delete/' + id,
  USER_SHOW: (id: number) => '/user/show/' + id,

  // order
  ORDER: '/order/index',
  ORDERED_USER: '/order/ordered',
  ORDERED_PURCHASE: '/order/purchase',

  ORDER_SHOW: (id: number) => '/order/show/' + id,
  ORDER_APPROVE: (id: number) => '/order/approve/' + id,
  ORDER_SHIP: (id: number) => '/order/ship/' + id,
  ORDER_CANCEL: (id: number) => '/order/cancel/' + id,

  ORDER_ITEM: '/order_item/store',
  // Đặt hàng

  FAQS: '/faq/index',
  CREATE_ORDER: '/order/store',

  // faqs
  FAQS_STORE: '/faq/store',
  FAQS_UPDATE_STORE: '/faq/update',
};
