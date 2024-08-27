import { Cart, Layout, Navbar, ProductDetail } from '@/components';
import { AppRoutes } from '@/routes';
import { useAppStore } from '@/store';
import { Order, Product } from '@/store/store.types';
import { checkMode } from '@/utils';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

function App(): JSX.Element {
  const showCart = useAppStore((state) => state.showCart);
  const setShowCart = useAppStore((state) => state.setShowCart);
  const shoppingCartCount = useAppStore((state) => state.shoppingCartCount);
  const shoppingCartProducts = useAppStore((state) => state.shoppingCartProducts);
  const cartProductsTotalPrice: number = shoppingCartProducts.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
  const addOrder = useAppStore((state) => state.addOrder);
  const currentOrder = useAppStore((state) => state.currentOrder);
  const setCurrentOrder = useAppStore((state) => state.setCurrenOrder);
  const setShoppingCartProducts = useAppStore((state) => state.setShoppingCartProducts);
  const setShoppingCartCount = useAppStore((state) => state.setShoppingCartCount);
  const setTitleQuery = useAppStore((state) => state.setTitleQuery);
  const removeProductFromCart = useAppStore((state) => state.removeProductFromCart);
  const decreaseShoppingCartCount = useAppStore((state) => state.decreaseShoppingCartCount);

  const showProductDetail: boolean = useAppStore((state) => state.showProductDetail);
  const setShowProductDetail: (show: boolean) => void = useAppStore((state) => state.setShowProductDetail);
  const currentProduct = useAppStore((state) => state.currentProduct);

  const handleCheckout = () => {
    const randomId: string = crypto.randomUUID();
    const newOrder: Order = {
      id: randomId,
      date: new Date().toLocaleDateString(),
      products: shoppingCartProducts,
      totalProducts: shoppingCartCount,
      totalPrice: cartProductsTotalPrice,
    };

    addOrder(newOrder);
    setCurrentOrder(newOrder);
    setShowCart(false);
    setShoppingCartProducts([]);
    setShoppingCartCount(0);
    setTitleQuery('');
  };

  const handleRemoveProductFromCart = (productId: number) => {
    removeProductFromCart(productId);
    decreaseShoppingCartCount(1);
  };

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
      <Cart
        showCart={showCart}
        setShowCart={setShowCart}
        cart={shoppingCartProducts}
        total={cartProductsTotalPrice}
        handleCheckout={handleCheckout}
        currentOrderId={currentOrder.id}
        handleRemoveFromCart={handleRemoveProductFromCart}
      />
    </BrowserRouter>
  );
}

export default App;
