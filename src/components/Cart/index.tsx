import { useAppStore } from '../../store';
import CartItem from '../CartItem';

const Cart = () => {
  const showCart = useAppStore((state) => state.showCart);
  const setShowCart = useAppStore((state) => state.setShowCart);
  const shoppingCartProducts = useAppStore((state) => state.shoppingCartProducts);
  const cartProductsTotalPrice: number = shoppingCartProducts.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);

  return (
    <aside className={`w-80 h-[calc(100vh-75px)] mt-[70px] p-4  border border-black dark:border-white rounded-lg ${showCart ? 'flex' : 'hidden'} flex-col gap-4 fixed top-1 right-4 overflow-y-scroll`}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-center text-black dark:text-white">Cart</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 relative top-0 right-0 cursor-pointer text-black dark:text-white"
          onClick={() => setShowCart(false)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        {shoppingCartProducts.map((cartProduct) => (
          <CartItem key={cartProduct.id} {...cartProduct} />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold text-black dark:text-white">Total:</p>
        <span className="font-semibold text-xl text-black dark:text-white">${cartProductsTotalPrice.toFixed(2)}</span>
      </div>
    </aside>
  );
};

export default Cart;
