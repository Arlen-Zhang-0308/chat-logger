import './App.css';
import MessageList from "./components/MessageList";

const host = "http://localhost:8080";

function App(props) {
  return (
    <MessageList host={host} />
  );
}

export default App;
