import React, { Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import AppLayout from '@/layout/AppLayout/AppLayout';
import MainLayout from '@/layout/MainLayout/MainLayout';

import { ROUTE_PATH } from './route.constant';

const Report = React.lazy(() => import('@/pages/Report/Report'));
const HomePage = React.lazy(() => import('@/pages/HomePage/HomePage'));
const ProductPage = React.lazy(() => import('@/pages/Products/Products'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
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
            path: ROUTE_PATH.PRODUCT,
            element: (
              <Suspense fallback={undefined}>
                <ProductPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
