import { Cart, Layout, Navbar, ProductDetail } from '@/components';
import { AppRoutes } from '@/routes';
import { checkMode } from '@/utils';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

function App(): JSX.Element {
  useEffect(() => {
    checkMode();
    return () => {};
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Layout>
        <AppRoutes />
      </Layout>
      <ProductDetail />
      <Cart />
    </BrowserRouter>
  );
}

export default App;
