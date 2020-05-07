import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import './Card.css'

import deleteSvg from '../../assets/icons/delete.svg';
import editSvg from '../../assets/icons/edit.svg';
import EditField from '../EditField/EditField';
import { deleteCard } from '../../redux/actions'


const Card = ({text, cardId, listIndex, index}) => {
    const [ showEdit, setShowEdit ] = useState(false)
    const dispatch = useDispatch();

    return (
        <Draggable draggableId={String(cardId)} index={index} >
            {provided => (
                <Fragment>
                    { showEdit ? 
                        <EditField 
                            showEditVal={showEdit} 
                            cardId={cardId} 
                            listIndex={listIndex}  
                            onSetShowEdit={setShowEdit} 
                            fieldType='forCard' 
                        /> : ( 
                        <div className='card' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <span>{text}</span>
                            <div className="card-edit-buttons">
                                <button className="card__edit-btn card__edit-btn--rename"
                                    onClick={ () => setShowEdit(true) } >
                                    <img src={editSvg} alt='delete card icon icon' />
                                </button>
                                <button className="card__edit-btn"
                                    onClick={() => dispatch(deleteCard(listIndex, cardId))} >
                                    <img src={deleteSvg} alt='delete card icon icon' />
                                </button>
                            </div>
                        </div> )
                    }
                </Fragment>
            )}
            
        </Draggable>
        
    );
};

Card.propTypes = {
    text: PropTypes.string.isRequired,
    cardId: PropTypes.number.isRequired,
    listIndex: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
}

export default Card;