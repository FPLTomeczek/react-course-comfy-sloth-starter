import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const itemFound = state.cart.find((item) => item.id === id + color);

    if (itemFound) {
      const newCart = state.cart.map((item) => {
        if (item.id === id + color) {
          if (amount + item.amount > item.max) {
            return { ...item, amount: item.max };
          } else {
            return { ...item, amount: amount + item.amount };
          }
        } else {
          return item;
        }
      });
      return { ...state, cart: newCart };
    } else {
      const tempItem = {
        id: id + color,
        name: product.name,
        price: product.price,
        max: product.stock,
        color,
        amount,
      };
      return {
        ...state,
        cart: [...state.cart, tempItem],
        total_items: state.total_items + amount,
      };
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
