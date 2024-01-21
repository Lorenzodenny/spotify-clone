import { ADD_TO_FAVOURITE, REMOVE_FROM_FAVOURITE } from "../actions";

// Funzione per ottenere l'elenco dei preferiti dal localStorage
const getFavouriteListFromLocalStorage = () => {
    const storedList = localStorage.getItem("favouriteList");
    return storedList ? JSON.parse(storedList) : [];
};

const initialState = {
    list: getFavouriteListFromLocalStorage(),
};

const favouriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_FAVOURITE:
            const updatedAddList = [...state.list, action.payload];
            localStorage.setItem(
                "favouriteList",
                JSON.stringify(updatedAddList)
            );
            return {
                ...state,
                list: updatedAddList,
            };

        case REMOVE_FROM_FAVOURITE:
            const updatedRemoveList = state.list.filter(
                (item) => item.id !== action.payload
            );
            localStorage.setItem(
                "favouriteList",
                JSON.stringify(updatedRemoveList)
            );
            return {
                ...state,
                list: updatedRemoveList,
            };

        default:
            return state;
    }
};

export default favouriteReducer;