import { useAppStore } from '../../store';
import { Product } from '../../store/store.types';
import Button from '../Button';

const ProductCard = ({ image, title, price, description, ...props }: Product) => {
  const addProductToCart = useAppStore((state) => state.addProductToCart);
  const increaseShoppingCartCount = useAppStore((state) => state.increaseShoppingCartCount);
  const handleAddProductToCart: () => void = () => {
    addProductToCart({
      title,
      price,
      description,
      image,
      ...props,
    });
    increaseShoppingCartCount(1);
  };

  return (
    <div className="w-80 p-4 h-auto border border-black dark:border-white rounded-lg text-black dark:text-white cursor-pointer">
      <figure className="w-full h-3/4 rounded-lg">
        <img className="w-full h-full object-cover rounded-lg" src={image} alt={description} />
      </figure>
      <div className="w-full h-1/4 flex flex-col justify-evenly items-center">
        <p className="text-lg">{title}</p>
        <p className="text-center text-xl font-semibold">${price}</p>
        <Button className="w-full h-10 flex justify-center items-center rounded-lg bg-black dark:bg-white text-white dark:text-black" onClick={() => handleAddProductToCart()}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
