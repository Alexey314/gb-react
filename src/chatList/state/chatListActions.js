export const ADD_CHAT = "CHATLIST::ADD_CHAT";
export const REMOVE_CHAT = "CHATLIST::REMOVE_CHAT";
export const RENAME_CHAT = "CHATLIST::RENAME_CHAT";
export const SELECT_CHAT = "CHATLIST::SELECT_CHAT";

export const chatListAddChat = (name) => ({
  type: ADD_CHAT,
  payload: {
    name,
  },
});

export const chatListRemoveChat = (id) => ({
  type: REMOVE_CHAT,
  payload: {
    id,
  },
});

export const chatListRenameChat = (id) => ({
  type: RENAME_CHAT,
  payload: {
    id,
  },
});

export const chatListSelectChat = (id) => ({
  type: SELECT_CHAT,
  payload: {
    id,
  },
});