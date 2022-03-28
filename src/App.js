import logo from './logo.svg';
import './App.css';
import Message from './Message';


function App(props) {
  return (
    <div className="App">
      <header className = {`App-header ${props.bcgColorBlack}`} >
      <Message text = {props.text} classNamed={props.classByMessage} />
      </header>
    </div>
  );
}

export default App;
