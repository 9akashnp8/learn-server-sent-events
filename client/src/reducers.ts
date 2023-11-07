type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  Update = "update",
}

type MessageHistory = {
    user: "user" | "system",
    content: string
}

type MessagePayload = {
    [Types.Update]: MessageHistory
}

export type MessageActions = ActionMap<MessagePayload>[keyof ActionMap<MessagePayload>];

export function messageReducer(state: MessageHistory[], action: MessageActions) {
  switch (action.type) {
    case Types.Update:
      return [...state, action.payload];
    default:
      return state;
  }
}
