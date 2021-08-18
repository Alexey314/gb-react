import { CHAT_SET_MESSAGES, SEND_MESSAGE } from "./chatActions";

const initialState = {
  // dflfbvjclkvm: [
  //   {
  //     author: "You",
  //     text: "To be?",
  //     date: "11.07.2021",
  //     time: "19:54",
  //   },
  // ],
};

const sendMsg = (state, action) => {
  const newMessages = [
    ...(state.hasOwnProperty(action.payload.chatId)
      ? state[action.payload.chatId]
      : []),
    {
      ...action.payload.msg,
    },
  ];
  const newState = {
    ...state,
    [action.payload.chatId]: newMessages,
  };
  return newState;
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return sendMsg(state, action);
    case CHAT_SET_MESSAGES:
      return {
        ...state,
        [action.payload.chatId]: action.payload.messages,
      };
    default:
      return state;
  }
}
