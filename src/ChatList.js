import { List, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    backgroundColor: theme.palette.primary.paper,
  },
  itemText: {
    color: theme.palette.text.primary,
  },
}));

function ChatList(props) {
  const classes = useStyles();
  const [selectedId, setSelectedId] = useState("");
  const handleListItemClick = (event, id) => {
    setSelectedId(id);
  };
  const items = props.chatList.map((chat) => {
    return (
      <ListItem
        button
        selected={selectedId === chat.id}
        onClick={(e) => handleListItemClick(e, chat.id)}
        className={classes.item}
        key={chat.id}
      >
        <ListItemText className={classes.itemText} primary={chat.name} />
      </ListItem>
    );
  });
  return <List className={classes.root}>{items}</List>;
}

export default ChatList;
