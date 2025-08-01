import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  CartState,
  CartActionTypes,
} from '../types';


const initialState: CartState = {
  items: [],
};



const cartReducer = (state = initialState, action : CartActionTypes ) : CartState =>{
switch(action.type){
case ADD_TO_CART :
  const existingItem = state.items.find((item)=>item.id === action.payload.id)
  if(existingItem){
    return{
    ...state, items: state.items.map((item) =>(item.id === action.payload.id )? { ...item, quantity: item.quantity + 1 } : item)
    }
  }
  else{
    return{
        ...state, items : [...state.items, { ...action.payload, quantity : 1}]
    }
  }

case REMOVE_FROM_CART:
  return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case UPDATE_CART_ITEM_QUANTITY:
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.productId
              ? { ...item, quantity : action.payload.quantity  }
              : item
          )
          .filter((item)=> item.quantity),
          //.filter((item) => item.quantity > 0),
      };

  default:
  return state;

}
}

export default cartReducer;






