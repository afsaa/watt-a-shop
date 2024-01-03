import { Product } from '../../store/store.types';

export type ProductCardProps = Product & {
  isProductInCart: boolean;
  handleShowProductDetail: (product: Product) => void;
  handleAddProductToCart: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, product: Product) => void;
};
