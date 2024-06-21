import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    city: undefined,
    dates: [],
    options: {
        adult: undefined,
        children: undefined,
        room: undefined,
    }
};

const savedState = JSON.parse(localStorage.getItem('searchState'));

const initialState = savedState || INITIAL_STATE;

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
    let newState;
    switch (action.type) {
        case "NEW_SEARCH":
            newState = action.payload;
            break;
        case "RESET_SEARCH":
            newState = INITIAL_STATE;
            break;
        default:
            newState = state;
    }
    localStorage.setItem('searchState', JSON.stringify(newState));
    return newState;
};

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, initialState);
    return (
        <SearchContext.Provider value={{
            city: state.city,
            dates: state.dates,
            options: state.options,
            dispatch,
        }}>
            {children}
        </SearchContext.Provider>
    );
};
