import { NavLink } from 'react-router-dom';
import { NavbarProps } from './navbar.type';

const Navbar = ({ links, cartCount, handleShowCartFromNavbar, setCategoryQuery, toggleDarkMode, toggleMenu, toggleMenuHandler }: NavbarProps): JSX.Element => {
  const activeStyle: string = 'underline underline-offset-4';

  return (
    <nav className="relative md:static flex items-center justify-between z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white dark:bg-slate-800">
      <div className={`w-full md:flex hidden justify-around items-center bg-white/75 dark:bg-slate-800/75`}>
        <ul className={`flex flex-col md:flex-row items-center gap-2 text-black dark:text-white`}>
          <li className="font-semibold text-lg">
            <NavLink to="/" onClick={() => setCategoryQuery('')}>
              Watt a Shop
            </NavLink>
          </li>
          {links.map((link) => (
            <li key={crypto.randomUUID()}>
              <NavLink to={link.href} onClick={() => setCategoryQuery(link.href.replace('/', '').replace('-', ' '))} className={link.className}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className={`flex flex-col md:flex-row items-center gap-2`}>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-black dark:text-white cursor-pointer"
              onClick={handleShowCartFromNavbar}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <div className="text-lg">{cartCount}</div>
          </li>
          <li>
            <button onClick={() => toggleDarkMode()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black dark:text-white">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            </button>
          </li>
        </ul>
      </div>

      <div
        className={`${
          toggleMenu === false ? 'hidden' : ''
        } w-3/4 md:w-full py-4 pr-4 md:p-0 rounded-lg absolute md:static top-full flex md:hidden justify-between items-center gap-4 bg-white/75 dark:bg-slate-800/75`}
      >
        <ul className={`flex flex-col md:flex-row items-center gap-2 text-black dark:text-white`}>
          <li className="font-semibold text-lg">
            <NavLink to="/" onClick={() => setCategoryQuery('')}>
              Watt a Shop
            </NavLink>
          </li>
          {links.map((link) => (
            <li key={crypto.randomUUID()}>
              <NavLink to={link.href} onClick={() => setCategoryQuery(link.href.replace('/', '').replace('-', ' '))} className={link.className}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className={`flex flex-col md:flex-row items-center gap-2`}>
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
            <div className="text-lg">{cartCount}</div>
          </li>
          <li>
            <button onClick={() => toggleDarkMode()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black dark:text-white">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            </button>
          </li>
        </ul>
      </div>

      <div className="md:hidden cursor-pointer" onClick={() => toggleMenuHandler()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black dark:text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;
