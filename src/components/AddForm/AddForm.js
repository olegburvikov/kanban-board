import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import './AddForm.css';
import cancelSvg from './cancel.svg';
import { createCard } from '../../redux/actions';

const AddForm = () => {
    const [ showForm, setShowForm ] = useState(false);
    const [ textAreaVal, setTextareaVal ] = useState('')

    const dispatch = useDispatch()
    const textareaEl = useRef(null);

    useEffect(() => {
        if(textareaEl.current) {
            textareaEl.current.focus()
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
        if(textAreaVal) {
            dispatch(createCard(textAreaVal));
            setTextareaVal('');
        }
    }

    return (
        <div className='add-form'>
            { !showForm ? (
                <Button onDefaultClick={() => setShowForm(true)} >Add another card</Button>
                ) : (
                <div className='add-form-wrapper'>
                    <textarea 
                        onInput={onInputHandler} 
                        onKeyPress={keyPressed}
                        value={textAreaVal} 
                        ref={textareaEl} 
                        className='add-form__textarea' 
                        rows="3" 
                        placeholder='Enter a title for this card...' 
                    />

                    <div className="add-form__bottom">
                        <button onClick={onItemAdd} className='add-form__submit' >Add card</button>
                        <img className='add-form__cancel' onClick={() => setShowForm(false)} src={cancelSvg} alt="cancel svg icon"/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddForm;