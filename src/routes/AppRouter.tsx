import { Outlet, RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import SomethingWentWrongPage from '@/components/status/error/SomethingWentWrongPage';
import { UnknownErrorBoundary } from '@/components/status/error/UnknownErrorBoundary';
import { APIErrorBoundary } from '@/components/status/error/APIErrorBoundary';
import { Suspense } from 'react';
import Loader from '@/components/status/loading/Loader';
import { ROUTE_TYPE } from '@/constants/path';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import MainPage from '@/pages/Main';
import EditorPage from '@/pages/Editor';
import CurriculumPage from '@/pages/Curriculum';

const createAuthRouter = (routeType: ROUTE_TYPE, children: RouteObject[]) => {
  const authRouter = children.map((child: RouteObject) => ({
    element: routeType === 'PRIVATE' ? <PrivateRoute /> : <PublicRoute />,
    children: [child],
  }));
  return authRouter;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <UnknownErrorBoundary>
        <APIErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </APIErrorBoundary>
      </UnknownErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      ...createAuthRouter('PRIVATE', [{}]),
      ...createAuthRouter('PUBLIC', [
        {
          path: '/editor',
          element: <EditorPage />,
        },
        {
          path: '/curriculum',
          element: <CurriculumPage />,
        },
        {
          path: '/api-docs',
          // 무거운 Swagger는 Lazy Loading 처리
          lazy: () => import('@/pages/ApiDocs').then(module => ({ Component: module.default })),
        },
      ]),
      {
        path: '*',
        element: <SomethingWentWrongPage />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
