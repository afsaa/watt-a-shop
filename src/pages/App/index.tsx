import { Cart, Navbar, ProductDetail } from '@/components';
import { useEffect, useState } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Layout } from '../../components';
import { NavbarLink } from '../../components/Navbar/navbar.type';
import { useAppStore } from '../../store';
import { Order, Product } from '../../store/store.types';
import { checkMode, toggleDarkMode } from '../../utils';
import CurrentOrder from '../CurrentOrder';
import Home from '../Home';
import MyAccount from '../MyAccount';
import MyOrders from '../MyOrders';
import NotFound from '../NotFound';
import SignIn from '../SignIn';

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
  const setCategoryQuery: (query: string) => void = useAppStore((state) => state.setCategoryQuery);
  const isDarkModeOn: boolean = useAppStore((state) => state.isDarkModeOn);
  const showProductDetail: boolean = useAppStore((state) => state.showProductDetail);
  const setShowProductDetail: (show: boolean) => void = useAppStore((state) => state.setShowProductDetail);
  const currentProduct = useAppStore((state) => state.currentProduct);
  const setDarkMode: () => void = useAppStore((state) => state.setDarkMode);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

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

  const handleToggleDarkMode = () => {
    toggleDarkMode(!isDarkModeOn);
    setDarkMode();
  };

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleShowCartFromNavbar = () => {
    setShowCart(true);
    setShowProductDetail(false);
  };

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

  const NavigationLinks = (): NavbarLink[] => {
    const activeStyle: string = 'underline underline-offset-4';

    const navigationLinks: NavbarLink[] = [
      {
        label: 'All',
        href: '/',
        className: ({ isActive }) => (isActive ? activeStyle : undefined),
      },
      {
        label: 'Electronics',
        href: '/electronics',
        className: ({ isActive }) => (isActive ? activeStyle : undefined),
      },
      {
        label: 'Jewelery',
        href: '/jewelery',
        className: ({ isActive }) => (isActive ? activeStyle : undefined),
      },
      {
        label: "Men's clothing",
        href: "/men's-clothing",
        className: ({ isActive }) => (isActive ? activeStyle : undefined),
      },
      {
        label: "Women's clothing",
        href: "/women's-clothing",
        className: ({ isActive }) => (isActive ? activeStyle : undefined),
      },
    ];
    return navigationLinks;
  };

  return (
    <BrowserRouter>
      <Navbar
        links={NavigationLinks()}
        cartCount={shoppingCartCount}
        handleShowCartFromNavbar={handleShowCartFromNavbar}
        isDarkMode={isDarkModeOn}
        toggleDarkMode={handleToggleDarkMode}
        setCategoryQuery={setCategoryQuery}
        toggleMenu={toggleMenu}
        toggleMenuHandler={handleToggleMenu}
      />
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
