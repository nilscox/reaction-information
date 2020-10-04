import { useEffect } from 'react';

import { AxiosRequestConfig } from 'axios';

import useAxios from '../../../../hooks/use-axios';
import { Comment } from '../../../../types/Comment';
import { trackSubscribeComment, trackUnsubscribeComment } from '../../../../utils/track';

const useSubscription = (comment: Comment | null, setComment: (comment: Comment) => void) => {
  const opts: AxiosRequestConfig = {
    method: 'POST',
  };

  const [{ loading, error, status }, execute] = useAxios(opts, undefined, { manual: true });

  if (error) {
    throw error;
  }

  const toggleSubscription = () => {
    if (loading) {
      return;
    }

    execute({ url: `/api/comment/${comment.id}/${comment.subscribed ? 'unsubscribe' : 'subscribe' }` });
    setComment({ ...comment, subscribed: !comment.subscribed });
  };

  useEffect(() => {
    if (status(201)) {
      trackSubscribeComment();
    } else if (status(204)) {
      trackUnsubscribeComment();
    }
  }, [status]);

  return toggleSubscription;
};

export default useSubscription;