import React from 'react';
import { format } from 'date-fns';

let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const Message = (props) => {
    return (
        <div className='message'>
        <p>Date: {format(new Date(), 'yyyy/MM/dd kk:mm:ss')}</p>
        <p>Author: {props.author}</p>
        <p>text: {props.text}</p>
        </div>)
}

export default Message