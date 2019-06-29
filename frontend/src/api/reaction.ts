import axios from 'axios';

import { ReactionSortType } from '../types/ReactionSortType';
import { Reaction, QuickReactionType, parseReaction } from '../types/Reaction';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ResponseData = any;

export const fetchRootReactions = async (informationId: number, sort: ReactionSortType): Promise<Reaction[]> => {
  const { data } = await axios.get(`/api/information/${informationId}/reactions?sort=${sort}`, {
    withCredentials: true,
  });

  return data.map((r: ResponseData) => parseReaction(r));
};

export const fetchReaction = async (reactionId: number): Promise<Reaction> => {
  const { data } = await axios.get(`/api/reaction/${reactionId}`, {
    withCredentials: true,
  });

  return parseReaction(data);
};

export const fetchReplies = async (parentId: number, sort: ReactionSortType): Promise<Reaction[]> => {
  const { data } = await axios.get(`/api/reaction/${parentId}/replies?sort=${sort}`, {
    withCredentials: true,
  });

  return data.map((r: ResponseData) => parseReaction(r));
};

export const postReaction = async (
  informationId: number,
  quote: string | null,
  text: string,
  parentId?: number,
): Promise<Reaction> => {
  const payload = { informationId, quote, text, parentId };

  const { data } = await axios.post('/api/reaction', payload, {
    withCredentials: true,
  });

  return parseReaction(data);
};

export const updateReaction = async (reactionId: number, text: string): Promise<Reaction> => {
  const payload = { text };

  const { data } = await axios.put(`/api/reaction/${reactionId}`, payload, {
    withCredentials: true,
  });

  return parseReaction(data);
};

export const postQuickReaction = async (reactionId: number, type: QuickReactionType): Promise<Reaction> => {
  const payload = { type: type ? type.toUpperCase() : null };

  const { data } = await axios.post(`/api/reaction/${reactionId}/quick-reaction`, payload, {
    withCredentials: true,
  });

  return parseReaction(data);
};

export const reportReaction = async (reactionId: number, type: string, message?: string): Promise<void> => {
  const payload = { type, message };

  await axios.post(`/api/reaction/${reactionId}/report`, payload, {
    withCredentials: true,
  });
};