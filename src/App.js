import logo from './logo.svg';
import './App.css';
import Message from './Message.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Message text="My first cool message"/>
        <Message text="My second cool message"/>
      </header>
    </div>
  );
}

export default App;
