import { Order } from '../../store/store.types';

export type OrderCardProps = Order & {
  handleSetCurrentOrder: (order: Order) => void;
};
