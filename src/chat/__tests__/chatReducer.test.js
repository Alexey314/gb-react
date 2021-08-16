import { chatSendMessage, chatSetMessages } from "../state/chatActions";
import chatReducer from "../state/chatReducer";

describe("chatReducer", () => {
  it("returns state with replaced chat messages after chatSetMessages action", () => {
    const chatId = "jdhfzbvkc";
    const messages = [
      {
        id: "xslnccmnlvc",
        author: "Jack",
        date: "8/16/2021",
        text: "123",
        time: "12:04:06 AM",
      },
      {
        id: "loigjfcsmnvlm",
        author: "Jane",
        date: "9/17/2020",
        text: "Hi",
        time: "12:04:06 PM",
      },
    ];
    const expected = {
      [chatId]: messages,
    };

    const received = chatReducer(undefined, chatSetMessages(chatId, messages));
    expect(received).toEqual(expected);
  });

  it("returns state with new message after chatSendMessage action", () => {
    const chatId = "jdhfzbvkc";
    const message = {
      id: "xslnccmnlvc",
      author: "Jack",
      date: "8/16/2021",
      text: "123",
      time: "12:04:06 AM",
    };
    const expected = {
      [chatId]: [message],
    };

    const received = chatReducer(undefined, chatSendMessage(chatId, message));
    expect(received).toEqual(expected);
  });
});
