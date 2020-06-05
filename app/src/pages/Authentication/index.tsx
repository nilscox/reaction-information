import React from 'react';

import { Redirect, useHistory } from 'react-router-dom';

import AuthenticationForm from 'src/components/AuthenticationForm';
import { useUser } from 'src/contexts/UserContext';
import { User } from 'src/types/User';

import { Box } from '@material-ui/core';

const Authentication: React.FC = () => {
  const [currentUser, setUser] = useUser();
  const history = useHistory();

  const handleAuthenticated = (user: User) => {
    setUser(user);
    history.push('/');
  };

  if (currentUser)
    return <Redirect to="/" />;

  return (
    <Box margin="auto" maxWidth={480} marginTop={16}>
      <AuthenticationForm formErrorConsistentHeight onAuthenticated={handleAuthenticated} />
    </Box>
  );
};

export default Authentication;