import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return <main className="w-full min-h-[calc(100vh-64px)] flex flex-col items-center mt-16">{children}</main>;
};

export default Layout;
