import { FC, ReactElement } from 'react';

import MainLayout from './MainLayout';
import PrivateScope from './PrivateScope';

import 'resources/user/user.handlers';

interface PageConfigProps {
  children: ReactElement;
}

const PageConfig: FC<PageConfigProps> = ({ children }) => {
  return (
    <PrivateScope>
      <MainLayout>
        {children}
      </MainLayout>
    </PrivateScope>
  );
};

export default PageConfig;
