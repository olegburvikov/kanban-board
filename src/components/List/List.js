import React from 'react';
import PropTypes from 'prop-types'
import './List.css'
import Card from '../Card/Card';
import AddForm from '../AddForm/AddForm';
import classNames from 'classnames'


const List = ({items = [], title, index}) => {
    
    return (
        <div className="list-wrapper">
            <div className={classNames('list', {'list--empty': !title})} >

                { title && <div className="list__title">{title}</div> }

                <div className="list-cards-wrapper">
                    { items.map( (card, idx) => <Card text={card} key={idx} /> ) }
                </div>

                <AddForm listIndex={index} isEmptyList={title ? false : true} />

            </div>
        </div>
    );
};

List.propTypes = {
    items: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired
}

export default List;