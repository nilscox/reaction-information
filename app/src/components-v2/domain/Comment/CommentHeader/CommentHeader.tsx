/** @jsx jsx */
import { useState } from 'react';

import { jsx } from '@emotion/react';
import styled from '@emotion/styled';

import CommentDate from 'src/components-v2/domain/Comment/CommentHeader/CommentDate/CommentDate';
import { borderRadius, color, domain, spacing } from 'src/theme';
import { UserLight } from 'src/types/User';

import UserAvatarNick from '../../UserAvatarNick/UserAvatarNick';

import EditCommentButton from './EditCommentButton/EditCommentButton';
import ReportCommentLink from './ReportCommentLink/ReportCommentLink';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${color('border')};
  border-top-left-radius: ${borderRadius(2)};
  border-top-right-radius: ${borderRadius(2)};
  padding: ${spacing(0.5)};
  background: ${domain('commentLightBackground')};
`;

const ReportDateContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
`;

type CommentHeaderProps = {
  user: UserLight;
  canEdit: boolean;
  edited: boolean;
  date: Date;
  onEdit: () => void;
  onReport: () => void;
};

const CommentHeader: React.FC<CommentHeaderProps> = ({ user, canEdit, edited, date, onEdit, onReport }) => {
  const [reportCommentLinkVisible, setReportCommentLinkVisible] = useState(false);

  return (
    <Container>
      <UserAvatarNick small user={user} />

      {canEdit && <EditCommentButton onClick={onEdit} css={theme => ({ marginLeft: theme.spacings[2] })} />}

      <ReportDateContainer
        onMouseOver={() => setReportCommentLinkVisible(true)}
        onMouseOut={() => setReportCommentLinkVisible(false)}
      >
        <ReportCommentLink visible={reportCommentLinkVisible} onClick={onReport} />

        <CommentDate date={date} edited={edited} />
      </ReportDateContainer>
    </Container>
  );
};

export default CommentHeader;