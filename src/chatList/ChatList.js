import { List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

function ChatList({ chatList, chatId, onChatSelect }) {
  const classes = useStyles();

  const handleListItemClick = (evt, id) => {
    evt.preventDefault();
    onChatSelect(id);
  };

  const items = chatList.map((chat) => {
    return (
      <ListItem
        button
        selected={chatId === chat.id}
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
