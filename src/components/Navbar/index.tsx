import { NavLink } from 'react-router-dom';
import { useAppStore } from '../../store';
import { toggleDarkMode } from '../../utils';

const Navbar = (): JSX.Element => {
  const shoppingCartCount: number = useAppStore((state) => state.shoppingCartCount);
  const isDarkModeOn: boolean = useAppStore((state) => state.isDarkModeOn);
  const setDarkMode: () => void = useAppStore((state) => state.setDarkMode);
  const activeStyle: string = 'underline underline-offset-4';

  const handleToggleDarkMode = () => () => {
    toggleDarkMode(!isDarkModeOn);
    setDarkMode();
  };

  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white dark:bg-slate-800">
      <ul className="flex items-center gap-4 text-black dark:text-white">
        <li className="font-semibold text-lg">
          <NavLink to="/">Watt a Shop</NavLink>
        </li>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            All
          </NavLink>
        </li>
        <li>
          <NavLink to="/stoves" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Stoves
          </NavLink>
        </li>
        <li>
          <NavLink to="/heat-pumps" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Heat pumps
          </NavLink>
        </li>
        <li>
          <NavLink to="/cars" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Cars
          </NavLink>
        </li>
        <li>
          <NavLink to="/others" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Others
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-4">
        <li className="text-black/60 dark:text-white/60">support@wattashop.com</li>
        <li className="text-black dark:text-white">
          <NavLink to="/my-orders" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            My Orders
          </NavLink>
        </li>
        <li className="text-black dark:text-white">
          <NavLink to="/my-account" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            My Account
          </NavLink>
        </li>
        <li className="text-black dark:text-white">
          <NavLink to="/sign-in" className={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Sign In
          </NavLink>
        </li>
        <li className="flex items-center text-black dark:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-black dark:text-white">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <div className="text-lg">{shoppingCartCount}</div>
        </li>
        <li>
          <button onClick={handleToggleDarkMode()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black dark:text-white">
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
