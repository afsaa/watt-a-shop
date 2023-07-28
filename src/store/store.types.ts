/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
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
  products: Product[];
  setProducts: (products: Product[]) => void;
  showProductDetail: boolean;
  setShowProductDetail: (show: boolean) => void;
  currentProduct: Product | Record<string, never>;
  setCurrenProduct: (product: Product) => void;
  showCheckout: boolean;
  setShowCheckout: (show: boolean) => void;
  shoppingCartProducts: Product[];
  addProductToCart: (product: Product) => void;
  currentOrder: Order | Record<string, never>;
  setCurrenOrder: (order: Order) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
}
