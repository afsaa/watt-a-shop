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
  id: number | string;
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
  setShoppingCartCount: (count: number) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  titleQuery: string;
  setTitleQuery: (query: string) => void;
  categoryQuery: string;
  setCategoryQuery: (query: string) => void;
  filteredProducts: Product[];
  setFilteredProducts: (filteredProducts: Product[]) => void;
  showProductDetail: boolean;
  setShowProductDetail: (show: boolean) => void;
  currentProduct: Product | Record<string, never>;
  setCurrenProduct: (product: Product) => void;
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  shoppingCartProducts: Product[];
  setShoppingCartProducts: (products: Product[] | []) => void;
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: number) => void;
  currentOrder: Order | Record<string, never>;
  setCurrenOrder: (order: Order) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
}
