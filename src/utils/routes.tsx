import Layout from 'components/layout';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('pages/home'));

const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/workshop:id',
        // element: <WorkshopDetail />,
      },
      {
        path: '/checkout',
        // element: <Checkout />,
      },
      {
        path: '',
      },
    ],
  },
];

export default routesConfig;
