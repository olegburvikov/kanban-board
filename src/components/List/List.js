import React, {useState} from 'react';
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import classNames from 'classnames'
import { Droppable } from 'react-beautiful-dnd'

import './List.css'

import Card from '../Card/Card';
import AddForm from '../AddForm/AddForm';
import {deleteList} from '../../redux/actions'
import EditField from '../EditField/EditField';

const List = ({items = [], title, listIndex}) => {

    const [ showEdit, setShowEdit ] = useState(false)
    const dispatch = useDispatch()


    const handleClick = () => {
        setShowEdit(true)
    }

    return (
       
        <div className="list-wrapper" >
            
            <div className={classNames('list', {'list--empty': !title})} >
                
                { title && 
                    <div className="list__title">
                        {showEdit ? 
                            <EditField 
                                showEditVal={showEdit} 
                                listIndex={listIndex}  
                                onSetShowEdit={setShowEdit} 
                                fieldType='forList' 
                            /> : 
                            <div className='list__title-field' onClick={handleClick} >{title}</div>}
                        <button onClick={() => dispatch(deleteList(listIndex))} className='list__delete-btn' >delete</button>
                    </div> }

                { title && (<Droppable droppableId={String(listIndex)}>
                    {(provided) => (
                        <div ref={provided.innerRef} className={classNames('list-cards-wrapper', {'overflow-auto': items.length > 10})}>
                
                            {items.map((card, index) => {
                                return (
                                    <Card text={card.text} 
                                        index={index} 
                                        cardId={card.id} 
                                        listIndex={listIndex} 
                                        key={card.id} 
                                    />
                                )
                            })}
                            {provided.placeholder}
                        </div> 
                    )}
                </Droppable>) }

                <AddForm listIndex={listIndex} isEmptyList={title ? false : true} />

            </div>
        </div>
           
    );
};

List.propTypes = {
    items: PropTypes.array,
    title: PropTypes.string,
    index: PropTypes.number
}

export default List;