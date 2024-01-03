import { useNavigate } from 'react-router-dom';
import Button from '../Button/button';
import CartItem from '../CartItem/cartItem';
import { CartProps } from './cart.type';

const Cart = ({ showCart, setShowCart, cart, total, handleCheckout, currentOrderId, handleRemoveFromCart }: CartProps) => {
  const navigate = useNavigate();

  return (
    <aside
      className={`w-80 h-[calc(100vh-360px)] md:h-[calc(100vh-75px)] mt-[340px] md:mt-[70px] p-4 border border-black dark:border-white rounded-lg ${
        showCart ? 'flex' : 'hidden'
      } flex-col gap-4 fixed top-1 right-4 overflow-y-scroll bg-white/75 dark:bg-slate-800/75`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-center text-black dark:text-white">Cart</h2>
        <svg
          data-testid="close-icon"
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
        {cart.map((cartProduct) => (
          <CartItem key={cartProduct.id} {...cartProduct} handleRemoveFromCart={handleRemoveFromCart} />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold text-black dark:text-white">Total:</p>
        <span className="font-semibold text-xl text-black dark:text-white">${total.toFixed(2)}</span>
      </div>
      <Button
        className="w-full h-10 flex justify-center items-center rounded-lg bg-black dark:bg-white text-white dark:text-black disabled:opacity-75"
        onClick={() => {
          handleCheckout();
          navigate(`/my-orders/${currentOrderId}`);
        }}
      >
        Go to Checkout
      </Button>
    </aside>
  );
};

export default Cart;
