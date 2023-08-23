import Navbar from '../../components/Navbar';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import Home from '../Home';
import { useEffect } from 'react';
import { checkMode } from '../../utils';
import MyAccount from '../MyAccount';
import MyOrders from '../MyOrders';
import SignIn from '../SignIn';
import NotFound from '../NotFound/indext';
import ProductDetail from '../../components/ProductDetail';
import Cart from '../../components/Cart';
import CurrentOrder from '../CurrentOrder';

function App(): JSX.Element {
  useEffect(() => {
    checkMode();
    return () => {};
  }, []);

  const AppRoutes = (): React.ReactElement | null => {
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

  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
      <ProductDetail />
      <Cart />
    </BrowserRouter>
  );
}

export default App;
