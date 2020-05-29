import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import classNames from 'classnames'

import './EditField.css'

import { renameCard, renameList } from '../../redux/actions'

const EditField = ( {onSetShowEdit, cardId, listIndex, fieldType} ) => {
    const dispatch = useDispatch()
    const editInputEl = useRef(null);
    
    useEffect(() => {
        if(editInputEl.current) {
            editInputEl.current.focus()
            document.addEventListener('click', handleClickOutside, false);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside, false);
        }
    })

    const handleClickOutside = (event) => {
        if (!editInputEl.current.contains(event.target)) {
            onSetShowEdit(false);
        }
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (editInputEl.current.value.trim()) {
            onSetShowEdit(false);
            
            switch (fieldType) {
                case 'forList':
                    dispatch(renameList(editInputEl.current.value, listIndex));
                    break;
                case 'forCard':
                    dispatch(renameCard({
                        text: editInputEl.current.value, 
                        listIndex, 
                        cardId
                    }));
                    break;
                default: break;
            }
            
        }
    }

    return (
        <form className='edit-form' onSubmit={ onSubmitHandler } >
            <input ref={editInputEl} className={classNames('edit-field', {'edit-field--list': fieldType === 'forList'})} type="text"/>
        </form>
    );
};

EditField.propTypes = {
    onSetShowEdit: PropTypes.func.isRequired,
    cardId: PropTypes.number,
    listIndex: PropTypes.number.isRequired,
    fieldType: PropTypes.string.isRequired
}

export default EditField;