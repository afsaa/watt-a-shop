import { LayoutProps } from './layout.type';

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return <main className="w-full min-h-[calc(100vh-75px)] flex flex-col items-center mt-10">{children}</main>;
};

export default Layout;
