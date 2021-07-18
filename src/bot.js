class Bot {
  #botAnswerDelay;
  #authorToAnswer;
  #botName;
  #botDefaultAnswer;

  constructor({
    authorToAnswer = "",
    botAnswerDelay = 0,
    botName = "r2d2",
    botDefaultAnswer = ":)",
  }) {
    this.#botAnswerDelay = botAnswerDelay;
    this.#authorToAnswer = String(authorToAnswer);
    this.#botName = String(botName);
    this.#botDefaultAnswer = String(botDefaultAnswer);
  }

  get botAnswerDelay() {
    return this.#botAnswerDelay;
  }

  processMessages(msgList) {
    if (!Array.isArray(msgList) || !msgList.length) {
      return;
    }
    const lastMsg = msgList[msgList.length - 1];
    if (lastMsg.author === this.#authorToAnswer) {
      return {
        author: String(this.#botName),
        text: String(this.#botDefaultAnswer),
        delay: this.#botAnswerDelay,
      };
    }
  }
}

export default Bot;
