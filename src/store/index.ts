import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AppState } from './store.types';

const initialState: AppState = {
  products: [],
  productsToShow: [],
  titleQuery: '',
  categoryQuery: '',
  shoppingCartProducts: [],
  shoppingCartCount: 0,
  isDarkModeOn: false,
  filteredProducts: [],
  currentProduct: {},
  currentOrder: {},
  orders: [],
  showCart: false,
  showProductDetail: false,
  setDarkMode: () => {},
  increaseShoppingCartCount: () => {},
  decreaseShoppingCartCount: () => {},
  setTitleQuery: () => {},
  setCategoryQuery: () => {},
  setShoppingCartCount: () => {},
  setProducts: () => {},
  setProductsToShow: () => {},
  setFilteredProducts: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  setShoppingCartProducts: () => {},
  setCurrenProduct: () => {},
  setCurrenOrder: () => {},
  addOrder: () => {},
  setShowCart: () => {},
  setShowProductDetail: () => {},
  resetStore: () => {},
};

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        isDarkModeOn: false,
        setDarkMode: () => set((state) => ({ isDarkModeOn: !state.isDarkModeOn })),
        shoppingCartCount: 0,
        increaseShoppingCartCount: (count) => set((state) => ({ shoppingCartCount: state.shoppingCartCount + count })),
        decreaseShoppingCartCount: (count) => set((state) => ({ shoppingCartCount: state.shoppingCartCount - count })),
        products: [],
        productsToShow: [],
        titleQuery: '',
        setTitleQuery: (query) => set(() => ({ titleQuery: query })),
        categoryQuery: '',
        setCategoryQuery: (query) => set(() => ({ categoryQuery: query })),
        filteredProducts: [],
        setShoppingCartCount: (count) => set(() => ({ shoppingCartCount: count })),
        setProducts: (products) => set(() => ({ products })),
        setProductsToShow(products, currentPage, itemsPerPage) {
          set(() => ({ productsToShow: products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) }));
        },
        setFilteredProducts: (filteredProducts) => set(() => ({ filteredProducts })),
        shoppingCartProducts: [],
        addProductToCart: (product) => set((state) => ({ shoppingCartProducts: [...state.shoppingCartProducts, { ...product }] })),
        removeProductFromCart: (productId) => set((state) => ({ shoppingCartProducts: [...state.shoppingCartProducts.filter((product) => product.id !== productId)] })),
        setShoppingCartProducts: (products) => set(() => ({ shoppingCartProducts: products })),
        currentProduct: {},
        setCurrenProduct: (product) => set(() => ({ currentProduct: product })),
        currentOrder: {},
        setCurrenOrder: (order) => set(() => ({ currentOrder: order })),
        orders: [],
        addOrder: (newOrder) => set((state) => ({ orders: [...state.orders, { ...newOrder }] })),
        showCart: false,
        setShowCart: (show) => set(() => ({ showCart: show })),
        showProductDetail: false,
        setShowProductDetail: (show) => set(() => ({ showProductDetail: show })),
        resetStore: () => set(() => initialState),
      }),
      {
        name: 'shop-storage',
      }
    )
  )
);
