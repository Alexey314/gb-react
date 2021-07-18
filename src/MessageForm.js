import './MessageForm.css';
import { useRef } from "react";

function MessageForm(props) {
  const inputEl = useRef(null);
  const onSend = (e) => {
    e.preventDefault();
    const text = String(inputEl.current.value);
    if (text.length) {
      props.onSend(text);
    }
  };

  return (
    <form className="MessageForm" onSubmit={onSend}>
      <input className="MessageForm-msg" ref={inputEl} type="text" placeholder="Enter message"></input>
      <input className="MessageForm-send" type="submit" value="Send"></input>
    </form>
  );
}

export default MessageForm;
