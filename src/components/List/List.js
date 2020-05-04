import React, {useState} from 'react';
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import classNames from 'classnames'
import deleteSvg from '../../assets/icons/delete.svg';
import './List.css'

import Card from '../Card/Card';
import AddForm from '../AddForm/AddForm';
import {deleteList} from '../../redux/actions'
import EditField from '../EditField/EditField';

const List = ({items = [], title, listIndex}) => {
    const [ showEdit, setShowEdit ] = useState(false)
    const dispatch = useDispatch()

    return (
        <div className="list-wrapper">
            <div className={classNames('list', {'list--empty': !title})} >
                { title && 
                        <div className="list__title">
                             {showEdit ? 
                                <EditField showEditVal={showEdit} listIndex={listIndex}  onSetShowEdit={setShowEdit} fieldType='forList' /> : 
                                <div className='list__title-field' onClick={ () => setShowEdit(true)}>{title}</div>}
                            <button onClick={() => dispatch(deleteList(listIndex))} className='list__delete-btn' >delete</button>
                        </div> }

                <div className="list-cards-wrapper">
                    { items.map( (card, cardIndex) => <Card text={card} cardIndex={cardIndex} listIndex={listIndex} key={cardIndex} /> ) }
                </div>

                <AddForm listIndex={listIndex} isEmptyList={title ? false : true} />

            </div>
        </div>
    );
};

List.propTypes = {
    items: PropTypes.array,
    index: PropTypes.number
}

export default List;