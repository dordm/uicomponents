import React from 'react';
const MyButton = ({title, onClick}) => (
    <button className='Button' onClick={onClick}>
        {title}
    </button>
)

export default MyButton;