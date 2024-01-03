type NavbarLinkClassNameProps = {
  isActive: boolean;
  isPending: boolean;
};

export type NavbarLink = {
  label: string;
  href: string;
  className?: string | (({ isActive }: NavbarLinkClassNameProps) => string | undefined);
  icon?: string;
};

export type NavbarProps = {
  links: NavbarLink[];
  isDarkMode: boolean;
  toggleMenu: boolean;
  cartCount: number;
  setCategoryQuery: (query: string) => void;
  toggleDarkMode: () => void;
  toggleMenuHandler: () => void;
  handleShowCartFromNavbar: () => void;
};
