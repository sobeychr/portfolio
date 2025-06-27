import { CMessage } from '@classes/CMessage';

export type StateType = {
  messages: CMessage[];
  typing: string[];
};

export const INIT_STATE = {
  messages: [],
  typing: [],
} as StateType;

type ActionType = {
  list?: CMessage[];
  message?: CMessage;
  on?: boolean;
  type: string;
  username?: string;
};

export const messageReducer = (state: StateType, action: ActionType) => {
  const { type = '' } = action;

  if (type === 'list') {
    const { list } = action;
    const sortedList = (list || []).sort(CMessage.sort);

    return {
      ...state,
      messages: sortedList,
    };
  }

  if (type === 'message') {
    const { message } = action;
    const newMessages = [...state.messages, message].sort(CMessage.sort);

    return {
      ...state,
      messages: newMessages,
    };
  }

  else if (type === 'typing') {
    const { on, username } = action;

    const uniques = !on ? [] : new Set([...state.typing, username]);
    const newTyping = on
      ? Array.from(uniques)
      : [...state.typing].filter(name => name !== username);

    return {
      ...state,
      typing: newTyping,
    };
  }

  return state;
};
