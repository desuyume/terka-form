import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@common/index';
import { Footer } from '@common/index';

import s from './Layout.module.scss';

const Layout: FC = () => {
  return (
    <main className={s.Layout}>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
