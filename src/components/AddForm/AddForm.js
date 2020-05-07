import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types'

import './AddForm.css';

import Button from '../Button/Button';
import cancelSvg from '../../assets/icons/cancel.svg';
import { createCard, createList } from '../../redux/actions';

const AddForm = ({listIndex, isEmptyList}) => {
    const [ showForm, setShowForm ] = useState(false);
    const [ textAreaVal, setTextareaVal ] = useState('')
    
    const dispatch = useDispatch()
    const textareaEl = useRef(null);
    const addFormEl = useRef(null);
    
    useEffect(() => {
        if(textareaEl.current) {
            textareaEl.current.focus()
            document.addEventListener('click', handleClickOutside, false);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside, false);
        }
    }, [showForm,textAreaVal])

    const onInputHandler = (e) => {
        setTextareaVal(e.target.value);
    }

    const keyPressed = (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            onItemAdd();
        }
    }

    const onItemAdd = () => {
        if(textAreaVal.trim()) {
            isEmptyList ? 
                dispatch(createList(textAreaVal)):
                dispatch(createCard(textAreaVal, listIndex));
            setTextareaVal('');
        }
    }

    const handleClickOutside = (event) => {
        if (!addFormEl.current.contains(event.target)) {
            setShowForm(false);
        }
    }

    return (
        <div className='add-form' ref={addFormEl}>
            { !showForm ? (
                <Button onDefaultClick={() => setShowForm(true)} >{isEmptyList ? 'Add  list' : 'Add  card'}</Button>
                ) : (
                <div className='add-form-wrapper'>
                    <textarea 
                        onChange={onInputHandler} 
                        onKeyPress={keyPressed}
                        value={textAreaVal} 
                        ref={textareaEl} 
                        className='add-form__textarea' 
                        rows="3" 
                        placeholder={isEmptyList ? 
                            'Enter a title for this list...' : 
                            'Enter a title for this card...'} 
                    />
                    <div className="add-form__bottom">
                        <button onClick={onItemAdd} className='add-form__submit' >
                            {isEmptyList ? 'Add list' : 'Add card'}
                        </button>
                        <img className='add-form__cancel' 
                            onClick={() => setShowForm(false)} 
                            src={cancelSvg} alt="cancel svg icon"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

AddForm.prototype = {
    listIndex: PropTypes.number.isRequired,
    isEmptyList: PropTypes.bool.isRequired
}

export default AddForm;