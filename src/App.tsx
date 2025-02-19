import { GlobalStyle } from './styles/GlobalStyle';

import Home from './pages/Home';
import Layout from './layout/Layout';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RouterError from './components/common/RouterError';

import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

const routeList = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/discussion',
    element: <div>애니 토론 & 투표</div>,
  },
  {
    path: '/community',
    element: <div>커뮤니티</div>,
  },
];

const router = createBrowserRouter(
  routeList.map((item) => {
    return {
      ...item,
      element: <Layout>{item.element}</Layout>,
      errorElement: <RouterError />,
    };
  }),
);

function App() {
  return (
    <>
      <GlobalStyle />
      <Analytics />
      <SpeedInsights />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
