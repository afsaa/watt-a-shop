import { Cart, Layout, Navbar, ProductDetail } from '@/components';
import { AppRoutes } from '@/routes';
import { useAppStore } from '@/store';
import { Product } from '@/store/store.types';
import { checkMode } from '@/utils';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

function App(): JSX.Element {
  const showProductDetail: boolean = useAppStore((state) => state.showProductDetail);
  const setShowProductDetail: (show: boolean) => void = useAppStore((state) => state.setShowProductDetail);
  const currentProduct = useAppStore((state) => state.currentProduct);

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
      <ProductDetail showProductDetail={showProductDetail} handleShowProductDetail={setShowProductDetail} {...(currentProduct as Product)} />
      <Cart />
    </BrowserRouter>
  );
}

export default App;
