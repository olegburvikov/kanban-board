import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import classNames from 'classnames'

import { renameCard, renameList } from '../../redux/actions'
import './EditField.css'

const EditField = ( {onSetShowEdit, cardIndex, listIndex, fieldType} ) => {
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
                    dispatch(renameCard(editInputEl.current.value, listIndex, cardIndex));
                    break;
                default: break;
            }
            
        }
    }


    return (
        <form onSubmit={ onSubmitHandler } >
            <input ref={editInputEl} className={classNames('edit-field', {'edit-field--list': fieldType === 'forList'})} type="text"/>
        </form>
    );
};

EditField.propTypes = {
    onSetShowEdit: PropTypes.func.isRequired,
    cardIndex: PropTypes.number,
    listIndex: PropTypes.number.isRequired,
    fieldType: PropTypes.string.isRequired
}

export default EditField;