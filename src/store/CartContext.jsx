import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (_id) => {},
  clearCart: () => {},
});
const CART_STORAGE_KEY = "cartItems";
const cartItemStorage = () => {
  const storedCartItems = localStorage.getItem(CART_STORAGE_KEY);
  return storedCartItems ? JSON.parse(storedCartItems) : [];
};
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item._id === action.item._id
    );
    const updateItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updateItems[existingCartItemIndex] = updatedItem;
    } else {
      updateItems.push({ ...action.item, quantity: 1 });
    }
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updateItems));
    return { ...state, items: updateItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item._id === action._id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];
    if (existingCartItem.quantity === 1) {
      // const updatedItems = [...state.items];
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));
    return { ...state, items: updatedItems };
  }
  if (action.type === "CLEAR_CART") {
    localStorage.removeItem(CART_STORAGE_KEY);
    return { ...state, items: [] };
  }
  return state;
}
export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: cartItemStorage(),
  });
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.items));
  }, [cart.items]);
  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }
  function removeItem(_id) {
    dispatchCartAction({ type: "REMOVE_ITEM", _id });
  }
  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
CartContextProvider.propTypes = {
  children: PropTypes.node,
};
export default CartContext;
