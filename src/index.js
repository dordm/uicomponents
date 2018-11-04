import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const Button = ({title, onClick}) => (
    <button className='Button' onClick={onClick}>
        {title}
    </button>
)

export {Button}

ReactDOM.render(<App />, document.getElementById('root'));

