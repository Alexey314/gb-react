import { List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // maxWidth: 752,
    // // backgroundColor: theme.palette.grey[100],
  },
  item: {
    backgroundColor: theme.palette.primary.paper,
  },
  itemText: {
    color: theme.palette.text.primary,
  },
}));

const getChatUrlById = (id) => {
  return `/chats/${id}`;
};

function ChatList({ chatList }) {
  const classes = useStyles();
  const { chatId: urlChatId } = useParams();
  const history = useHistory();
  const handleListItemClick = (event, id) => {
    history.push(getChatUrlById(id));
  };

  // initial chat selection
  useEffect(() => {
    const urlChatIdProvided =
      typeof urlChatId !== "undefined" && String(urlChatId) !== "";
    const chatListValid = chatList && chatList.length;

    const selectDefaultChat = () => {
      if (chatListValid) {
        history.push(getChatUrlById(chatList[0].id));
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

  const items = chatList.map((chat) => {
    return (
      <ListItem
        button
        selected={urlChatId === chat.id}
        onClick={(e) => handleListItemClick(e, chat.id)}
        className={classes.item}
        key={chat.id}
      >
        <ListItemText primary={chat.name} />
      </ListItem>
    );
  });

  return (
    <List className={classes.root} component="div">
      {items}
    </List>
  );
}

export default ChatList;
