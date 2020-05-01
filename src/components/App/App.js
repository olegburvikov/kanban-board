import React, { Component } from 'react';
import './App.css'
import List from '../List/List';
import { connect } from 'react-redux'

class App extends Component {
    render() {
        return (
            <div className='app' >
                <List title='What need to do?' items={this.props.items}  />
                <List/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        items: state.items
    }
}


export default connect(mapStateToProps)(App);