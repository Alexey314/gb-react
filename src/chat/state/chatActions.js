export const SEND_MESSAGE = "CHAT::SEND_MESSAGE";

export const chatSendMessage = (chatId, msg) => ({
  type: SEND_MESSAGE,
  payload: {
    chatId,
    msg,
  },
});
