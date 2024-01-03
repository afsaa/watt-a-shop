import { Product } from '../../store/store.types';

export type CartProps = {
  showCart: boolean;
  setShowCart: (show: boolean) => void;
  cart: Product[];
  total: number;
  handleCheckout: () => void;
  currentOrderId: string | number;
  handleRemoveFromCart: (productId: number) => void;
  clearCart?: () => void;
};
