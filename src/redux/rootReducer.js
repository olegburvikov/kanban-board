
const initialState = {
    lists: [
        {
            index: 1, 
            title: 'one', 
            cards: ['some']
        },
        {
            index: 2, 
            title: 'two', 
            cards: ['one','two']
        },
        {
            index: 3, 
            title: '3', 
            cards: ['4','5']
        }
    ]
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'CREATE_CARD': 
            return { 
                ...state,
                lists: state.lists.map((item) => {
                    if(action.payload.index === item.index) {
                        return {
                            ...item,
                            cards: [ ...item.cards, action.payload.text ]
                        }
                    }
                    return item;
                })
            }

        case 'DELETE_CARD':
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if(list.index !== action.payload.listIndex) {
                        return list;
                    } else {
                        return {
                            ...list,
                            cards: list.cards.filter( (card, index) => index !== action.payload.cardIndex )
                        }
                    }
                })
            }

        case 'RENAME_CARD':
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if(list.index !== action.payload.listIndex) {
                        return list;
                    } else {
                        return {
                            ...list,
                            cards: list.cards.map( (card, index) => index === action.payload.cardIndex ? action.payload.text : card )
                        }
                    }
                })
            }


        case 'CREATE_LIST':
            let biggestCurrentIndex;

            if (state.lists.length) {
                biggestCurrentIndex = state.lists.reduce(
                    (accum, current) => accum.index > current.index ? accum : current).index;
            } else {
                biggestCurrentIndex = 0;
            }
            
            return {
                ...state,
                lists: [
                    ...state.lists, 
                    { index: biggestCurrentIndex + 1, title: action.payload, cards: [] }
                ]
            } 

        case 'DELETE_LIST':
            return {
                ...state,
                lists: state.lists.filter((item) => item.index !== action.payload)
            }

        case 'RENAME_LIST':
            return {
                ...state,
                lists: state.lists.map((list) => {
                    if(list.index === action.payload.listIndex) {
                        return {
                            ...list,
                            title: action.payload.text,
                        }
                    } else {
                        return list
                    }
                } )
            }


        default:
            return state;
    }
}