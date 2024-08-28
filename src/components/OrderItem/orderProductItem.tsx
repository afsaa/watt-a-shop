import { Product } from '@/store/store.types';

const OrderProductItem = ({ image, description, title, price }: Product) => {
  return (
    <div className="flex justify-between items-center gap-6">
      <figure className="w-40 h-auto">
        <img className="w-full h-auto rounded-lg object-cover" src={image} alt={description} />
      </figure>
      <p className="text-sm">{title}</p>
      <span className="font-semibold text-lg">${price}</span>
    </div>
  );
};

export default OrderProductItem;
