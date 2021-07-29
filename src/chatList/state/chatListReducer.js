import {
  ADD_CHAT,
  REMOVE_CHAT,
  RENAME_CHAT,
  SELECT_CHAT,
} from "./chatListActions";

const initialState = {
  chats: [
    {
      id: "afekijvbnov",
      name: "Sally",
    },
    {
      id: "dflfbvjclkvm",
      name: "Marley",
    },
  ],
  currentChatId: "dflfbvjclkvm",
};

const getNewUniqueChatId = (state) => {
  return String(Date.now() + state.chats.length);
};

const addChat = (state, action) => {
  const chats = [
    ...state.chats,
    {
      name: action.payload.name,
      id: getNewUniqueChatId(state),
    },
  ];
  const currentChatId = chats.length == 1 ? chats[0].id : state.currentChatId;
  return {
    ...state,
    chats,
    currentChatId,
  };
};

const removeChat = (state, action) => {
  let removeIndex = -1;
  const chats = state.chats.filter((chat, index) => {
    if (chat.id !== String(action.payload.id)) {
      return true;
    } else {
      removeIndex = index;
      return false;
    }
  });
  const currentChatId =
    removeIndex >= 0 && chats.length
      ? chats[Math.max(removeIndex - 1, 0)].id
      : null;
  return {
    ...state,
    chats,
    currentChatId,
  };
};

const renameChat = (state, action) => {
  return {
    ...state,
    chats: state.chats.map((chat) =>
      chat.id === String(action.payload.id)
        ? {
            ...chat,
            name: action.payload.name,
          }
        : chat
    ),
  };
};

const selectChat = (state, action) => {
  return {
    ...state,
    currentChatId: state.chats.some(
      (chat) => chat.id === String(action.payload.id)
    )
      ? String(action.payload.id)
      : state.currentChatId,
  };
};

export default function chatListReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CHAT:
      return addChat(state, action);
    case REMOVE_CHAT:
      return removeChat(state, action);
    case RENAME_CHAT:
      return renameChat(state, action);
    case SELECT_CHAT:
      return selectChat(state, action);
    default:
      return state;
  }
}
