import { call, put, takeEvery } from "redux-saga/effects";
import { SEND_MESSAGE } from "./chatActions";
import { BOT_NAME, getBotAnswer } from "../../bot.js";
import { chatSendMessage } from "./chatActions";

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

function* processSentMessage(action) {
  if (action.payload.msg.author !== BOT_NAME) {
    yield call(delay, 1500);
    const botMsg = getBotAnswer(action.payload.msg);
    yield put(chatSendMessage(action.payload.chatId, botMsg));
  }
}

function* watchSentMessages() {
  yield takeEvery(SEND_MESSAGE, processSentMessage);
}

export { watchSentMessages };
