import React, { Component } from 'react';
import './App.css'
import List from '../List/List';
import { connect } from 'react-redux'

class App extends Component {
    render() {
        const lists = this.props.lists
        return (
            <div className='app' >          

                { lists.map(({title, cards, index}, idx) => {
                    return (
                        <List 
                            title={title} 
                            items={cards}
                            listIndex={index}
                            key={idx}
                        />
                    )
                }) }
                <List />
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lists: state.lists
    }
}


export default connect(mapStateToProps)(App);