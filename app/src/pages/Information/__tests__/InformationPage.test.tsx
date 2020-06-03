import React from 'react';

import { createMemoryHistory, MemoryHistory } from 'history';
import { Route, Router } from 'react-router-dom';

import { AppContextProviderTesting } from 'src/contexts/AppContext';
import mockAxios, { mockAxiosResponseFor } from 'src/testing/jest-mock-axios';
import { User } from 'src/types/User';

import InformationPage from '../index';

import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

const mockUser: User = { id: 1 } as User;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockInformation: any = {
  id: 1,
  title: 'FAKE new',
  url: 'http://fakenew.fake',
  image: null,
  creator: {
    id: 1,
    nick: 'nick',
    avatar: null,
  },
  reactionsCount: 0,
};

describe.skip('InformationPage', () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
    history.push('/information');
  });

  describe('Notifications count', () => {
    afterEach(() => {
      mockAxios.reset();
    });

    it('should display information title', async () => {
      history.push('/information/1/reactions');

      const { getByText } = render(
        <Router history={history}>
          <AppContextProviderTesting user={{ user: mockUser, setUser: () => {} }}>
            <Route path="/information/:id" component={InformationPage} />
          </AppContextProviderTesting>
        </Router>,
      );

      await mockAxiosResponseFor(
        { url: '/api/information/1' },
        { data: mockInformation },
      );

      expect(getByText('FAKE new')).toBeVisible();
    });

    it('should set notification as seen and refetch notifications count', async () => {
      history.push('/information/1/reactions', { notificationId: 1 });

      render(
        <Router history={history}>
          <AppContextProviderTesting user={{ user: mockUser, setUser: () => {} }}>
            <Route path="/information/:id" component={InformationPage} />
          </AppContextProviderTesting>
        </Router>,
      );

      await mockAxiosResponseFor(
        { url: '/api/information/1' },
        { data: mockInformation },
      );

      expect(mockAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          url: '/api/notification/1/seen',
        }),
      );

      expect(mockAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/api/notification/me/count',
        }),
      );
    });
  });
});
