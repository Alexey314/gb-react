import './MessageList.css';
import Message from "./Message.js";

function MessageList(props) {
  const items = props.messages.map((msg, index)=>{
        return <Message message={msg} key={index} />
    });
  return (
    <div className="MessageList">
        {items}
    </div>
  );
}

export default MessageList;
