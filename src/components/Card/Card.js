import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import { deleteCard } from '../../redux/actions'
import './Card.css'
import deleteSvg from '../../assets/icons/delete.svg';
import editSvg from '../../assets/icons/edit.svg';
import EditField from '../EditField/EditField';


const Card = ({text, cardIndex, listIndex}) => {
    const [ showEdit, setShowEdit ] = useState(false)
    const dispatch = useDispatch();


    return (
        <Fragment>
            { showEdit ? <EditField showEditVal={showEdit} cardIndex={cardIndex} listIndex={listIndex}  onSetShowEdit={setShowEdit} fieldType='forCard' /> : 
            ( <div className='card'>
                    <span>{text}</span>
                    <div className="card-edit-buttons">

                        <button 
                            className="card__edit-btn card__edit-btn--rename"
                            onClick={ () => setShowEdit(true) } >
                            <img src={editSvg} alt='delete card icon icon' />
                        </button>

                        <button 
                            className="card__edit-btn"
                            onClick={() => dispatch(deleteCard(listIndex, cardIndex))} >
                            <img src={deleteSvg} alt='delete card icon icon' />
                        </button>
                        
                    </div>
                </div> )
            }
        </Fragment>
        
    );
};

Card.propTypes = {
    text: PropTypes.string.isRequired,
    cardIndex: PropTypes.number.isRequired,
    listIndex: PropTypes.number.isRequired

}

export default Card;