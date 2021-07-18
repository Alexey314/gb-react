import "./MessageForm.css";
import { useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import send from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function MessageForm(props) {
  const classes = useStyles();
  const inputEl = useRef(null);
  const [message, setMessage] = useState("");
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const onSend = (e) => {
    e.preventDefault();
    const text = String(message);
    if (text.length) {
      props.onSend(text);
    }
  };

  return (
    <form className="MessageForm" noValidate autoComplete="off">
      <TextField
        className="MessageForm-msg"
        type="password"
        value={message}
        onChange={handleMessageChange}
        variant="outlined"
        placeholder="Input message here"
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
        onClick={onSend}
      >
        Send
      </Button>
    </form>
  );
}

export default MessageForm;
