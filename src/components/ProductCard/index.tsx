import { useAppStore } from '../../store';
import { Product } from '../../store/store.types';
import Button from '../Button';

const ProductCard = ({ id, image, title, price, description, ...props }: Product) => {
  const shoppingCartProducts = useAppStore((state) => state.shoppingCartProducts);
  const addProductToCart = useAppStore((state) => state.addProductToCart);
  const increaseShoppingCartCount = useAppStore((state) => state.increaseShoppingCartCount);
  const isProductInCart: boolean = shoppingCartProducts.some((product) => product.id === id);
  const setShowProductDetail = useAppStore((state) => state.setShowProductDetail);
  const setShowCart = useAppStore((state) => state.setShowCart);
  const setCurrenProduct = useAppStore((state) => state.setCurrenProduct);

  const handleShowProductDetail: () => void = () => {
    setCurrenProduct({
      id,
      title,
      price,
      description,
      image,
      ...props,
    });
    setShowCart(false);
    setShowProductDetail(true);
  };

  const handleAddProductToCart: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void = (event) => {
    event.stopPropagation();
    addProductToCart({
      id,
      title,
      price,
      description,
      image,
      ...props,
    });
    increaseShoppingCartCount(1);
    setShowProductDetail(false);
    setShowCart(true);
  };

  return (
    <div className="w-60 h-auto p-4 border border-black dark:border-white rounded-lg text-black dark:text-white cursor-pointer" onClick={() => handleShowProductDetail()}>
      <figure className="w-full h-2/3 rounded-lg">
        <img className="w-full h-full object-cover rounded-lg" src={image} alt={description} />
      </figure>
      <div className="w-full h-1/3 flex flex-col justify-evenly items-center">
        <p>{title}</p>
        <p className="text-center text-xl font-semibold">${price}</p>
        <Button
          className="w-full h-10 flex justify-center items-center rounded-lg bg-black dark:bg-white text-white dark:text-black disabled:opacity-75"
          onClick={(e) => handleAddProductToCart(e)}
          disabled={isProductInCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
