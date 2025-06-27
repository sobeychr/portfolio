import { CMessage } from '@classes/CMessage';

export const TYPE_LIST = 'message-list';
export const TYPE_MESSAGE = 'message-message';
export const TYPE_TYPING = 'message-typing';

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

  if (type === TYPE_LIST) {
    const { list } = action;

    return {
      ...state,
      messages: CMessage.generateList(list || []),
    };
  }

  if (type === TYPE_MESSAGE) {
    const { message } = action;
    const newMessages = [...state.messages, message].sort(CMessage.sort);

    return {
      ...state,
      messages: newMessages,
    };
  }

  else if (type === TYPE_TYPING) {
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
