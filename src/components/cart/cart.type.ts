import { Product } from '../../store/store.types';

export type CartProps = {
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  cart: Product[];
  total: number;
  handleCheckout: () => void;
  currentOrderId: number;
  removeFromCart?: (id: number) => void;
  clearCart?: () => void;
};
