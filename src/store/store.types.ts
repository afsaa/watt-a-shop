/* eslint-disable @typescript-eslint/no-explicit-any */
interface Rating {
  count: number;
  rate: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: Rating;
  savedCO2?: number;
}

export interface Order {
  id: number;
  date: Date | string;
  products: Product[];
  totalProducts: number;
  totalPrice: number;
}

export interface AppState {
  isDarkModeOn: boolean;
  setDarkMode: () => void;
  shoppingCartCount: number;
  increaseShoppingCartCount: (count: number) => void;
  decreaseShoppingCartCount: (count: number) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  showProductDetail: boolean;
  setShowProductDetail: (show: boolean) => void;
  currentProduct: Product | Record<string, never>;
  setCurrenProduct: (product: Product) => void;
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  shoppingCartProducts: Product[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: number) => void;
  currentOrder: Order | Record<string, never>;
  setCurrenOrder: (order: Order) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
}
