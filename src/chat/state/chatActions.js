import { BOT_NAME, getBotAnswer } from "../../bot.js";

export const SEND_MESSAGE = "CHAT::SEND_MESSAGE";

export const chatSendMessage = (chatId, msg) => ({
  type: SEND_MESSAGE,
  payload: {
    chatId,
    msg,
  },
});

export const chatSendMessageWithThunk =
  (chatId, msg) => (dispatch, getState) => {
    dispatch(chatSendMessage(chatId, msg));
    if (msg.author !== BOT_NAME) {
      setTimeout(() => {
        const botMsg = getBotAnswer(msg);
        dispatch(chatSendMessage(chatId, botMsg));
      }, 1500);
    }
  };
