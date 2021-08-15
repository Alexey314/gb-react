export const SEND_MESSAGE = "CHAT::SEND_MESSAGE";
export const SEND_MESSAGE_WITH_FIREBASE = "CHAT::SEND_MESSAGE__WITH_FIREBASE";
export const CHAT_SET_MESSAGES = "CHAT::SET_MESSAGES";
export const CHAT_INIT_TRACKING_WITH_FIREBASE =
  "CHAT::INIT_TRACKING_WITH_FIREBASE";

export const chatSendMessage = (chatId, msg) => ({
  type: SEND_MESSAGE,
  payload: {
    chatId,
    msg,
  },
});

export const chatSendMessageWithFirebase = (chatId, msg) => ({
  ...chatSendMessage(chatId, msg),
  type: SEND_MESSAGE_WITH_FIREBASE,
});

export const chatSetMessages = (chatId, messages) => ({
  type: CHAT_SET_MESSAGES,
  payload: {
    chatId,
    messages,
  },
});

export const chatInitTrackingWithFirebase = (chatId) => ({
  type: CHAT_INIT_TRACKING_WITH_FIREBASE,
  payload: {
    chatId,
  },
});
