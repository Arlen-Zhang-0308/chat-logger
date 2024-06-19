import React, {useState, useEffect} from "react";
import Message from "./Message";
import App from "../App";

export default function MessageList(props) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchMessages();
    }, []);
    const fetchMessages = async () => {
      try {
        const response = await fetch(props.host + "/message/messages");
        const data = await response.json();
  
        setMessages(data);
        setLoading(false);
      }
      catch(err) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    if(loading) {
      return (<h3>Loading...</h3>);
    }
  
    if(error) {
      console.log(error);
      return (<h3>Error on getting message: <br />{error}</h3>);
    }
  
    const messageList = messages.map((message) => <Message time={message.time} content={message.message}/>)
  
    return (
      <div className="message-area">
        <ul>
          {messageList}
        </ul>
      </div>
    );
}