import MessageList from "./MessageList.js";
import MessageForm from "./MessageForm.js";
import { useCallback, useEffect, useState } from "react";
import Bot from "./bot.js";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import ChatList from "./ChatList.js";

const useStyles = makeStyles((theme) => ({
  rootGrid: {
    // minHeight: "100vh",
    backgroundColor: theme.palette.background.paper,
  },
  chatList: {
    backgroundColor: theme.palette.grey[100],
  },
}));

const bot = new Bot({
  authorToAnswer: "You",
  botAnswerDelay: 1500,
  botName: "Mr. Robot",
  botDefaultAnswer: "Your request is registered.",
});

function ChatsView() {
  const classes = useStyles();
  const [messageList, setMessageList] = useState([
    // { author: "You", text: "To be?", date: "11.07.2021", time: "19:54" },
    // { author: "You", text: "Or not to be?", date: "11.07.2021", time: "19:55" },
  ]);
  const [chatList, setChatList] = useState([
    { name: "John", id: "sfghdihf" },
    { name: "Jane", id: "alerodsv" },
    { name: "Bob", id: "ffbnjfds" },
  ]);
  const onSendMessage = useCallback(({ text, author, delay }) => {
    const setterFn = () => {
      const date = new Date();
      const newMsg = {
        author,
        text,
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
      };
      setMessageList((msgList) => {
        const newMsgList = [...msgList, newMsg];
        return newMsgList;
      });
    };
    if (delay && delay > 0) {
      setTimeout(setterFn, delay);
    } else {
      setterFn();
    }
    console.log("ChatsView.onSendMessage ", text);
  }, []);

  const onSendUserMessage = useCallback(
    (text) => onSendMessage({ text, author: "You", delay: 0 }),
    [onSendMessage]
  );

  useEffect(() => {
    console.log("ChatsView on messageList change ");
    const botMessage = bot.processMessages(messageList);
    if (botMessage) {
      onSendMessage(botMessage);
    }
  }, [messageList, onSendMessage]);

  return (
    <main className="ChatsView-main">
      <Grid container className={classes.rootGrid} wrap="nowrap">
        <Grid item className={classes.chatList}>
          <ChatList chatList={chatList} />
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          direction="column"
          alignItems="stretch"
        >
          <Grid item>
            <MessageList messages={messageList} />
          </Grid>
          <Grid item>
            <MessageForm onSend={onSendUserMessage} />
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
}

export default ChatsView;
