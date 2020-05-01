import React from 'react';
import './Button.css';
import PropTypes from 'prop-types'
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
    onDefaultClick: PropTypes.func
}

export default Button;