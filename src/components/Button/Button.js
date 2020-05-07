import React from 'react';
import PropTypes from 'prop-types'

import './Button.css';

const Button = ({children, onDefaultClick}) => {
    return (
        <button className='list-button' onClick={onDefaultClick} >
           <span className='list-button__plus' >+</span> 
           {children}
        </button>
    );
};

Button.prototype = {
    children: PropTypes.string.isRequired,
    onDefaultClick: PropTypes.func.isRequired
}

export default Button;