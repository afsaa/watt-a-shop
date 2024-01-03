import { Product } from '../../store/store.types';

export type CartItemProps = Product & {
  handleRemoveFromCart: (productId: number) => void;
};
