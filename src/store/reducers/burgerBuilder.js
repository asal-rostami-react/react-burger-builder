import * as actionTypes from '../actions/actionTypes';
import { updateObject} from '../utility';


const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}
const addIngredient = (state, action) => {
     // with utility
     const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
     const updatedIngredients = updateObject(state.ingredients,updatedIngredient)
     const updatedState = {
         ingredients: updatedIngredients,
         totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
         building: true
     }
     return updateObject(state, updatedState);

};

const removeIngredient = (state, action) => {
     // with utility
     const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
     const updatedIngs = updateObject(state.ingredients,updatedIng)
     const updatedSt = {
         ingredients: updatedIngs,
         totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
         building: true 
     }
     return updateObject(state, updatedSt);
};

const setIngredient = (state, action) => {
    // with utility
    return updateObject( state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false,
        building: false
    });

};

const fetchIngredientsFailed = (state, action) => {
     // with utility
     return updateObject(state , { error: true });

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
           
            // without utility
            // return {
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName]: state.ingredients[action.ingredientName] + 1 
            //     },
            //     totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]

            // };
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
            
 
             // without utility
            // return {
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName]: state.ingredients[action.ingredientName] - 1 
            //     },
            //     totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]

            // };
        case actionTypes.SET_INGREDIENTS: return setIngredient(state, action);
         
            // without utility
            // return {
            //     ...state,
            //     ingredients: action.ingredients,
            //     totalPrice: 4,
            //     error: false
            // };
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
            
              // without utility
            // return {
            //     ...state,
            //     error: true
            // };
        default:return state;
    }
};

export default reducer;