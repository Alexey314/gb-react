import "./MessageForm.css";
import { useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function MessageForm(props) {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  const inputRef = useRef();
  const onSend = (e) => {
    e.preventDefault();
    if (message.length) {
      props.onSend(message);
    }
    inputRef.current.focus();
    setMessage(()=>"");
  };

  return (
    <form
      className="MessageForm"
      onSubmit={onSend}
      noValidate
      autoComplete="off"
    >
      <TextField
        className="MessageForm-msg"
        type="text"
        value={message}
        onChange={handleMessageChange}
        variant="outlined"
        placeholder="Input message here"
        autoFocus
        inputRef={inputRef}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
      >
        Send
      </Button>
    </form>
  );
}

export default MessageForm;
