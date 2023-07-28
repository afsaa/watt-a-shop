import Navbar from '../../components/Navbar';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import Home from '../Home';
import { useEffect } from 'react';
import { checkMode } from '../../utils';
import MyAccount from '../MyAccount';
import MyOrders from '../MyOrders';
import SignIn from '../SignIn';
import NotFound from '../NotFound/indext';

function App(): JSX.Element {
  useEffect(() => {
    checkMode();
    return () => {};
  }, []);

  const AppRoutes = (): React.ReactElement | null => {
    const routes = useRoutes([
      { path: '/', element: <Home /> },
      { path: '/my-account', element: <MyAccount /> },
      { path: '/my-orders', element: <MyOrders /> },
      { path: '/sign-in', element: <SignIn /> },
      { path: '/*', element: <NotFound /> },
    ]);

    return routes;
  };

  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
