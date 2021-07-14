import "./App.css";
import MessageList from "./MessageList.js";
import MessageForm from "./MessageForm.js";
import { useCallback, useEffect, useState } from "react";
import bot from "./bot.js";

bot.authorToAnswer = "You";
bot.botAnswerTimeoutMs = 1500;
bot.botName = "Mr. Robot";
bot.botDefaultAnswer = "Your request is registered.";

const getCurrentDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  return dd + "." + mm + "." + yyyy;
};

const getCurrentTime = () => {
  const today = new Date();
  const hh = String(today.getHours()).padStart(2, "0");
  const mm = String(today.getMinutes()).padStart(2, "0");
  return hh + ":" + mm;
};

function App() {
  const [messageList, setMessageList] = useState([
    // { author: "You", text: "To be?", date: "11.07.2021", time: "19:54" },
    // { author: "You", text: "Or not to be?", date: "11.07.2021", time: "19:55" },
  ]);
  const onSendMessage = useCallback((text, author) => {
    const date = getCurrentDate();
    const time = getCurrentTime();
    const newMsg = {
      author: author,
      text,
      date,
      time,
    };
    setMessageList((msgList) => {
      const newMsgList = [...msgList, newMsg];
      return newMsgList;
    });
    console.log("App.onSendMessage ", text);
  }, []);

  const onSendUserMessage = useCallback(
    (text) => onSendMessage(text, "You"),
    [onSendMessage]
  );

  useEffect(() => {
    bot.processMessages(messageList, onSendMessage);
  }, [messageList, onSendMessage]);

  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <main className="App-main">
        <MessageList messages={messageList} />
        <MessageForm onSend={onSendUserMessage} />
      </main>
    </div>
  );
}

export default App;
