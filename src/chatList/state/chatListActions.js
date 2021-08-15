export const ADD_CHAT = "CHATLIST::ADD_CHAT";
export const ADD_CHAT_WITH_FIREBASE = "CHATLIST::ADD_CHAT_WITH_FIREBASE";
export const REMOVE_CHAT = "CHATLIST::REMOVE_CHAT";
export const REMOVE_CHAT_WITH_FIREBASE = "CHATLIST::REMOVE_CHAT_WITH_FIREBASE";
export const RENAME_CHAT = "CHATLIST::RENAME_CHAT";
export const SELECT_CHAT = "CHATLIST::SELECT_CHAT";
export const CHAT_LIST_INIT_TRACKING_WITH_FIREBASE =
  "CHATLIST::INIT_TRACKING_WITH_FIREBASE";
export const CHAT_LIST_SET_LIST = "CHATLIST::SET_LIST";

export const chatListAddChat = (name) => ({
  type: ADD_CHAT,
  payload: {
    name,
  },
});

export const chatListAddChatWithFirebase = (name) => ({
  ...chatListAddChat(name),
  type: ADD_CHAT_WITH_FIREBASE,
});

export const chatListRemoveChat = (id) => ({
  type: REMOVE_CHAT,
  payload: {
    id,
  },
});

export const chatListRemoveChatWithFirebase = (id) => ({
  ...chatListRemoveChat(id),
  type: REMOVE_CHAT_WITH_FIREBASE,
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

export const chatListInitTrackingWithFirebase = () => ({
  type: CHAT_LIST_INIT_TRACKING_WITH_FIREBASE,
});

export const chatListSetList = (newList) => ({
  type: CHAT_LIST_SET_LIST,
  payload: {
    newList,
  },
});
