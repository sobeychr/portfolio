export type MessageType = {
  chatUuid: string;
  content: string;
  timestamp: number;
  username: string;
};

export type StateType = {
  messages: MessageType[];
  typing: string[];
};

export const INIT_STATE = {
  messages: [],
  typing: [],
} as StateType;

type ActionType = {
  message?: MessageType;
  on?: boolean;
  type: string;
  username?: string;
};

const sortMessages = (a: MessageType, b: MessageType) => {
  return a.timestamp > b.timestamp ? 1 : -1;
};

export const messageReducer = (state: StateType, action: ActionType) => {
  const { type = '' } = action;
  if (type === 'message') {
    const { message } = action;
    const newMessages = [...state.messages, message].sort(sortMessages);

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
