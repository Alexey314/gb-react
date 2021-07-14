class Bot {
  #botAnswerTimeoutMs = 0;
  #authorToAnswer = "";
  #botName = "r2d2";
  #botDefaultAnswer = ":)";

  // constructor() {}

  set botAnswerTimeoutMs(val) {
    this.#botAnswerTimeoutMs = val;
  }

  set authorToAnswer(val) {
    this.#authorToAnswer = val;
  }

  set botName(val){
    this.#botName = val;
  }

  set botDefaultAnswer(val){
    this.#botDefaultAnswer = val;
  }

  processMessages (msgList, sendMsgFn) {
    if (!Array.isArray(msgList) || !msgList.length) {
      return;
    }
    const lastMsg = msgList[msgList.length - 1];
    if (lastMsg.author === this.#authorToAnswer) {
      setTimeout(
        () => sendMsgFn(this.#botDefaultAnswer, this.#botName ),
        this.#botAnswerTimeoutMs
      );
    }
  };
}

export default new Bot();
