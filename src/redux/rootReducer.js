
const initialState = {
    lists: [
        {
            index: 1, 
            title: 'one', 
            cards: [
                {
                    id: 1,
                    text: 'some'
                }
            ]
        },
        {
            index: 2, 
            title: 'two', 
            cards: [
                {
                    id: 3,
                    text: 'one'
                },
                {
                    id: 4,
                    text: 'two'
                }
            ]
        }
    ]
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'CREATE_CARD': 
            return { 
                ...state,
                lists: state.lists.map((list) => {
                    if(action.payload.index === list.index) {
                        return {
                            ...list,
                            cards: [ ...list.cards, { text: action.payload.text, id: new Date().getTime()  } ]
                        }
                    }
                    return list;
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
                            cards: list.cards.filter( (card) => card.id !== action.payload.cardIndex )
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
                            cards: list.cards.map( (card) => {
                                return card.id === action.payload.cardIndex ?
                                { text: action.payload.text, id: card.id } : card
                            } )
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

        case 'DRAG_HAPPENED':
            const {droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd} = action.payload;
            const newState = {...state}
            
            // drop in the same list
            if(droppableIdStart === droppableIdEnd) {
                 // find the list where drag happened
                const list = state.lists.find(list => droppableIdStart === list.index.toString())

                // pull out card from this position
                const card = list.cards.splice(droppableIndexStart, 1)

                // put the card on new position
                list.cards.splice(droppableIndexEnd, 0, ...card);                
            }
           
            // drop in other list
            if(droppableIdStart !== droppableIdEnd) {
                // find the list where drag happened
                const listStart = state.lists.find(list => droppableIdStart === list.index.toString())

                // pull out card from this list
                const card = listStart.cards.splice(droppableIndexStart, 1);

                // find the list where draf ended
                const listEnd = state.lists.find(list => droppableIdEnd === list.index.toString());

                // put the card in the new list
                listEnd.cards.splice(droppableIndexEnd, 0 , ...card)
            }

            return newState

        default:
            return state;
    }
}