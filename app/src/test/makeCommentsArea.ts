import { CommentsArea } from '../types/CommentsArea';

const makeCommentsArea = (partial?: Partial<CommentsArea>): CommentsArea => ({
  ...partial,
  id: 1,
  informationUrl: 'https://info.url',
  informationTitle: 'Les premiers pas de l\'Homme sur Mars !',
  informationAuthor: 'Camille Durand',
  imageUrl: undefined,
  published: new Date(2020, 0, 1),
  creator: {
    id: 1,
  },
  commentsCount: 42,
});

export default makeCommentsArea;