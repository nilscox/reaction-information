import moment from 'moment';
import React from 'react';
import { RouteComponentProps } from 'react-router';

import { useTheme } from 'src/utils/Theme';

import { useReaction } from 'src/api/reaction';
import Break from 'src/components/common/Break';
import Loader from 'src/components/common/Loader';
import Box from 'src/components/common/Box';
import Flex from 'src/components/common/Flex';
import Text from 'src/components/common/Text';

import ReactionBody from 'src/components/reaction/ReactionBody';

const DATE_FORMAT = '[Le] DD.MM.YYYY [à] hh:mm';

type ReactionHistoryPopupProps = RouteComponentProps<{ id: string }>;

const ReactionHistoryPopup: React.FC<ReactionHistoryPopupProps> = ({ match }) => {
  const [reaction, { loading: fetchingReaction }] = useReaction(parseInt(match.params.id, 10));
  const { colors: { border }, sizes: { big } } = useTheme();

  if (fetchingReaction)
    return <Loader size="big" />;

  const history = [
    { date: reaction.edited, text: reaction.text },
    ...reaction.history.reverse(),
  ];

  return (
    <Box
      p={4 * big}
      style={{ height: '100%', boxSizing: 'border-box' }}
    >

      { history.map(({ date, text }, n) => (
        <div key={n}>

          { n > 0 && <Break size={30} /> }

          <Flex flexDirection="row" alignItems="center">
            <Flex mr={big} flex={1} border={`3px solid ${border}`} />
            <Text color="textLight">{ moment(date as Date).format(DATE_FORMAT) }</Text>
            <Flex ml={big} flex={1} border={`3px solid ${border}`} />
          </Flex>

          <Break size={big} />

          <ReactionBody text={text} />

        </div>
      )) }

    </Box>
  );
};

export default ReactionHistoryPopup;
