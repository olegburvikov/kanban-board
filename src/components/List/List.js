import React from 'react';
import PropTypes from 'prop-types'
import './List.css'
import Card from '../Card/Card';
import AddForm from '../AddForm/AddForm';
import classNames from 'classnames'


const List = ({items = [], title}) => {
    return (
        <div className="list-wrapper">
            <div className={classNames('list', {'list--empty': !items.length})} >
                { title && <div className="list__title">{title}</div> }
                <div className="list-cards-wrapper">
                    { items.map( (card, idx) => <Card {...card} key={idx} /> ) }
                </div>
                <AddForm />
            </div>
        </div>
    );
};

List.propTypes = {
    items: PropTypes.array.isRequired
}

export default List;