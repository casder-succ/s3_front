import { FC, ReactElement } from 'react';
import { AppShell } from '@mantine/core';

import Footer from './Footer';

import classes from './MainLayout.module.css';

interface MainLayoutProps {
  children: ReactElement;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => (
  <AppShell
    header={{ height: 72 }}
    footer={{ height: 40 }}
    classNames={{
      root: classes.root,
      main: classes.main,
    }}
  >
    <AppShell.Main>
      {children}
    </AppShell.Main>
  </AppShell>
);

export default MainLayout;
