
const initialState = {
    items: [{text: 'Go to the gym'}, {text: 'Go at home'}]
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'CREATE_CARD': 
            return { ...state, items: [...state.items, {text: action.payload}] }

        default:
            return state;
    }
}