import { createBrowserRouter, RouterProvider } from 'react-router';
import { GlobalStyle } from './components/GlobalStyle';
import Home from './pages/Home';
import Layout from './layout/Layout';
import RouterError from './components/common/RouterError';

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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
