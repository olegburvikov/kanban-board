export const createCard = (text, index) => {
    return {
        type: 'CREATE_CARD',
        payload: {
            index, text
        }
    }
}

export const deleteCard = (listIndex, cardIndex) => {
    return {
        type: 'DELETE_CARD',
        payload: {
            listIndex, cardIndex
        }
    }
}

export const renameCard = (text, listIndex, cardIndex) => {
    return {
        type: 'RENAME_CARD',
        payload: {
            text,
            listIndex, 
            cardIndex
        }
    }
}

export const createList = (title) => {
    return {
        type: 'CREATE_LIST',
        payload: title
    }
}

export const deleteList = (index) => {
    return {
        type: 'DELETE_LIST',
        payload: index
    }
}

export const renameList = (text, listIndex) => {
    return {
        type: 'RENAME_LIST',
        payload: {
            text,
            listIndex
        }
    }
}

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    droppableId
) => {
    return {
        type: 'DRAG_HAPPENED',
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            droppableId
        }
    }
}