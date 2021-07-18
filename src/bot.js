class Bot {
  #botAnswerTimeoutMs;
  #authorToAnswer;
  #botName;
  #botDefaultAnswer;

  constructor({
    authorToAnswer = "",
    botAnswerTimeoutMs = 0,
    botName = "r2d2",
    botDefaultAnswer = ":)",
  }) {
    this.#botAnswerTimeoutMs = botAnswerTimeoutMs;
    this.#authorToAnswer = String(authorToAnswer);
    this.#botName = String(botName);
    this.#botDefaultAnswer = String(botDefaultAnswer);
  }

  get botAnswerTimeoutMs() {
    return this.#botAnswerTimeoutMs;
  }

  processMessages(msgList, sendMsgFn) {
    if (!Array.isArray(msgList) || !msgList.length) {
      return;
    }
    const lastMsg = msgList[msgList.length - 1];
    if (lastMsg.author === this.#authorToAnswer) {
      setTimeout(
        () => sendMsgFn(this.#botDefaultAnswer, this.#botName),
        this.#botAnswerTimeoutMs
      );
    }
  }
}

export default Bot;
