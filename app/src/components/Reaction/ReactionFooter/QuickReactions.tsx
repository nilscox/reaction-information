import React, { useEffect, useState } from 'react';

import { AxiosRequestConfig } from 'axios';

import { useCurrentUser } from 'src/contexts/UserContext';
import useAxios from 'src/hooks/use-axios';
import { useTheme } from 'src/theme/Theme';
import { parseReaction, QuickReactionsCount, QuickReactionType, Reaction } from 'src/types/Reaction';
import { trackSetReaction } from 'src/utils/track';

import QuickReaction, { QuickReactionProps } from './QuickReaction';

import approve from './images/approve.png';
import refute from './images/refute.png';
import skeptic from './images/skeptic.png';

import { Grid } from '@material-ui/core';

const VBreak: React.FC = () => {
  const { colors: { borderLight } } = useTheme();

  return (
    <div style={{ borderRight: `1px solid ${borderLight}` }} />
  );
};

const useQuickReactions = (
  reactionId: number,
  authorId: number,
  qrc: QuickReactionsCount,
  originalUserQuickReaction: QuickReactionType,
) => {
  const user = useCurrentUser();
  const [updatedQuickReaction, setUpdatedQuickReaction] = useState<QuickReactionType | null>();
  const userQuickReaction = user && (updatedQuickReaction || originalUserQuickReaction);

  const opts: AxiosRequestConfig = {
    method: 'POST',
    url: `/api/reaction/${reactionId}/quick-reaction`,
  };

  const [{ data: updated, error, status }, post] = useAxios(opts, parseReaction, { manual: true });

  if (error)
    throw error;

  const updateUserQuickReaction = (type: QuickReactionType) => {
    post({
      data: {
        reactionId,
        type: type ? type.toUpperCase() : null,
      },
    });

    // optimist update
    setUpdatedQuickReaction(type);
  };

  useEffect(() => {
    if (status(201)) {
      trackSetReaction();
      setUpdatedQuickReaction(updated.userQuickReaction);
    }
  }, [status, updated, setUpdatedQuickReaction]);

  const quickReactions: { [key in QuickReactionType]: QuickReactionProps } = {
    APPROVE: {
      icon: approve,
      count: qrc.APPROVE,
      type: QuickReactionType.APPROVE,
    },
    REFUTE: {
      icon: refute,
      count: qrc.REFUTE,
      type: QuickReactionType.REFUTE,
    },
    SKEPTIC: {
      icon: skeptic,
      count: qrc.SKEPTIC,
      type: QuickReactionType.SKEPTIC,
    },
  };

  const getQuickReactionProps = (type: QuickReactionType): QuickReactionProps => {
    const props = quickReactions[type];

    if (type === userQuickReaction)
      props.userQuickReaction = true;

    if (user?.id !== authorId)
      props.onClick = () => updateUserQuickReaction(type === userQuickReaction ? null : type);

    if (typeof updatedQuickReaction !== 'undefined') {
      if (originalUserQuickReaction !== type && updatedQuickReaction === type)
        props.count++;
      if (originalUserQuickReaction === type && updatedQuickReaction !== type)
        props.count--;
    }

    return props;
  };

  return {
    APPROVE: getQuickReactionProps(QuickReactionType.APPROVE),
    REFUTE: getQuickReactionProps(QuickReactionType.REFUTE),
    SKEPTIC: getQuickReactionProps(QuickReactionType.SKEPTIC),
  };
};

type QuickReactionsProps = {
  reaction: Reaction;
};

const QuickReactions: React.FC<QuickReactionsProps> = ({ reaction }) => {
  const props = useQuickReactions(
    reaction.id,
    reaction.author.id,
    reaction.quickReactionsCount,
    reaction.userQuickReaction,
  );

  return (
    <Grid container>

      <QuickReaction {...props[QuickReactionType.APPROVE]} />
      <VBreak />

      <QuickReaction {...props[QuickReactionType.REFUTE]} />
      <VBreak />

      <QuickReaction {...props[QuickReactionType.SKEPTIC]} />
      <VBreak />

    </Grid>
  );
};

export default QuickReactions;
