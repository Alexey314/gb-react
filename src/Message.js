import './Message.css';

function Message(props) {
  const msg = props.message;
  return (
    <div className="Message">
      <div className="MessageAttributes">{msg.author}, {msg.date} {msg.time}</div>
      <div className="MessageText">{msg.text}</div>
    </div>
  );
}

export default Message;
