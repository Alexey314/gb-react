import MessageList from "../MessageList.js";
import MessageForm from "../MessageForm.js";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import ChatList from "../chatList/ChatList";

const useStyles = makeStyles((theme) => ({
  rootGrid: {
    // minHeight: "100vh",
    backgroundColor: theme.palette.background.paper,
  },
  chatList: {
    backgroundColor: theme.palette.grey[100],
  },
}));

function ChatsView({
  chatList,
  currentChatId,
  handleChatSelect,
  onAddNewChat,
  onDelCurrentChat,
  messageList,
  onSendUserMessage,
}) {
  const classes = useStyles();

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
