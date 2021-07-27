import MessageList from "./MessageList.js";
import MessageForm from "./MessageForm.js";
import { useCallback, useEffect, useState, useRef } from "react";
import Bot from "./bot.js";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import ChatList from "./ChatList.js";
import { useHistory, useParams } from "react-router";

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

const getChatUrlById = (id) => {
  return `/chats/${id}`;
};

function ChatsView() {
  const classes = useStyles();
  const { chatId: urlChatId } = useParams();
  const history = useHistory();
  const goToChatUrlById = useCallback(
    (id) => {
      history.push(getChatUrlById(id));
    },
    [history]
  );

  const [chatList, setChatList] = useState([
    { name: "John", id: "sfghdihf", messageList: [] },
    { name: "Jane", id: "alerodsv", messageList: [] },
    { name: "Bob", id: "ffbnjfds", messageList: [] },
  ]);

  const [messageList, setMessageList] = useState([
    // { author: "You", text: "To be?", date: "11.07.2021", time: "19:54" },
    // { author: "You", text: "Or not to be?", date: "11.07.2021", time: "19:55" },
  ]);

  const urlChatIdProvided =
    typeof urlChatId !== "undefined" && String(urlChatId) !== "";
  const safeChatId = urlChatIdProvided ? urlChatId : null;
  const prevChatId = usePrevious(safeChatId);

  // initial chat selection
  useEffect(() => {
    const chatListValid = chatList && chatList.length;

    const selectDefaultChat = () => {
      if (chatListValid) {
        goToChatUrlById(chatList[0].id);
      }
    };

    if (urlChatIdProvided) {
      const referredChatExist =
        chatListValid && chatList.some((chat) => chat.id === urlChatId);
      if (referredChatExist) {
        // OK, no action needed
        return;
      } else {
        // Bad id provided, select default chat
        selectDefaultChat();
      }
    } else {
      // chat id was not provided, select default chat
      selectDefaultChat();
    }
  });

  const getChatById = (chatList, id) => {
    return chatList && chatList.find((chat) => String(chat.id) === String(id));
  };

  const loadChatMessages = useCallback((chatList, id) => {
    const chat = getChatById(chatList, id);
    if (chat) {
      setMessageList(() => {
        return [...chat.messageList];
      });
    } else {
      setMessageList(() => {
        return [];
      });
    }
  }, []);

  const storeChatMessages = (id) => {
    setChatList((chatList) => {
      const chat = getChatById(chatList, id);
      if (chat) {
        chat.messageList = [...messageList];
      }
      return chatList;
    });
  };

  useEffect(() => {
    if (chatList.length) {
      if (prevChatId !== safeChatId) loadChatMessages(chatList, safeChatId);
    } else {
      setMessageList(() => {
        return [];
      });
    }
  }, [loadChatMessages, chatList, safeChatId, prevChatId]);

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
        return [...msgList, newMsg];
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

  const handleChatSelect = (id) => {
    storeChatMessages(safeChatId);
    goToChatUrlById(id);
  };

  const onAddNewChat = () => {
    setChatList((chatList) => {
      const newChat = {
        name: `Chat ${chatList.length + 1}`,
        id: String(Date.now()),
        messageList: [],
      };
      return [...chatList, newChat];
    });
  };

  const onDelCurrentChat = () => {
    setChatList((chatList) => {
      return chatList.filter((chat) => String(chat.id) !== String(safeChatId));
    });
  };

  useEffect(() => {
    if (!chatList.some((chat) => String(chat.id) === String(safeChatId))) {
      if (chatList.length) {
        goToChatUrlById(chatList[0].id);
      }
    }
  }, [safeChatId, chatList, goToChatUrlById]);

  return (
    <main className="ChatsView-main">
      <Grid container className={classes.rootGrid} wrap="nowrap">
        <Grid item className={classes.chatList}>
          <ChatList
            chatList={chatList}
            chatId={safeChatId}
            onChatSelect={handleChatSelect}
          />
          <Grid container direction="row" wrap="nowrap">
            <Grid item>
              <Button onClick={onAddNewChat}>Add</Button>
            </Grid>
            <Grid item>
              <Button onClick={onDelCurrentChat}>Del</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="space-between"
          direction="column"
          alignItems="stretch"
        >
          <Grid item>
            {chatList.length ? <MessageList messages={messageList} /> : null}
          </Grid>
          <Grid item>
            {chatList.length ? (
              <MessageForm onSend={onSendUserMessage} />
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
}

// Hook
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export default ChatsView;
