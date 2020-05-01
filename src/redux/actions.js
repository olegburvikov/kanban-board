export const createCard = (text) => {
    return {
        type: 'CREATE_CARD',
        payload: text
    }
}