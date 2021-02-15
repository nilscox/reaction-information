import React, { forwardRef } from 'react';

import styled from '@emotion/styled';

import AvatarImage from 'src/components/elements/AvatarImage/AvatarImage';
import Icon from 'src/components/elements/Icon/Icon';
import Menu, { MenuItem } from 'src/components/elements/Menu/Menu';
import { Comment, DoneAll, Logout, Notification } from 'src/components/icons';
import { color, fontWeight, size, spacing, textColor } from 'src/theme';
import { User } from 'src/types/User';

const AvatarNickContainer = styled.button`
  width: ${size('small')};
  border: none;
  outline: none;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: ${fontWeight('bold')};
  color: ${textColor('default')};
  cursor: pointer;

  img {
    margin-bottom: ${spacing(0.5)};
  }
`;

type AvatarNickContainerProps = React.ComponentProps<typeof AvatarNickContainer> & {
  user: User;
};

const AvatarNick = forwardRef<HTMLButtonElement, AvatarNickContainerProps>(({ user, ...props }, ref) => (
  <AvatarNickContainer ref={ref} {...props}>
    <AvatarImage src={user.avatar} />
    {user.nick}
  </AvatarNickContainer>
));

AvatarNick.displayName = 'AvatarNick';

const MenuIcon = styled(Icon)`
  margin-right: ${spacing(2)};
  color: ${color('icon')};
`;

type AuthenticatedUserMenuProps = {
  user: User;
};

const AuthenticatedUserMenu: React.FC<AuthenticatedUserMenuProps> = ({ user }) => (
  <Menu menuButton={<AvatarNick user={user} />}>
    <MenuItem>
      <MenuIcon as={Notification} />
      Notifications
    </MenuItem>
    <MenuItem>
      <MenuIcon as={Comment} />
      Mes commentaires
    </MenuItem>
    <MenuItem>
      <MenuIcon as={DoneAll} />
      Modération
    </MenuItem>
    <MenuItem>
      <MenuIcon as={Logout} />
      Déconnexion
    </MenuItem>
  </Menu>
);

export default AuthenticatedUserMenu;