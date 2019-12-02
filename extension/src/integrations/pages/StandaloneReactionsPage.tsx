import React, { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import queryString from 'query-string';

import { parseReaction, Reaction } from 'src/types/Reaction';
import { SortType } from 'src/types/SortType';
import { useInformation } from 'src/utils/InformationContext';
import useAxios, { ResponseData } from 'src/hooks/use-axios';

import Loader from 'src/components/common/Loader';
import ReactionsList from 'src/components/reaction/ReactionsList';
import { useCurrentUser } from 'src/hooks/use-user';
import ReactionCreationForm from 'src/components/reaction/ReactionForm';
import FilterBar from 'src/components/common/FilterBar';
import Break from 'src/components/common/Break';
import Flex from 'src/components/common/Flex';
import Text from 'src/components/common/Text';

const useStandaloneReactions = (informationId: number, sort: SortType, search?: string) => {
  const [searchDebounced] = useDebounce(search, 300);
  const qs = queryString.stringify({ sort, search: searchDebounced });
  const url = `/api/information/${informationId}/reactions` + (qs ? '?' + qs : '');
  const parse = useCallback((data: ResponseData) => data.map(parseReaction), []);

  const [result, refetch] = useAxios<Reaction[]>('', parse, { manual: true });

  useEffect(() => void refetch({ url }), [url]);

  if ((search && !searchDebounced) || result.loading === undefined)
    return [{ ...result, loading: true }];

  return [result];
};

const findById = <T extends { id: number }>(dataset: T[]) => (data: T) => {
  return dataset.find((element: T) => element.id === data.id);
};

const useEditableDataset = <T extends { id: number }>(dataset: T[] | null, find = findById) => {
  const [copy, setCopy] = useState(dataset);
  const findElement = useCallback(find(copy), [find, copy]);

  useEffect(() => void setCopy(dataset), [dataset]);

  const prepend = useCallback((newData: T) => {
    setCopy([newData, ...copy]);
  }, [copy]);

  const append = useCallback((newData: T) => {
    setCopy([...copy, newData]);
  }, [copy]);

  const replace = useCallback((newData: T) => {
    const oldData = findElement(newData);
    const idx = copy.indexOf(oldData);

    setCopy([
      ...copy.slice(0, idx),
      newData,
      ...copy.slice(idx + 1),
    ]);
  }, [copy, findElement]);

  return [
    copy !== null ? copy : dataset,
    {
      prepend,
      append,
      replace,
    },
  ] as const;
};

const StandaloneReactionsPage: React.FC = () => {
  const user = useCurrentUser();
  const information = useInformation();

  const [sort, setSort] = useState(SortType.DATE_ASC);
  const [search, setSearch] = useState('');

  const [{ data, loading }] = useStandaloneReactions(information.id, sort, search);
  const [reactions, { prepend, replace }] = useEditableDataset(data);

  const getReactionsList = () => {
    if (!reactions.length) {
      return (
        <Flex flexDirection="column" justifyContent="center" alignItems="center" style={{ minHeight: 200 }}>
          <Text uppercase color="textLight">
            { !search && <>Aucne réaction n'a été publiée pour le moment.</> }
            { search && !loading && <>Aucun résultat ne correspond à cette recherche</> }
          </Text>
        </Flex>
      );
    }

    return <ReactionsList reactions={reactions} onEdited={replace} />;
  };

  return (
    <>
      <FilterBar
        disabled={false}
        onSearch={setSearch}
        onSort={setSort}
      />

      { user && (
        <>
          <ReactionCreationForm onCreated={prepend} />
          <Break size="big" />
        </>
      ) }

      { loading ? (
        <Loader size="big" />
      ) : (
        getReactionsList()
      ) }

    </>
  );
};

export default StandaloneReactionsPage;
