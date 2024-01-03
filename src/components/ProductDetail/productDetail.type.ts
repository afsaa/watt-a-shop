import { Product } from '../../store/store.types';

export type ProductDetailProps = Product & { showProductDetail: boolean; handleShowProductDetail: (showProductDetail: boolean) => void };
