import React, { createContext, useEffect } from 'react';

import useAxios from 'src/hooks/use-axios';
import { parseNotificationsCount } from 'src/types/Notifications';
import { useCurrentUser } from 'src/hooks/use-user';

type NotificationsCountContextType = {
  count: number;
  refetch: () => void;
};

const NotificationsCountContext = createContext<NotificationsCountContextType>(null as any);

const useNotificationsCount = () => {
  const [{ data: count }, refetch] = useAxios('/api/notification/me/count', parseNotificationsCount, { manual: true });
  const user = useCurrentUser();

  useEffect(() => {
    if (user)
      refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return {
    count,
    refetch,
  };
};

export const NotificationsCountProvider: React.FC = ({ children }) => {
  const value = useNotificationsCount();

  return (
    <NotificationsCountContext.Provider value={value}>
      { children }
    </NotificationsCountContext.Provider>
  );
};

export default NotificationsCountContext;
