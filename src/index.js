import React from 'react';
import './index.css';

const Button = ({title, onClick}) => (
    <button className='Button' onClick={onClick}>
        {title}
    </button>
)

export {Button}


