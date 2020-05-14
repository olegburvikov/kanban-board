import {
    CREATE_CARD,
    DELETE_CARD,
    RENAME_CARD,
    CREATE_LIST,
    DELETE_LIST,
    RENAME_LIST,
    DRAG_HAPPENED,
  } from "./actionTypes";

export const createCard = (text, index) => {
    return {
        type: CREATE_CARD,
        payload: {
            index, text
        }
    }
}

export const deleteCard = (listIndex, cardIndex) => {
    return {
        type: DELETE_CARD,
        payload: {
            listIndex, cardIndex
        }
    }
}

export const renameCard = (card) => {
    return {
        type: RENAME_CARD,
        payload: {
            text: card.text,
            listIndex: card.listIndex, 
            cardId: card.cardId
        }

    }
}

export const createList = (title) => {
    return {
        type: CREATE_LIST,
        payload: title
    }
}

export const deleteList = (index) => {
    return {
        type: DELETE_LIST,
        payload: index
    }
}

export const renameList = (text, listIndex) => {
    return {
        type: RENAME_LIST,
        payload: {
            text,
            listIndex
        }
    }
}

export const replaceItem = ( replaceItemInfo ) => {
    return {
        type: DRAG_HAPPENED,
        payload: replaceItemInfo
    }
}