import { render } from "@testing-library/react";
import ChatList from "../ChatList";

describe("chatList", () => {
  it("matches snapshot with empty chat list", () => {
    const chatList = [];
    const chatId = null;
    const onChatSelect = () => {};
    const component = render(
      <ChatList
        chatList={chatList}
        chatId={chatId}
        onChatSelect={onChatSelect}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it("matches snapshot with passed chat list", () => {
    const chatList = [
      {
        id: "fkbsdvnzxc",
        name: "Chat 1",
      },
      {
        id: "dfkjbvncklvn",
        name: "Chat 2",
      },
    ];
    const chatId = "fkbsdvnzxc";
    const onChatSelect = () => {};
    const component = render(
      <ChatList
        chatList={chatList}
        chatId={chatId}
        onChatSelect={onChatSelect}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
