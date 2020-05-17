import React from 'react';

import { useCurrentUser } from 'src/utils/UserContext';

import { Button, IconButton, makeStyles, useMediaQuery } from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply';

const useStyles = makeStyles(({ spacing }) => ({
  buttonText: {
    padding: spacing(0, 1),
  },
  iconSizeSmall: {
    padding: spacing(0, 1),
    fontSize: spacing(5),
    '& svg': {
      fontSize: 'inherit',
    },
  },
}));

type ReplyButtonProps = {
  disabled: boolean;
  onReply: () => void;
};

const ReplyButton: React.FC<ReplyButtonProps> = ({ disabled, onReply }) => {
  const user = useCurrentUser();

  const verySmall = useMediaQuery('(max-width: 360px)');
  const classes = useStyles();

  if (!user)
    return null;

  if (verySmall) {
    return (
      <IconButton size="small" classes={{ sizeSmall: classes.iconSizeSmall }} onClick={onReply}>
        <ReplyIcon />
      </IconButton>
    );
  }

  return (
    <Button disabled={disabled} classes={{ text: classes.buttonText }} onClick={onReply}>
      Répondre
    </Button>
  );
};

export default ReplyButton;
