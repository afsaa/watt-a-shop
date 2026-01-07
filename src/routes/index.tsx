import CurrentOrder from '@/pages/CurrentOrder';
import Home from '@/pages/Home';
import MyAccount from '@/pages/MyAccount';
import MyOrders from '@/pages/MyOrders';
import NotFound from '@/pages/NotFound';
import SignIn from '@/pages/SignIn';
import { useRoutes } from 'react-router-dom';

export const AppRoutes = (): React.ReactElement | null => {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/:category', element: <Home /> },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/my-orders', element: <MyOrders /> },
    { path: '/my-orders/:id', element: <CurrentOrder /> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/*', element: <NotFound /> },
  ]);

  return routes;
};
