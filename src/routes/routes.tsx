import React, { Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import AdminLayout from '@/layout/AdminLayout/AdminLayout';
import AppLayout from '@/layout/AppLayout/AppLayout';
import MainLayout from '@/layout/MainLayout/MainLayout';
import ProductDetail from '@/pages/ProductDetail/ProductDetail';

import { ADMIN_ROUTE_PATH, ROUTE_PATH } from './route.constant';

const Report = React.lazy(() => import('@/pages/Report/Report'));
const HomePage = React.lazy(() => import('@/pages/HomePage/HomePage'));
const ProductPage = React.lazy(() => import('@/pages/Products/Products'));
const CategoryPage = React.lazy(() => import('@/pages/Products/Products'));
const ProductHotPage = React.lazy(() => import('@/pages/ProductsHot/ProductsHot'));

const AdminProductPage = React.lazy(() => import('@/pages/ProductManagement/Products/Products'));
const AdminModifyProductPage = React.lazy(
  () => import('@/pages/ProductManagement/Products/components/AddProduct'),
);
const AdminCategoryPage = React.lazy(() => import('@/pages/ProductManagement/Category/Category'));
const AdminModifyCategory = React.lazy(
  () => import('@/pages/ProductManagement/Category/components/AddCategory'),
);

const AdminUsersPage = React.lazy(() => import('@/pages/Users/Users'));
const AdminModifyUser = React.lazy(() => import('@/pages/Users/components/AddUser'));

const AdminOrderPage = React.lazy(() => import('@/pages/Order/Order'));
const AdminModifyOrder = React.lazy(() => import('@/pages/Order/components/ViewOrder'));

const AdminFAQSPage = React.lazy(() => import('@/pages/FAQS/FAQS'));

const AdminInfomationPage = React.lazy(() => import('@/pages/Account/Account'));
const InfomationUserPage = React.lazy(() => import('@/pages/InformationUser/InformationUser'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: ROUTE_PATH.INFORMATION,
            element: (
              <Suspense fallback={undefined}>
                <InfomationUserPage />
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.REPORT,
            element: (
              <Suspense fallback={undefined}>
                <Report />
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.HOME_PAGE,
            element: (
              <Suspense fallback={undefined}>
                <HomePage />
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.CATEGORY,
            element: (
              <Suspense fallback={undefined}>
                <ProductPage />
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.PRODUCT,
            element: (
              <Suspense fallback={undefined}>
                <CategoryPage />
              </Suspense>
            ),
          },
          {
            path: ROUTE_PATH.PRODUCT_HOT,
            element: (
              <Suspense fallback={undefined}>
                <ProductHotPage />
              </Suspense>
            ),
          },
          {
            path: `${ROUTE_PATH.PRODUCT}/:id`,
            element: (
              <Suspense fallback={undefined}>
                <ProductDetail />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: <AdminLayout />,
        children: [
          {
            path: ADMIN_ROUTE_PATH.ADMIN_PRODUCT,
            element: (
              <Suspense fallback={undefined}>
                <AdminProductPage />
              </Suspense>
            ),
          },
          {
            path: ADMIN_ROUTE_PATH.MODIFY_PRODUCT,
            element: (
              <Suspense fallback={undefined}>
                <AdminModifyProductPage />
              </Suspense>
            ),
          },
          {
            path: `${ADMIN_ROUTE_PATH.MODIFY_PRODUCT}/:id`,
            element: (
              <Suspense fallback={undefined}>
                <AdminModifyProductPage />
              </Suspense>
            ),
          },
          {
            path: ADMIN_ROUTE_PATH.MODIFY_CATEGORY,
            element: (
              <Suspense fallback={undefined}>
                <AdminModifyCategory />
              </Suspense>
            ),
          },
          {
            path: `${ADMIN_ROUTE_PATH.MODIFY_CATEGORY}/:id`,
            element: (
              <Suspense fallback={undefined}>
                <AdminModifyCategory />
              </Suspense>
            ),
          },
          {
            path: ADMIN_ROUTE_PATH.ADMIN_CATEGORY,
            element: (
              <Suspense fallback={undefined}>
                <AdminCategoryPage />
              </Suspense>
            ),
          },
          {
            path: ADMIN_ROUTE_PATH.MODIFY_USER,
            element: (
              <Suspense fallback={undefined}>
                <AdminModifyUser />
              </Suspense>
            ),
          },
          {
            path: `${ADMIN_ROUTE_PATH.MODIFY_USER}/:id`,
            element: (
              <Suspense fallback={undefined}>
                <AdminModifyUser />
              </Suspense>
            ),
          },
          {
            path: ADMIN_ROUTE_PATH.ADMIN_USERS,
            element: (
              <Suspense fallback={undefined}>
                <AdminUsersPage />
              </Suspense>
            ),
          },
          {
            path: `${ADMIN_ROUTE_PATH.MODIFY_ORDER}/:id`,
            element: (
              <Suspense fallback={undefined}>
                <AdminModifyOrder />
              </Suspense>
            ),
          },
          {
            path: ADMIN_ROUTE_PATH.ADMIN_ORDER,
            element: (
              <Suspense fallback={undefined}>
                <AdminOrderPage />
              </Suspense>
            ),
          },
          {
            path: ADMIN_ROUTE_PATH.ADMIN_FAQS,
            element: (
              <Suspense fallback={undefined}>
                <AdminFAQSPage />
              </Suspense>
            ),
          },
          {
            path: ADMIN_ROUTE_PATH.ADMIN_INFORMATION,
            element: (
              <Suspense fallback={undefined}>
                <AdminInfomationPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
