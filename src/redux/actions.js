export const createCard = (text, index) => {
    return {
        type: 'CREATE_CARD',
        payload: {
            index, text
        }
    }
}
export const createList = (title) => {
    return {
        type: 'CREATE_LIST',
        payload: title
    }
}