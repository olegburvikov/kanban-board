import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

import { DragDropContext } from "react-beautiful-dnd";
import { replaceItem } from "../../redux/actions";
import List from "../List/List";

class App extends Component {
  render() {
    const lists = this.props.lists;

    // for dnd
    const onDragEnd = (result) => {
      const { destination, source, draggableId } = result;

      if (!destination) {
        return;
      }

      this.props.replaceItem({
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIndexStart: source.index,
        droppableIndexEnd: destination.index,
        draggableId
      });
    };          

    return (
      <div className="app">
        <DragDropContext onDragEnd={onDragEnd}>
          {lists.map(({ title, cards, index }, idx) => {
            return (
              <List title={title} items={cards} listIndex={index} key={idx} />
            );
          })}
          <List />
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state.lists,
  };
};

export default connect(mapStateToProps, { replaceItem })(App);
