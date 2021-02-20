import React, { useEffect } from 'react';

import styled from '@emotion/styled';
import { Route, Switch } from 'react-router';

import Footer from 'src/components/domain/Footer/Footer';
import HeaderLogo from 'src/components/domain/HeaderLogo/HeaderLogo';
import UserMenu from 'src/components/domain/UserMenu/UserMenu';
import { useSetUser, useUser } from 'src/contexts/userContext';
import useAxios from 'src/hooks/useAxios';
import { size, spacing } from 'src/theme';

import AuthenticationPage from './AuthenticationPage/AuthenticationPage';
import CommentsAreaPage from './CommentsAreaPage/CommentsAreaPage';
import CommentsAreasListPage from './CommentsAreasListPage/CommentsAreasListPage';

const Page = styled.div`
  max-width: 1000px;
  margin: auto;
  margin-top: ${spacing(4)};

  @media (max-width: 1280px) {
    max-width: 720px;
  }

  @media (max-width: 768px) {
    max-width: 600px;
  }

  @media (max-width: 640px) {
    max-width: 100%;
    margin-left: ${spacing(4)};
    margin-right: ${spacing(4)};
  }
`;

const Main = styled.main`
  min-height: ${size('xlarge')};
`;

const Pages: React.FC = () => {
  const setUser = useSetUser();

  const [, { status }, logout] = useAxios({ method: 'POST', url: '/api/auth/logout' }, { manual: true });

  useEffect(() => {
    if (status(204)) {
      setUser(null);
    }
  }, [status, setUser]);

  return (
    <Page>
      <HeaderLogo right={<UserMenu user={useUser()} onLogout={logout} />} />

      <Main>
        <Switch>
          <Route path="/" exact component={CommentsAreasListPage} />
          <Route path="/commentaires/:commentsAreaId" component={CommentsAreaPage} />
          <Route path="/(connexion|inscription|connexion-par-email)" component={AuthenticationPage} />
        </Switch>
      </Main>

      <Footer />
    </Page>
  );
};

export default Pages;