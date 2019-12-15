import { DeepPartial, getManager } from 'typeorm';

import { Reaction } from '../../modules/reaction/reaction.entity';

import { createUser } from './user.factory';
import { createMessage } from './message.factory';

export const createReaction = async (data: DeepPartial<Reaction> = {}) => {
  const manager = await getManager();

  if (!data.author)
    data.author = await createUser();

  if (!data.messages)
    data.messages = [await createMessage()];

  const reaction = manager.create(Reaction, {
    ...data,
  });

  return manager.save(reaction);
};