import React, { useEffect } from 'react';

import UserMenu from 'src/components/domain/UserMenu/UserMenu';
import { useNotificationsCount } from 'src/contexts/notificationsContext';
import { useSetUser, useUser } from 'src/contexts/userContext';
import useAxios from 'src/hooks/useAxios';

const UserMenuContainer: React.FC = () => {
  const user = useUser();
  const setUser = useSetUser();
  const notificationsCount = useNotificationsCount();

  const [, { loading, status }, logout] = useAxios({ method: 'POST', url: '/api/auth/logout' }, { manual: true });

  useEffect(() => {
    if (status(204)) {
      setUser(null);
    }
  }, [status, setUser]);

  return <UserMenu loading={loading} user={user} notificationsCount={notificationsCount} onLogout={logout} />;
};

export default UserMenuContainer;
