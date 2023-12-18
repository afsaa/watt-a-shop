import { Order } from '../../store/store.types';

export type OrderCardProps = Order & {
  setCurrentOrder: (order: Order) => void;
};
