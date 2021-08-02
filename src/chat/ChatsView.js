import MessageList from "../MessageList.js";
import MessageForm from "../MessageForm.js";
import { useCallback, useEffect, useMemo } from "react";
import Bot from "../bot.js";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import ChatList from "../chatList/ChatList";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  chatListAddChat,
  chatListRemoveChat,
  // chatListRenameChat,
  chatListSelectChat,
} from "../chatList/state/chatListActions";
import { chatSendMessage } from "../chat/state/chatActions";
import { selectChatMessages } from "../store/chatReducer/selectors";
import { selectChatList } from "../store/chatListReducer/selectors";

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
  return id != null ? `/chats/${id}` : "/chats";
};

function ChatsView() {
  const classes = useStyles();
  const { chatId: urlChatId } = useParams();
  const history = useHistory();
  const goToChatUrlById = useCallback(
    (id) => {
      history.replace(getChatUrlById(id));
    },
    [history]
  );
  const dispatch = useDispatch();
  const { chats: chatList, currentChatId } = useSelector(selectChatList);
  const messageList = useSelector(selectChatMessages);

  const urlChatIdProvided = useMemo(
    () => typeof urlChatId !== "undefined" && String(urlChatId) !== "",
    [urlChatId]
  );
  const safeUrlChatId = useMemo(
    () => (urlChatIdProvided ? String(urlChatId) : null),
    [urlChatIdProvided, urlChatId]
  );

  // initial chat selection
  useEffect(() => {
    // console.log({ urlChatIdProvided, safeUrlChatId, currentChatId });
    if (urlChatIdProvided) {
      const referredChatExist = chatList.some(
        (chat) => chat.id === safeUrlChatId
      );
      if (referredChatExist) {
        if (safeUrlChatId !== currentChatId) {
          // console.log("111");
          dispatch(chatListSelectChat(safeUrlChatId));
        }
      } else {
        // console.log("222");
        history.replace(getChatUrlById(currentChatId));
      }
    } else if (currentChatId != null) {
      // console.log("333");
      history.replace(getChatUrlById(currentChatId));
    }
  });

  const onSendMessage = useCallback(
    ({ text, author, delay }) => {
      const date = new Date();
      const newMsg = {
        author,
        text,
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
      };
      dispatch(chatSendMessage(currentChatId, newMsg));
    },
    [dispatch, currentChatId]
  );

  const onSendUserMessage = useCallback(
    (text) => onSendMessage({ text, author: "You", delay: 0 }),
    [onSendMessage]
  );

  const handleChatSelect = (id) => {
    dispatch(chatListSelectChat(id));
    goToChatUrlById(id);
  };

  const onAddNewChat = () => {
    dispatch(chatListAddChat(`Chat ${chatList.length + 1}`));
  };

  const onDelCurrentChat = () => {
    dispatch(chatListRemoveChat(currentChatId));
  };

  return (
    <main className="ChatsView-main">
      <Grid container className={classes.rootGrid} wrap="nowrap">
        <Grid item className={classes.chatList}>
          <ChatList
            chatList={chatList}
            chatId={currentChatId}
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

export default ChatsView;
