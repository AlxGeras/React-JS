import logo from './logo.svg';
import './App.css';
import Message from './Message';
import { useEffect, useRef, useState } from 'react';
import { element } from 'prop-types';



function App(props) {

  const [messageList, setAuthor] = useState([],);
  const [valueAuthor, setAuthorValue] = useState('');
  const [valueText, setTextValue] = useState('');
  const inputAuthor = useRef();
  const inputText = useRef();

  useEffect(() => {
    const lastAuthor = inputAuthor.current.value;
    setAuthorValue('');
    setTextValue('');
    setTimeout( () => {
      console.log(1);
      if (messageList.length !==0 && messageList[messageList.length-1].author !=='bot') { 
      setAuthor(prevPerson => {
        return [
          ...prevPerson, 
         {author: 'bot', text: `${lastAuthor} ваше сообщение доставлено`} 
        ]
      })}
    }
      ,1500);
      setAuthorValue('');
    setTextValue('');
    //return () => clearTimeout(timer);
    }, [messageList]);

  const handleChangeAuthor = (event) => {
    setAuthorValue(event.target.value);
    }

    const handleChangeText = (event) => {
      setTextValue(event.target.value);
      }

  const sendMes = (event , props) => {
    event.preventDefault();
    if (inputAuthor) {
      setAuthor(prevPerson => {
    return [
      ...prevPerson, 
     {author: inputAuthor.current.value, text: inputText.current.value} 
    ]
  });
    }
    }
    

  return (
    <div className="App">
      <header className = {`App-header`} >
        {messageList.map((element, idx) => ( <Message author = {element.author} text = {element.text} key = {idx}/>))}

      <form className='form' onSubmit={sendMes}>
          <label>Имя автора</label>
          <input ref={inputAuthor} type="text" value={valueAuthor} onChange={handleChangeAuthor} />
          <label>Текст</label>
          <input ref={inputText} type="text" value={valueText} onChange={handleChangeText} />
          <input type="submit" value="Отправить" className='btn' />
      </form>
      </header>
    </div>
  );
}

export default App;
