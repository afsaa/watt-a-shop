import { BrowserRouter, useRoutes } from 'react-router-dom';
import Home from '../Home';
import { useEffect, useState } from 'react';
import { checkMode, toggleDarkMode } from '../../utils';
import MyAccount from '../MyAccount';
import MyOrders from '../MyOrders';
import SignIn from '../SignIn';
import NotFound from '../NotFound';
import CurrentOrder from '../CurrentOrder';
import { ProductDetail, Cart, Navbar } from '@/components';
import { useAppStore } from '../../store';
import { Order } from '../../store/store.types';
import { Layout } from '../../components';
import { NavbarLink } from '../../components/Navbar/navbar.type';

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
        setShowCart={setShowCart}
        isDarkMode={isDarkModeOn}
        toggleDarkMode={handleToggleDarkMode}
        setCategoryQuery={setCategoryQuery}
        toggleMenu={toggleMenu}
        toggleMenuHandler={handleToggleMenu}
      />
      <Layout>
        <AppRoutes />
      </Layout>
      <ProductDetail />
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
