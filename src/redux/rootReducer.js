
const initialState = {
    lists: []
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

        default:
            return state;
    }
}