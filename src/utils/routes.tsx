import Layout from 'components/layout';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('pages/home'));
const Workshop = lazy(() => import('pages/workshop'));

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
        path: '/workshop/:id',
        element: <Workshop />,
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
