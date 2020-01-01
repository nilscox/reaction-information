import React from 'react';

import { Typography } from '@material-ui/core';

import Loader from 'src/dashboard/components/Loader';
import { parseReaction } from 'src/types/Reaction';

import BookmarkItem from './BookmarkItem';
import Authenticated from 'src/dashboard/components/Authenticated';
import useAxiosPaginated from 'src/hooks/use-axios-paginated';
import PaginatedList from 'src/dashboard/components/PaginatedList';

const Bookmarks: React.FC = () => {
  const [
    { loading, data: reactions, totalPages },
    { setSearch },,
    { page, setPage },
  ] = useAxiosPaginated('/api/bookmark/me', parseReaction);

  return (
    <Authenticated>

      <Typography variant="h4">Mes favoris</Typography>

      <PaginatedList
        onSearch={setSearch}
        page={page}
        pageSize={10}
        totalPages={totalPages}
        onPageChange={setPage}
      >

        { loading
          ? <Loader />
          : reactions.map(r => <BookmarkItem key={r.id} reaction={r} />)
        }

      </PaginatedList>

    </Authenticated>
  );
};

export default Bookmarks;
