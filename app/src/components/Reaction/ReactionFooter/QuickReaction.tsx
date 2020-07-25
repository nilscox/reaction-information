import React from 'react';

import clsx from 'clsx';

import { QuickReactionType } from 'src/types/Reaction';

import { Button, Grid, makeStyles, Typography } from '@material-ui/core';

type StylesProps = {
  userQuickReaction?: boolean;
}

const useStyles = makeStyles(({ breakpoints, spacing, palette: { selected, text } }) => ({
  button: ({ userQuickReaction }: StylesProps) => ({
    padding: spacing(1, 2),
    fontWeight: 'normal',
    ...(userQuickReaction && {
      fontWeight: 'bold',
      backgroundColor: selected.main,
    }),
    [breakpoints.down('xs')]: {
      padding: spacing(0.5, 1),
    },
  }),
  buttonRoot: {
    '&$disabled': {
      color: text.secondary,
    },
  },
  disabled: {},
  image: {
    width: spacing(6),
    height: spacing(6),
    [breakpoints.down('xs')]: {
      width: spacing(4),
      height: spacing(4),
    },
  },
  count: {
    fontWeight: 'bold',
    marginLeft: spacing(2),
    [breakpoints.down('xs')]: {
      marginLeft: spacing(1),
    },
  },
}));

const quickReactionTraduction = {
  [QuickReactionType.APPROVE]: 'Approuver',
  [QuickReactionType.REFUTE]: 'Réfuter',
  [QuickReactionType.SKEPTIC]: 'Sceptique',
};

export type QuickReactionProps = {
  icon: string;
  count: number;
  type: QuickReactionType;
  userQuickReaction?: boolean;
  onClick?: () => void;
};

const QuickReaction: React.FC<QuickReactionProps> = ({ icon, count, type, userQuickReaction, onClick }) => {
  const classes = useStyles({ userQuickReaction });

  return (
    <Button
      type="button"
      disabled={!onClick}
      title={quickReactionTraduction[type]}
      className={clsx(
        'quick-reaction',
        'quick-reaction--' + type,
        userQuickReaction && 'user-quick-reaction',
        classes.button,
      )}
      classes={{ root: classes.buttonRoot, disabled: classes.disabled }}
      onClick={() => onClick && onClick()}
    >

      <Grid container alignItems="center">
        <img src={icon} className={classes.image} />
        <Typography className={classes.count}>{ count }</Typography>
      </Grid>

    </Button>
  );
};

export default QuickReaction;
