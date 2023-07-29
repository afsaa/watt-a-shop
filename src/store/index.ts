import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AppState } from './store.types';

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        isDarkModeOn: false,
        setDarkMode: () => set((state) => ({ isDarkModeOn: !state.isDarkModeOn })),
        shoppingCartCount: 0,
        increaseShoppingCartCount: (count) => set((state) => ({ shoppingCartCount: state.shoppingCartCount + count })),
        products: [],
        setProducts: (products) => set(() => ({ products })),
        shoppingCartProducts: [],
        addProductToCart: (product) => set((state) => ({ shoppingCartProducts: [...state.shoppingCartProducts, { ...product }] })),
        currentProduct: {},
        setCurrenProduct: (product) => set(() => ({ currentProduct: product })),
        currentOrder: {},
        setCurrenOrder: (order) => set(() => ({ currentOrder: order })),
        orders: [],
        addOrder: (newOrder) => set((state) => ({ orders: { newOrder, ...state.orders } })),
        showCheckout: false,
        setShowCheckout: (show) => set(() => ({ showCheckout: show })),
        showProductDetail: false,
        setShowProductDetail: (show) => set(() => ({ showProductDetail: show })),
      }),
      {
        name: 'shop-storage',
      }
    )
  )
);
